import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Input,
  FormControl,
  FormLabel,
  useToast,
} from '@chakra-ui/react';
import CategoryService from '../services/CategoryService';

const CategoryAdmin = () => {
  const [categories, setCategories] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [editId, setEditId] = useState(null);
  const toast = useToast();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await CategoryService.getCategories();
      setCategories(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast({
        title: 'Помилка',
        description: 'Не вдалося завантажити категорії',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleCreateOrUpdate = async () => {
    if (editId) {
      try {
        await CategoryService.updateCategory(editId, { name });
        toast({
          title: 'Успіх',
          description: 'Категорію оновлено',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      } catch (error) {
        toast({
          title: 'Помилка',
          description: 'Не вдалося оновити категорію',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    } else {
      try {
        await CategoryService.createCategory({ name });
        toast({
          title: 'Успіх',
          description: 'Категорію створено',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      } catch (error) {
        toast({
          title: 'Помилка',
          description: 'Не вдалося створити категорію',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    }
    setName('');
    setEditId(null);
    fetchCategories();
  };

  const handleEdit = (category) => {
    setName(category.name);
    setEditId(category.category_id);
  };

  const handleDelete = async (id) => {
    try {
      await CategoryService.deleteCategory(id);
      toast({
        title: 'Успіх',
        description: 'Категорію видалено',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      fetchCategories();
    } catch (error) {
      toast({
        title: 'Помилка',
        description: 'Не вдалося видалити категорію',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box p={5} shadow="md" borderWidth="1px">
      <FormControl>
        <FormLabel>Назва категорії</FormLabel>
        <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Назва категорії" />
      </FormControl>
      <Button mt={4} colorScheme="teal" onClick={handleCreateOrUpdate}>
        {editId ? 'Оновити' : 'Створити'}
      </Button>
      <Table variant="simple" mt={4}>
        <Thead>
          <Tr>
            <Th>Назва</Th>
            <Th>Дії</Th>
          </Tr>
        </Thead>
        <Tbody>
          {categories.map((category) => (
            <Tr key={category.category_id}>
              <Td>{category.name}</Td>
              <Td>
                <Button size="sm" colorScheme="yellow" onClick={() => handleEdit(category)}>
                  Редагувати
                </Button>
                <Button size="sm" colorScheme="red" ml={2} onClick={() => handleDelete(category.category_id)}>
                  Видалити
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default CategoryAdmin;