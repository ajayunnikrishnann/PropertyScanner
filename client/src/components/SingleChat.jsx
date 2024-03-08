import { Box, Text } from '@chakra-ui/layout'
import { FormControl} from '@chakra-ui/form-control'
import { Spinner, IconButton, useToast, Input, InputGroup, InputRightElement, Button } from '@chakra-ui/react';
import { ArrowBackIcon, AttachmentIcon } from '@chakra-ui/icons'
import { ChatState } from './context/ChatProvider';
import { getSender } from '../config/ChatLogics';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react'
import { useSendMessageMutation,useFetchMessagesMutation,useFetchNotificationsMutation } from '../slices/usersApiSlice';
import ScrollableChat from './ScrollableChat';
import io from 'socket.io-client'
import Lottie from 'react-lottie'
import animationData from '../animations/typing.json'
import moment from 'moment'

const ENDPOINT = "http://localhost:3000";
let socket, selectedChatCompare;

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
    const [messages, setMessages] = useState([])
    const [loading, setLoading] = useState(false)
    const [newMessage, setNewMessage] = useState("")
    const [typing, setTyping] = useState(false)
    const [isTyping, setIsTyping] = useState(false)
    const [socketConnected, setSocketConnected] = useState(false)
    const [selectedImage, setSelectedImage] = useState(null);
    const [imageLoading, setImageLoading] = useState(true);

    const [sendNewMessage] = useSendMessageMutation();
    const [fetchAllMessages] = useFetchMessagesMutation();
    const [fetchNotifications] = useFetchNotificationsMutation();

    const { selectedChat, setSelectedChat, notification, setNotification, setChats } = ChatState()
    console.log(selectedChat);
    const { userInfo } = useSelector((state) => state.auth);
    
    const userId = userInfo._id
   console.log(userId);

    const toast = useToast()

    
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    }




    useEffect(() => {
        // Create a new socket connection when userId changes
        socket = io(ENDPOINT, { query: { userId }});
        socket.emit("setup", userInfo)
        socket.on("userStatus", ({ userId, online, lastSeen }) => {
            console.log(`${userId} is ${online ? 'online' : 'offline'}`);
            console.log("selected  chat: ", selectedChat);  
            if (selectedChat && selectedChat.users.some(user => user._id === userId )) {
                setSelectedChat(prevChat => ({
                    ...prevChat,
                    online: online,
                    lastSeen: online ? null : lastSeen, 
                    userId: userId
                }));
            }
            
        });
        socket.on("connected", () => setSocketConnected(true))
        console.log("setSocketConnected:",socketConnected);
        socket.on("typing", () => setIsTyping(true))
        socket.on("stop typing", () => setIsTyping(false))


        // Cleanup the previous socket connection when the component unmounts
        return () => {
            if (socket) {
                socket.disconnect();
                socket.off("connected");
                socket.off("typing");
                socket.off("stop typing");
                socket.off("userStatus");
                socket.off("message received");
            }
        };
    }, []);



    const handleSend = async () => {
        console.log('handle send');
        if (newMessage || selectedImage) {
            socket.emit("stop typing", selectedChat._id);
            try {
                setNewMessage("");
                setImageLoading(true);
                const { data } = await sendNewMessage({ content: newMessage, imageUrl: selectedImage, chatId: selectedChat._id });
                if (data) {
                    setChats((prevChats) => {
                        const updatedChats = prevChats.map((chat) => {
                            if (chat._id === selectedChat._id) {
                                return { ...chat, updatedAt: new Date() };
                            }
                            return chat;
                        });

                        const sortedChats = updatedChats.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
                        return sortedChats;
                    });
                
                    socket.emit('new Message', data);
                    setMessages([...messages, data]);
                }
                setSelectedImage(null);
                setImageLoading(false);
            } catch (error) {
                toast({
                    title: "Error occurred",
                    description: "Failed to send message",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                    position: "bottom"
                });
            }
        }
    };


    const sendMessage = (event) => {
        if (event.key === "Enter") {
            handleSend();
        }
    };


    const fetchMessages = async () => {
        if (!selectedChat) return
        setLoading(true)
        try {
            const { data } = await fetchAllMessages(selectedChat._id);
            setMessages(data)
            setLoading(false)

            socket.emit("join chat", selectedChat._id)
        } catch (error) { 
            toast({
                title: "Error occurred",
                description: "Failed to Load messages",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom"
            });
        }
    }

    useEffect(() => {
        fetchMessages();
        selectedChatCompare = selectedChat;
    }, [selectedChat]);

    useEffect(() => {
        const handleNewMessage = (newMessageReceived) => {
            console.log("newMessageReceiveddd:",newMessageReceived);
            console.log('new message recid=ved',  selectedChatCompare._id , newMessageReceived.chat._id);

            if (!selectedChatCompare || selectedChatCompare._id !== newMessageReceived.chat._id) {
                const existingNotification = notification.find((n) => n.chat._id === newMessageReceived.chat._id);
                if (!existingNotification) {
                    setNotification([newMessageReceived, ...notification]);
                    setFetchAgain(!fetchAgain);
                } else {
                    console.log('inside');
                    setNotification([
                        ...notification.filter((n) => n.chat._id !== newMessageReceived.chat._id),
                        newMessageReceived,
                    ]);
                    setFetchAgain(!fetchAgain);
                }
            } else {
                console.log('else');
                setMessages((prevMessages) => {
                    if (prevMessages) {
                        return [...prevMessages, newMessageReceived];
                    } else {
                        return [newMessageReceived];
                    }
                });
            }
        };

        socket.on("message received",handleNewMessage);
            

        return () => {
            socket.off("message received", handleNewMessage);
        };
    }, [notification, selectedChat]);


    useEffect(() => {
        const fetchNotificationsData = async () => {
            try {
                const { data } = await fetchNotifications();
                console.log("data:",data);
                setNotification(data);
            } catch (error) {
                console.error('Error fetching notifications:', error.message);
            }
        };

        fetchNotificationsData();
    }, []);

    const typingHandler = (e) => {
        setNewMessage(e.target.value)

        //typing indicator logic
        if (!socketConnected) return
        
        if (!typing) {
            setTyping(true)
            socket.emit("typing", selectedChat._id)
        }

        let lastTypingTime = new Date().getTime()
        let timerLength = 2000
        setTimeout(() => {
            let timeNow = new Date().getTime()
            let timeDiff = timeNow - lastTypingTime

            if (timeDiff >= timerLength && typing) {
                socket.emit("stop typing", selectedChat._id)
                setTyping(false)
            }
        }, timerLength);
    }

    const handleImageSelect = (event) => {
        const file = event.target.files[0];
        
        if (file.length > 1) {
            toast.error('You can upload up to 3 images.');
            event.target.value = null;
            setSelectedImage(null)
            return;
        }
        const reader = new FileReader()
        reader.onload = () => {
            setSelectedImage(reader.result); 
        };
        reader.readAsDataURL(file)
    };


    return (
        <>
            {selectedChat ? (
                <>
                    <Text
                      className="text-2xl md:text-3xl px-2 w-full font-work-sans flex justify-between items-center"
                    >
                        <IconButton 
                            className="block md:hidden"
                            icon={<ArrowBackIcon />}
                            onClick={()=>setSelectedChat("")}
                        />
                        <Box>
                            <p className="m-0 ">{getSender(userId, selectedChat.users)} </p>
                            {selectedChat.online ? (
                                <p className="text-base m-0">online</p>
                                //<p style={{ fontSize: "14px", margin: "0" }}>{`${selectedChat.userId} online`}</p>
                            ) : (
                                <p className="text-sm m-0">
                                    Last seen: {moment(selectedChat.lastSeen).format('MMMM D, YYYY h:mm A')}
                                </p>
                              )}
                        </Box>
                    </Text>
                    <Box
                       className="flex flex-col justify-end p-3 bg-gray-300 w-full h-full rounded-lg overflow-hidden "
                    > 
                          {loading ? (
                              <Spinner
                              className="text-4xl w-20 h-20 self-center mx-auto"
                              />
                          ) : (
                              <div className="flex flex-col overflow-y-scroll scrollbar-hidden">
                                <ScrollableChat messages={messages} />
                              </div>
                          )}
    
                          <FormControl onKeyDown={sendMessage} isRequired  className="mt-3">
                              {isTyping ? (
                                <div  className="max-w-20">
                                  <Lottie options={defaultOptions}
                                      className="w-10 mx-auto"
                                  />
                                </div> 
                              ) : (
                                  <></>
                              )}
                              {/* Image preview */}
                                {selectedImage && (
                                    <div  className="bg-white">
                                        {imageLoading && (
                                            <Spinner className="text-4xl self-center mx-auto" />
                                        )}
                                        {!imageLoading && (
                                            <img
                                            src={selectedImage}
                                            alt="Selected Image Preview"
                                            className="max-w-1/2 max-h-20 object-cover rounded-8 mr-8"
                                        />
                                        )}
                                    </div>
                                )}
                              
                                <InputGroup mt={2}>
                                    <Input
                                        value={newMessage}
                                        className="bg-gray-300 p-2 rounded-md  "
                                        type="text"
                                        placeholder='Enter New Message'
                                        onChange={typingHandler}
                                    />
                                    <InputRightElement className="w-4.5rem">
                                        <label htmlFor="image-upload">
                                            <AttachmentIcon className="cursor-pointer" />
                                        </label>
                                        <input
                                            id="image-upload"
                                            type="file"
                                            accept="image/*"
                                            className="hidden"
                                            onChange={handleImageSelect}
                                        />
                                        <Button className="p-1 ml-1 text-sm" onClick={handleSend}>
                                            Send
                                        </Button>
                                    </InputRightElement>
                                </InputGroup>
                          </FormControl>
                    </Box> 
                </>
            ) : (
                <Box className="flex items-center justify-center h-full">
                    <Text className="text-3xl pb-3 font-work-sans">
                        Click on a user to start chatting
                    </Text>
                </Box>
            )}
        </>
      )
}

export default SingleChat
