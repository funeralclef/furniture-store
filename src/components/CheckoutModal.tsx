import React, { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Radio,
  RadioGroup,
  Stack,
  HStack,
  Text,
  VStack,
  Textarea,
  useToast,
} from '@chakra-ui/react';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose, items }) => {
  const [fullName, setFullName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [paymentType, setPaymentType] = useState<string>('card');
  const [deliveryType, setDeliveryType] = useState<string>('pickup');
  const [address, setAddress] = useState<string>('');

  const toast = useToast();

  const validateEmail = (email: string) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const totalOrderSum = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleSubmit = () => {
    if (fullName.trim().split(' ').length < 2) {
      toast({
        title: 'Помилка введення',
        description: 'Будь ласка, введіть ваше повне ім\'я (мінімум два слова).',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    if (!phone.trim() || !/^(\+?[\d\s]{10,15})$/.test(phone.trim())) {
      toast({
        title: 'Помилка введення',
        description: 'Будь ласка, введіть коректний номер телефону.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    if (email.trim() && !validateEmail(email)) {
      toast({
        title: 'Помилка введення',
        description: 'Будь ласка, введіть коректний email.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    if (deliveryType === 'delivery' && !address.trim()) {
      toast({
        title: 'Помилка введення',
        description: 'Будь lаска, введіть адресу доставки.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    console.log('Замовлення:');
    console.log('ПІБ:', fullName);
    console.log('Телефон:', phone);
    console.log('Email:', email);
    console.log('Тип оплати:', paymentType === 'card' ? 'Карткою' : 'Готівкою');
    console.log('Спосіб доставки:', deliveryType === 'pickup' ? 'Самовивіз' : 'Доставка');
    if (deliveryType === 'delivery') {
      console.log('Адреса доставки:', address);
    }
    onClose(); // Закрити модальне вікно після замовлення
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Оформлення замовлення</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4}>
            <Text fontSize="md" fontWeight="semibold">Товари у замовленні:</Text>
            {items.map((item, index) => (
              <HStack key={index} justifyContent="space-between" w="full">
                <Text fontWeight="semibold">{item.name}</Text>
                <Text>Ціна: {item.price} грн × {item.quantity} = {item.price * item.quantity} грн</Text>
              </HStack>
            ))}
            <Text fontSize="lg" fontWeight="semibold" pt={4}>Загальна сума замовлення: {totalOrderSum} грн</Text>
            <FormControl isRequired>
              <FormLabel>ПІБ</FormLabel>
              <Input placeholder="Введіть ваше повне ім'я" value={fullName} onChange={(e) => setFullName(e.target.value)} />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Номер телефону</FormLabel>
              <Input placeholder="Введіть ваш номер телефону" value={phone} onChange={(e) => setPhone(e.target.value)} />
            </FormControl>
            <FormControl>
              <FormLabel>Електронна пошта</FormLabel>
              <Input placeholder="Введіть ваш email (необов'язково)" value={email} onChange={(e) => setEmail(e.target.value)} />
            </FormControl>
            <FormControl as="fieldset">
              <FormLabel as="legend">Тип оплати</FormLabel>
              <RadioGroup onChange={setPaymentType} value={paymentType}>
                <Stack direction="row">
                  <Radio value="card">Карткою</Radio>
                  <Radio value="cash">Готівкою</Radio>
                </Stack>
              </RadioGroup>
            </FormControl>
            <FormControl as="fieldset">
              <FormLabel as="legend">Спосіб доставки</FormLabel>
              <RadioGroup onChange={setDeliveryType} value={deliveryType}>
                <Stack direction="row">
                  <Radio value="pickup">Самовивіз</Radio>
                  <Radio value="delivery">Доставка</Radio>
                </Stack>
              </RadioGroup>
            </FormControl>
            {deliveryType === 'pickup' && (
              <Text mt={1}>Адреса магазину: вул. Головна 1, Київ</Text>
            )}
            {deliveryType === 'delivery' && (
              <FormControl isRequired>
                <FormLabel>Адреса доставки</FormLabel>
                <Textarea placeholder="Введіть адресу доставки" value={address} onChange={(e) => setAddress(e.target.value)} />
              </FormControl>
            )}
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="green" variant='outline' mr={3} onClick={handleSubmit}>
            Замовити
          </Button>
          <Button colorScheme="gray" onClick={onClose}>
            Скасувати
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};