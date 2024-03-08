import { Box, Stack, Text } from "@chakra-ui/layout"
import { ChatState } from "../components/context/ChatProvider"; 
import { useEffect } from "react"
import { useSelector } from 'react-redux';
import { Menu, MenuButton, MenuItem, MenuList, useToast } from "@chakra-ui/react"
import { useDeleteNotificationMutation, useFetchChatMutation } from '../slices/usersApiSlice'
import { getSender } from "../config/ChatLogics";
import { BellIcon } from "@chakra-ui/icons";
import NotificationBadge from 'react-notification-badge'
import { Effect } from "react-notification-badge"


const ChatList = ({ fetchAgain }) => {
    const { userInfo } = useSelector(state => state.auth)
    const { selectedChat, setSelectedChat, chats, setChats, notification, setNotification } = ChatState()
    console.log(notification);
    const [fetchChat] = useFetchChatMutation()
    const [markAsRead] = useDeleteNotificationMutation()
    const userId = userInfo._id
    const toast = useToast()

    const fetchChats = async () => {
        try {
          const { data } = await fetchChat()
          setChats(data)
        } catch (error) {
          console.log(error.message);
          toast({
            title: "Error Occurred, Cant fetch Chat List",
            description: error.message,
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "bottom-left"
          })
        }
      }

      useEffect(() => {
        fetchChats()
      }, [fetchAgain])

      
      const handleNotificationClick = async (notification) => {
        try {
            setSelectedChat(notification.chat);
            setNotification((prevNotifications) => [
              ...prevNotifications.filter((n) => n._id !== notification._id),
            ]);
    
            if (notification._id) {
                // Execute only for notifications from the database
                await markAsRead(notification._id);
            }
        } catch (error) {
            console.error('Error marking notification as read:', error);
        }
    };

  return (
    <Box  className={`md:flex md:flex-col md:items-center p-3 bg-white md:w-72 md:border md:border-black md:rounded-lg md:overflow-hidden  ${selectedChat ? 'hidden' : 'flex'}`} >
    <Box className="pb-3 px-3 text-2xl md:text-3xl font-worksans flex w-full justify-between items-center ">
      My Chats
    <Menu>
      <MenuButton className="p-1">
        <NotificationBadge
          count={notification?.length}
          effect={Effect.SCALE}
        /> 
        <BellIcon className="text-2xl m-1" />
      </MenuButton>
      <MenuList className="pl-2">
        {!notification?.length && "No New Messages"}
          {notification?.map((notif) => (
          <MenuItem
            key={notif._id}
            onClick={() => handleNotificationClick(notif)}
          >
            
            {`New Message from ${getSender(userId, notif.chat.users)}`}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
    </Box>
    <Box className="flex flex-col p-3 bg-gray-200 w-full h-96 rounded-lg border border-black"    >
      {chats ? (
        <Stack className="flex flex-col overflow-y-scroll scrollbar-hidden">
          {chats && chats.length > 0 ? (
            <Stack >
              {chats.map((chat) => (
                <Box
                  onClick={() => setSelectedChat(chat)}
                   className={`cursor-pointer ${selectedChat?._id === chat?._id ? 'bg-teal-500 text-white' : 'bg-cyan-700 text-white'} px-3 py-2 rounded-lg border border-slate-50`}
                  key={chat._id}
                >

                  <Text >
                    {chat.users && chat.users.length > 0
                      ? getSender(userId, chat.users)
                      : "Unknown Sender"}
                  </Text>
                </Box>
              ))}
            </Stack>
          ) : (
            <Text>No Chats to Display</Text>
          )}
        </Stack>
      ): (
        <Text>
          No Chats to Display
        </Text>
      )}
    </Box>
  </Box>   
  )
}

export default ChatList
