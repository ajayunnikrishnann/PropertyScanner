import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';

function AuctionRegistrationModal({ isOpen, onClose, onRegister, userInfo  }) {
  const { register, handleSubmit, setValue  } = useForm();

  useEffect(() => {
    // Pre-fill the form fields with user information when userInfo changes
    if (userInfo) {
      setValue('username', userInfo.username);
      setValue('email', userInfo.email);
      setValue('mobile', userInfo.mobile);
    }
  }, [userInfo, setValue]);

  const onSubmit = async (data) => {
    try {
        console.log('Submitting data:', data);
      // Assuming onRegister is an asynchronous function that handles the registration
      await onRegister(data);
      onClose(); // Close the modal after successful registration
    } catch (error) {
      console.error('Registration failed:', error);
      // Handle the error (e.g., show an error message)
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Auction Registration</ModalHeader>
        <ModalCloseButton />
        <ModalBody >
          <form className='flex flex-col gap-2' onSubmit={handleSubmit(onSubmit)}>
            {/* Add your form fields, e.g., username, email, mobile, auctionAmount */}
            <input type='text' placeholder='Name' className='rounded-lg  ' {...register('username')} />
            <input type='text' placeholder='Email' className='rounded-lg ' {...register('email')} />
            <input type='text' placeholder='Mobile' className='rounded-lg ' {...register('mobile')}  />
            <input type='text' placeholder='Auction Amount' className='rounded-lg ' {...register('auctionAmount')} />
            <Button type="submit" mt={4} colorScheme="teal">
              Register
            </Button>
          </form>
        </ModalBody>
       
        <ModalFooter>
       
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default AuctionRegistrationModal;
