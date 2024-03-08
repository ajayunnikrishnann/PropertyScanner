import React from 'react'
import { Box } from "@chakra-ui/layout"
import ChatList from '../components/ChatList' 
import ChatBox from '../components/ChatBox'
import { useState } from "react"
import Header from '../components/Header'
const ChatScreen = () => {
    const [fetchAgain, setFetchAgain] = useState(false);
  return (
    <div className='min-h-screen flex flex-col items-stretch'>
    <Header />
    <div className='w-full'>
      <Box  className="flex justify-between h-full p-16 gap-2">
        <ChatList fetchAgain={fetchAgain}/>
        <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
      </Box>
    </div>
    </div>
  )
}

export default ChatScreen
