import React from 'react';
import {
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody,
  ModalCloseButton, Button, Text, useDisclosure,
  MenuItem
} from '@chakra-ui/react';

export const OrdersModal: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <MenuItem onClick={onOpen}>Замовлення</MenuItem>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Ваші Замовлення</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Тут буде список замовлень користувача...</Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" variant='outline' mr={3} onClick={onClose}>
              Закрити
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};