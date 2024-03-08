import { ChatState } from "./context/ChatProvider";
import { Box } from "@chakra-ui/react";
import SingleChat from '../components/SingleChat'


const ChatBox = ({ fetchAgain, setFetchAgain }) => {
    const {selectedChat} = ChatState()
  return (
    <Box  className={`md:flex items-center flex-col p-3 bg-white w-full md:w-68 border-l border-r border-b rounded-lg border-black ${selectedChat ? 'flex' : 'hidden'}`} style={{ borderTop: '1px solid #000' }}>
       <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
    </Box>
  )
}

export default ChatBox
