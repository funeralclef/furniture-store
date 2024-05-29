import React from 'react';
import {
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody,
  ModalCloseButton, Button, Text, useDisclosure,
  MenuItem
} from '@chakra-ui/react';

export const AdminPanelModal: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <MenuItem onClick={onOpen}>Панель адміністратора</MenuItem>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Панель Адміністратора</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Тут будуть інструменти адміністратора...</Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="red" variant='outline' mr={3} onClick={onClose}>
              Закрити
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};