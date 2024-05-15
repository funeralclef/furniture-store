import * as React from 'react';
import { Box, Select, SimpleGrid, Text, VStack, Button, Input, Image, Center, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useCart } from './CartContext';
import { FiShoppingCart } from "react-icons/fi";
import { SearchIcon } from '@chakra-ui/icons';



interface FurnitureItem {
  id: number;
  name: string;
  price: number;
  type: string;
  image: string;
}

const furnitureItems: FurnitureItem[] = [
  { id: 1, name: "Стілець класичний", price: 1200, type: "Chair", image: "https://www.freeiconspng.com/thumbs/chair-png/chair-png-30.png" },
  { id: 2, name: "Стіл офісний", price: 3200, type: "Table", image: "https://www.transparentpng.com/thumb/table/white-folding-table-transparent-background-qeQnYP.png" },
  { id: 3, name: "Диван розкладний", price: 5600, type: "Sofa", image: "https://freepngimg.com/thumb/sofa/13-2-sofa-png-pic-thumb.png" },
  { id: 4, name: "Крісло релакс", price: 2500, type: "Armchair", image: "https://static.vecteezy.com/system/resources/previews/024/807/230/original/modern-white-sofa-isolated-on-transparent-background-ai-generated-png.png" },
  { id: 5, name: "Шафа для одягу", price: 4800, type: "Wardrobe", image: "https://static.vecteezy.com/system/resources/previews/026/844/803/original/wooden-brown-empty-closet-with-shelves-and-hangers-clipart-on-transparent-background-empty-wardrobe-storage-unit-clipart-isolated-cupboard-isolated-empty-armoire-isolated-wooden-brown-closet-free-png.png" },
  { id: 6, name: "Стіл кавовий", price: 800, type: "Table", image: "https://png.pngtree.com/png-vector/20231210/ourmid/pngtree-wooden-round-table-isolated-on-white-background-3d-render-png-image_11208824.png" },
  { id: 7, name: "Стілець барний", price: 1300, type: "Chair", image: "https://png.pngtree.com/png-clipart/20231003/original/pngtree-black-royal-throne-chair-ai-generated-png-image_13246900.png" },
  { id: 8, name: "Комод дерев'яний", price: 2100, type: "Chest", image: "https://pngimg.com/d/dresser_PNG83.png" },
];

export const FurnitureStore: React.FC = () => {
  const [selectedType, setSelectedType] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filteredItems, setFilteredItems] = useState<FurnitureItem[]>(furnitureItems);
  const { addToCart } = useCart();

  useEffect(() => {
    let items = furnitureItems.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()));
    if (selectedType) {
      items = items.filter(item => item.type === selectedType);
    }
    setFilteredItems(items);
  }, [selectedType, searchTerm]);

  const handleAddToCart = (item: FurnitureItem) => {
    addToCart({ ...item, quantity: 1 });
  };

  return (
    <VStack spacing={4} align="stretch" w="full">
      <Box p={10} shadow="md" borderWidth="1px" flex="1" borderRadius="md">
        <VStack spacing={4} align="stretch" w="full">
          <Box>
            <Text fontSize="2xl" mb={4}>Наші меблі</Text>
            <InputGroup>
              <InputLeftElement pointerEvents='none'>
                <SearchIcon color='gray.300' />
              </InputLeftElement>
              <Input placeholder="Пошук меблів" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} mb={4} />
            </InputGroup>
            <Select placeholder="Виберіть тип меблів" onChange={(e) => setSelectedType(e.target.value)}>
              <option value="Chair">Стільці</option>
              <option value="Table">Столи</option>
              <option value="Sofa">Дивани</option>
              <option value="Armchair">Крісла</option>
              <option value="Wardrobe">Шафи</option>
              <option value="Chest">Комоди</option>
            </Select>
          </Box>
          <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing={10}>
            {filteredItems.map(item => (
              <Center flexDirection="column" key={item.id} p={5} shadow="md" borderWidth="1px" borderRadius="md">
                <Image src={item.image} alt={item.name} boxSize="200px" objectFit="cover" mb={3} />
                <Text fontWeight="bold" mb={2} textAlign="center">{item.name}</Text>
                <Text mb={3} textAlign="center">Ціна: {item.price} грн</Text>
                <Button leftIcon={<FiShoppingCart />} colorScheme="orange" size="sm" onClick={() => handleAddToCart(item)}>
                  Додати до кошика
                </Button>
              </Center>
            ))}
          </SimpleGrid>
        </VStack>
      </Box>
    </VStack>
  );
};