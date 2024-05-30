/* eslint-disable no-unused-vars */
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
  useToast
} from '@chakra-ui/react';
import UserService from '../services/UserService';

const UserAdmin = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [editId, setEditId] = useState(null);
  const toast = useToast();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await UserService.getUsers();
      setUsers(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast({
        title: 'Помилка',
        description: 'Не вдалося завантажити користувачів',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleCreateOrUpdate = async () => {
    const userData = { name, email, password };
    if (editId) {
      try {
        await UserService.updateUser(editId, userData);
        toast({
          title: 'Успіх',
          description: 'Користувача оновлено',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      } catch (error) {
        toast({
          title: 'Помилка',
          description: 'Не вдалося оновити користувача',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    } else {
      try {
        await UserService.createUser(userData);
        toast({
          title: 'Успіх',
          description: 'Користувача створено',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      } catch (error) {
        toast({
          title: 'Помилка',
          description: 'Не вдалося створити користувача',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    }
    setName('');
    setEmail('');
    setPassword('');
    setEditId(null);
    fetchUsers();
  };

  const handleEdit = (user) => {
    setName(user.name);
    setEmail(user.email);
    setPassword(user.password);
    setEditId(user.user_id);
  };

  const handleDelete = async (id) => {
    try {
      await UserService.deleteUser(id);
      toast({
        title: 'Успіх',
        description: 'Користувача видалено',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      fetchUsers();
    } catch (error) {
      toast({
        title: 'Помилка',
        description: 'Не вдалося видалити користувача',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box p={5} shadow="md" borderWidth="1px">
      <FormControl>
        <FormLabel>Ім'я</FormLabel>
        <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Ім'я" />
        <FormLabel>Email</FormLabel>
        <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
        <FormLabel>Пароль</FormLabel>
        <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Пароль" />
      </FormControl>
      <Button mt={4} colorScheme="teal" onClick={handleCreateOrUpdate}>
        {editId ? 'Оновити' : 'Створити'}
      </Button>
      <Table variant="simple" mt={4}>
        <Thead>
          <Tr>
            <Th>Ім'я</Th>
            <Th>Email</Th>
            <Th>Пароль</Th>
            <Th>Дії</Th>
          </Tr>
        </Thead>
        <Tbody>
          {users.map((user) => (
            <Tr key={user.user_id}>
              <Td>{user.name}</Td>
              <Td>{user.email}</Td>
              <Td>{user.password}</Td>
              <Td>
                <Button size="sm" colorScheme="yellow" onClick={() => handleEdit(user)}>
                  Редагувати
                </Button>
                <Button size="sm" colorScheme="red" ml={2} onClick={() => handleDelete(user.user_id)}>
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

export default UserAdmin;