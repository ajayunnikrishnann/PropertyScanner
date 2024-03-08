import { useState } from 'react';
import PropTypes from 'prop-types';
import { ChatState } from './context/ChatProvider';
import { useAccessChatMutation } from '../slices/usersApiSlice';
import { useToast } from '@chakra-ui/react';
import { Spinner } from '@chakra-ui/spinner';
import { useNavigate } from 'react-router-dom'

const ChatButton = ({ userId }) => {
    const { setSelectedChat, chats, setChats } = ChatState();
    const [loadingChat, setLoadingChat] = useState(false);
    const [getChat] = useAccessChatMutation();
    const navigate = useNavigate();

    const toast = useToast();

    const accessChat = async (userId) => {
        try {
          setLoadingChat(true)
          console.log(userId);
          const response = await getChat(userId)
          console.log("response from access chat: ", response); 
           if (response.data) {
            const {data} = response
            if (!chats.find((c) => c._id === data._id)) {
              setChats([data, ...chats])
              setSelectedChat(data)
            }
            
            setSelectedChat(data)
            setLoadingChat(false)
            navigate('/chat')
          } else if (response.error.data) {
            toast({
              title: "Follow each other to access the chat",
              description: response?.error.data.error|| "An error occurred",
              status: "error",
              duration: 5000,
              isClosable: true,
              position: "top-right"
            })
            setLoadingChat(false)
          }
        } catch (error) {
          console.log("error:", error);
          toast({
            title: "Follow each other to access the chat",
            description: error.response?.data?.message || "An error occurred",
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "top-right"
          })
          console.log("hi", error.message)
          setLoadingChat(false)
        }
      }
    return (
        <>
        <button onClick={() => accessChat(userId)} className="w-full h-1 p-7 bg-gradient-to-b  from-cyan-500 via-cyan-700 to-cyan-900 text-white border-none rounded-md cursor-pointer text-2xl hover:opacity-90 flex items-center justify-center "> 
        {loadingChat ? <Spinner className="w-6 h-6 border-t-6 border-blue-500 border-solid ml-auto" />:  <>Message to landlord</> }
        </button>
        </>
    )

}

ChatButton.propTypes = {
    userId: PropTypes.string.isRequired
};

export default ChatButton