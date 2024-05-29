import React, { useState } from 'react';
import {
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody,
  ModalCloseButton, Button, FormControl, FormLabel, Input, useDisclosure, useToast
} from '@chakra-ui/react';
import { useAuth } from './AuthContext';

export const LoginModal: React.FC<{ onOpenProfile: () => void }> = ({ onOpenProfile }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const toast = useToast();

  const handleLogin = () => {
    if (!username.trim() || !password.trim()) {
      toast({
        title: 'Помилка',
        description: 'Ви повинні заповнити всі поля!',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    login(username, password);
    onClose();
    onOpenProfile(); // Відкриваємо профіль після входу
  };

  return (
    <>
      <Button onClick={onOpen} ml={1}>Увійти</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Увійти або Зареєструватися</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl mt={4}>
              <FormLabel>Ім'я користувача</FormLabel>
              <Input placeholder="Ім'я користувача" value={username} onChange={(e) => setUsername(e.target.value)} />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Пароль</FormLabel>
              <Input placeholder="Пароль" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="green" variant='outline' mr={3} onClick={handleLogin}>
              Увійти
            </Button>
            <Button onClick={onClose}>Скасувати</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};