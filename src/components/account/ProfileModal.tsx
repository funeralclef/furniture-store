import React, { useState } from 'react';
import {
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody,
  ModalCloseButton, Button, FormControl, FormLabel, Input, useDisclosure,
  MenuItem
} from '@chakra-ui/react';
import { useAuth } from './AuthContext';

export const ProfileModal: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user } = useAuth();
  const [name, setName] = useState(user.username);
  const [email, setEmail] = useState('');

  return (
    <>
      <MenuItem onClick={onOpen}>Профіль</MenuItem>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Ваш Профіль</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl mt={4}>
              <FormLabel>Ім'я</FormLabel>
              <Input placeholder="Ваше ім'я" value={name} onChange={(e) => setName(e.target.value)} />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Email</FormLabel>
              <Input placeholder="Ваш email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="green" variant='outline' mr={3} onClick={onClose}>
              Зберегти
            </Button>
            <Button onClick={onClose}>Скасувати</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};