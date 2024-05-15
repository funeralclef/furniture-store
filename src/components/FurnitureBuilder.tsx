import * as React from 'react';
import {
  Box, Button, NumberInput, NumberInputField, Select, Stack, Text, VStack, FormControl, FormLabel,
  NumberDecrementStepper, NumberIncrementStepper, NumberInputStepper, AlertDialog,
  AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogBody, AlertDialogFooter,
  useToast
} from '@chakra-ui/react';
import { useCart } from './CartContext';
import { FiShoppingCart } from "react-icons/fi";

export const FurnitureBuilder: React.FC = () => {
  const [furnitureType, setFurnitureType] = React.useState<string>('');
  const [materialA, setMaterialA] = React.useState<string>('');
  const [materialB, setMaterialB] = React.useState<string>('');
  const [quantity, setQuantity] = React.useState<number>(1);
  const { addToCart } = useCart();

  const [isAlertOpen, setIsAlertOpen] = React.useState(false);
  const onCloseAlert = () => setIsAlertOpen(false);
  const cancelRef = React.useRef<HTMLButtonElement>(null);
  const toast = useToast();

  const calculatePrice = () => {
    let basePrice = 0;
    switch (furnitureType) {
      case "Стіл":
        basePrice = 1000;
        break;
      case "Стілець":
        basePrice = 300;
        break;
      case "Диван":
        basePrice = 5000;
        break;
      case "Крісло":
        basePrice = 1500;
        break;
      case "Шафа":
        basePrice = 2500;
        break;
      case "Комод":
        basePrice = 1200;
        break;
      default:
        basePrice = 0;
    }

    let materialMultiplier = 1;
    if (materialA === "Дерево" || materialB === "Дерево") {
      materialMultiplier += 0.2;
    }
    if (materialA === "Метал" || materialB === "Метал") {
      materialMultiplier += 0.3;
    }
    if (materialA === "Скло" || materialB === "Скло") {
      materialMultiplier += 0.15;
    }

    return basePrice * materialMultiplier * quantity;
  };

  const handleOrderConfirmation = () => {
    if (!furnitureType || !materialA || !materialB) {
      toast({
        title: "Необхідно заповнити всі поля",
        description: "Будь ласка, виберіть всі опції для меблів.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom"
      });
      return;
    }
    setIsAlertOpen(true);
  };

  const confirmOrder = () => {
    const id = new Date().getTime(); // Simple unique id generator
    const name = `Кастомний ${furnitureType} з ${materialA} та ${materialB}`;
    const price = calculatePrice(); // Use the price calculation here
    
    addToCart({
      id,
      name,
      price,
      quantity,
    });

    toast({
      title: "Замовлення додано до кошика",
      description: `${name} у кількість ${quantity} додано до кошика. Ціна: ${price} грн.`,
      status: "success",
      duration: 5000,
      isClosable: true,
      position: "bottom"
    });
    setIsAlertOpen(false);
  };

  return (
    <VStack spacing={4} align="stretch" w="full">
      <Box p={5} shadow="md" borderWidth="1px" borderRadius="md">
        <Text color="black" fontSize="2xl" mb={4}>Конструктор меблів</Text>
        <Stack spacing={3} color="black">
          <Select placeholder="Виберіть тип меблів" value={furnitureType} onChange={(e) => setFurnitureType(e.target.value)}>
            <option value="Стіл">Стіл</option>
            <option value="Стілець">Стілець</option>
            <option value="Диван">Диван</option>
            <option value="Крісло">Крісло</option>
            <option value="Шафа">Шафа</option>
            <option value="Комод">Комод</option>
          </Select>
          <Select placeholder="Виберіть тип матеріалу А" value={materialA} onChange={(e) => setMaterialA(e.target.value)}>
            <option value="Дерево">Дерево</option>
            <option value="Метал">Метал</option>
            <option value="Пластик">Пластик</option>
            <option value="Тканина">Тканина</option>
          </Select>
          <Select placeholder="Виберіть тип матеріалу Б" value={materialB} onChange={(e) => setMaterialB(e.target.value)}>
            <option value="Дерево">Дерево</option>
            <option value="Метал">Метал</option>
            <option value="Скло">Скло</option>
            <option value="Тканина">Тканина</option>
          </Select>
          <FormControl>
            <NumberInput min={1} max={100} value={quantity} onChange={(_, valueAsNumber) => setQuantity(valueAsNumber)}>
              <NumberInputField placeholder="Введіть кількість" /> 
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Ціна вашого замовлення</FormLabel>
            <Text fontSize="xl">{calculatePrice()} грн</Text>
          </FormControl>
          <Button leftIcon={<FiShoppingCart />} colorScheme="orange" onClick={handleOrderConfirmation}>Замовити</Button>
        </Stack>
      </Box>

      <AlertDialog
        isOpen={isAlertOpen}
        leastDestructiveRef={cancelRef}
        onClose={onCloseAlert}
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Підтвердження Замовлення
            </AlertDialogHeader>

            <AlertDialogBody>
              Ви замовляєте: <Text as="span" fontWeight="semibold">{`Кастомний ${furnitureType} з ${materialA} та ${materialB}`}</Text>
              <br />
              Кількість: {quantity}
              <br />
              Загальна ціна: {calculatePrice()} грн.
              <br />
              Ви точно впевнені?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button colorScheme="green" variant='outline' onClick={confirmOrder} mr={3}>
                Так
              </Button>
              <Button ref={cancelRef} onClick={onCloseAlert}>
                Ні
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </VStack>
  );
};