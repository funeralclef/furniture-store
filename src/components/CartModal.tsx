import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
  Box,
  VStack,
  HStack,
  IconButton,
  NumberInput,
  NumberInputField,
  useDisclosure,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInputStepper,
} from '@chakra-ui/react';
import { useCart } from './CartContext';
import { DeleteIcon } from '@chakra-ui/icons';
import { FiShoppingCart } from "react-icons/fi";
import { CheckoutModal } from './CheckoutModal';

export const CartModal: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { items, updateItemQuantity, removeFromCart, clearCart } = useCart();
  const { isOpen: isCheckoutOpen, onOpen: onCheckoutOpen, onClose: onCheckoutClose } = useDisclosure();

  const totalSum = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <>
      <Button onClick={onOpen} leftIcon={<FiShoppingCart />} bg="brand.100" color="white" _hover={{ bg: 'green.400' }}>
        Кошик ({items.reduce((acc, item) => acc + item.quantity, 0)})
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Ваш кошик</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={5}>
              {items.length === 0 ? (
                <Text>Кошик порожній</Text>
              ) : (
                items.map((item) => (
                  <Box key={item.id} p={2} w="full" borderWidth="1px" borderRadius="lg">
                    <HStack justify="space-between">
                      <Text fontWeight="bold">{item.name}</Text>
                      <IconButton
                        aria-label="Remove item"
                        icon={<DeleteIcon />}
                        onClick={() => removeFromCart(item.id)}
                      />
                    </HStack>
                    <HStack justify="space-between" pt={1}>
                      <Text>Ціна: {item.price} грн</Text>
                      <HStack>
                        <Text>Кількість:</Text>
                        <NumberInput
                          size="sm"
                          maxW={24}
                          defaultValue={item.quantity}
                          min={1}
                          onChange={(valueString) => {
                            const newQuantity = Math.max(1, parseInt(valueString));
                            updateItemQuantity(item.id, newQuantity);
                          }}
                        >
                          <NumberInputField />
                          <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                          </NumberInputStepper>
                        </NumberInput>
                      </HStack>
                    </HStack>
                  </Box>
                ))
              )}
            </VStack>
          </ModalBody>
          <ModalFooter>
            <VStack w="full">
              <HStack justifyContent="space-between" w="full">
                <Text fontSize="lg" fontWeight="semibold">Загальна сума:</Text>
                <Text fontSize="lg">{totalSum} грн</Text>
              </HStack>
              <HStack justifyContent="flex-end" w="full"> 
                {items.length > 0 && (
                  <Button colorScheme='green' variant='outline' mr={3} onClick={onCheckoutOpen}>
                    Оформити замовлення
                  </Button>
                )}
                <Button leftIcon={<DeleteIcon />} colorScheme='red' variant='outline' mr={3} onClick={clearCart}>
                  Очистити кошик
                </Button>
                <Button colorScheme='gray' onClick={onClose}>
                  Закрити
                </Button>
              </HStack>
            </VStack>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <CheckoutModal isOpen={isCheckoutOpen} onClose={onCheckoutClose} items={items} />
    </>
  );
};