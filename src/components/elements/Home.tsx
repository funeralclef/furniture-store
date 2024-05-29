import React, { useState } from 'react';
import {
  Box, Button, Text, VStack, Modal, ModalOverlay, ModalContent, ModalHeader, 
  ModalCloseButton, ModalBody, ModalFooter, FormControl, FormLabel, Input, 
  Textarea, useDisclosure, useToast
} from '@chakra-ui/react';
import { MdCall } from 'react-icons/md';
import { BiMailSend } from "react-icons/bi";
import { FurnitureStore } from '../store/FurnitureStore';
import { FurnitureBuilder } from '../store/FurnitureBuilder';


export const Home: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [userPhone, setUserPhone] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userMessage, setUserMessage] = useState('');
  
  const toast = useToast();

  const handleSubmit = () => {
    // Simple validation
    if (!userMessage.trim()) {
      toast({
        title: 'Error',
        description: 'Please enter your message.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }
    if (!userEmail.trim() && !userPhone.trim()) {
      toast({
        title: 'Error',
        description: 'Please enter at least one contact method (phone or email).',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    // Simulate sending the message
    toast({
      title: 'Message Sent',
      description: 'Your message has been sent successfully.',
      status: 'success',
      duration: 5000,
      isClosable: true,
    });

    // Reset the form and close the modal
    setUserPhone('');
    setUserEmail('');
    setUserMessage('');
    onClose();
  };

  return (
    <VStack spacing={8}>
      <Box width="full" p={10} shadow="md" borderWidth="1px" flex="1" borderRadius="md">
        <Text fontSize="xl">Ласкаво просимо до нашого магазину меблів!</Text>
          <Text mt={4}>
            Ви шукаєте диван, який вміє розповідати анекдоти? Стіл, що не тільки тримає ваш обід, а й дарує натхнення для нових рецептів? 
            Ласкаво просимо до нашого магазину, де кожен предмет меблів має свій характер і готовий зробити ваше життя комфортнішим та веселішим!
          </Text>
          <Button mt={4} rightIcon={<MdCall />} colorScheme="orange" variant='outline' onClick={onOpen}>
          Contact us
        </Button>
      </Box>
      
      <FurnitureStore />
      <FurnitureBuilder />
      
      
   {/* Contact Us Modal */}
   <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Contact Us</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <Text>Контактна інформація:</Text>
              <Text fontWeight="bold">Телефон: +380 123 456 789</Text>
              <Text fontWeight="bold">Пошта: info@myfurniturestore.com</Text>

              <FormControl isRequired>
                <FormLabel>Ваш номер телефону</FormLabel>
                <Input 
                  placeholder="Введіть ваш номер телефону"
                  value={userPhone}
                  onChange={(e) => setUserPhone(e.target.value)}
                />
              </FormControl>
              
              <FormControl>
                <FormLabel>Ваша пошта</FormLabel>
                <Input 
                  placeholder="Введіть вашу пошту"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Ваше повідомлення</FormLabel>
                <Textarea 
                  placeholder="Введіть ваше повідомлення"
                  value={userMessage}
                  onChange={(e) => setUserMessage(e.target.value)}
                />
              </FormControl>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button rightIcon={<BiMailSend />} colorScheme="green" variant='outline' mr={3} onClick={handleSubmit}>
              Надіслати
            </Button>
            <Button colorScheme="red" variant='outline' onClick={onClose}>
              Закрити
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </VStack>
  );
};

