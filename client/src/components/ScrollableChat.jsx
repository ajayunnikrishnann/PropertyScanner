import ScrollableFeed from 'react-scrollable-feed'
import { useSelector } from 'react-redux';
import { isSameSenderMargin,isSameUser } from '../config/ChatLogics';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import { useState } from 'react';
import { Image, Modal, ModalOverlay, ModalContent, ModalBody, ModalCloseButton, Flex,  } from '@chakra-ui/react';


const ChatImageModal = ({ imageUrl, isOpen, onClose }) => (
    <Modal isOpen={isOpen} onClose={onClose} className=" w-full h-full">
      <ModalOverlay />
      <ModalContent >
        <ModalCloseButton />
        <ModalBody
         className="flex justify-center items-center"
        >
          <Flex className="flex items-center justify-center h-full">
            <Image src={imageUrl} alt="Chat image" className="w-600 h-auto"/>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
  
  
  const ScrollableChat = ({ messages }) => {
    const { userInfo } = useSelector((state) => state.auth);
    console.log(userInfo);
    const [imageModalsOpen, setImageModalsOpen] = useState(new Array(messages.length).fill(false));
  
    const handleImageClick = (index) => {
      const newImageModalsOpen = [...imageModalsOpen];
      newImageModalsOpen[index] = true;
      setImageModalsOpen(newImageModalsOpen);
    };
  
    const handleCloseModal = (index) => {
      const newImageModalsOpen = [...imageModalsOpen];
      newImageModalsOpen[index] = false;
      setImageModalsOpen(newImageModalsOpen);
    };
  
    if (!messages || messages.length === 0) {
      return (
        <div className="empty-messages">
          {/* Display a message or component indicating that there are no messages */}
          <p>No messages available.</p>
        </div>
      );
    }

    return (
      <div className="max-h-[300px] overflow-y-auto">
      <ScrollableFeed>
        {messages &&
          messages.map((m, i) => (
            <div className={`${
              m.sender._id === userInfo._id ? 'flex justify-end ' : 'flex justify-start '
            }`} key={m._id}>
              {m.images && m.images.length > 0 ? (
                <>
                  <Image
                    src={m.images[0].url}
                    alt="chat-image"
                    className={`rounded-md max-w-200 ${
                        isSameUser(messages, m, i) ? 'mt-3' : 'mt-10'
                      } ${isSameSenderMargin(messages, m, i, userInfo._id)} cursor-pointer`}
                    onClick={() => handleImageClick(i)}
                  />
                  {imageModalsOpen[i] && (
                    <ChatImageModal
                      imageUrl={m.images[0].url}
                      isOpen={imageModalsOpen[i]}
                      onClose={() => handleCloseModal(i)} 
                    />
                  )}
                </>
              ) : (
                <span
                className={`${
                    m.sender._id === userInfo._id ? 'bg-green-200 ' : 'bg-blue-200'
                  } rounded-2xl px-4 py-1 max-w-75% break-words ${
                    isSameUser(messages, m, i) ? 'mt-3' : 'mt-10'
                  } ${isSameSenderMargin(messages, m, i, userInfo._id)}`}
                >
                  {m.content}
                  <br />
                  <small className="text-gray-500">
                    {format(new Date(m.createdAt), "h:mm a")}
                  </small>
                </span>
              )}
            </div>
          ))}
      </ScrollableFeed>
      </div>
    );
  }
  
  ScrollableChat.propTypes = {
    messages: PropTypes.array.isRequired,
  };
  
  export default ScrollableChat;
  