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
  Select
} from '@chakra-ui/react';
import OrderService from '../services/OrderService';
import UserService from '../services/UserService';

const OrderAdmin = () => {
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState('');
  const [orderTime, setOrderTime] = useState('');
  const [orderStatus, setOrderStatus] = useState('');
  const [editId, setEditId] = useState(null);
  const toast = useToast();

  useEffect(() => {
    fetchOrders();
    fetchUsers();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await OrderService.getOrders();
      setOrders(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast({
        title: 'Помилка',
        description: 'Не вдалося завантажити замовлення',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await UserService.getUsers();
      setUsers(response.data);
    } catch (error) {
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
    const orderData = { user_id: userId, order_time: orderTime, order_status: orderStatus };
    if (editId) {
      try {
        await OrderService.updateOrder(editId, orderData);
        toast({
          title: 'Успіх',
          description: 'Замовлення оновлено',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      } catch (error) {
        toast({
          title: 'Помилка',
          description: 'Не вдалося оновити замовлення',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    } else {
      try {
        await OrderService.createOrder(orderData);
        toast({
          title: 'Успіх',
          description: 'Замовлення створено',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      } catch (error) {
        toast({
          title: 'Помилка',
          description: 'Не вдалося створити замовлення',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    }
    setUserId('');
    setOrderTime('');
    setOrderStatus('');
    setEditId(null);
    fetchOrders();
  };

  const handleEdit = (order) => {
    setUserId(order.user_id);
    setOrderTime(order.order_time);
    setOrderStatus(order.order_status);
    setEditId(order.order_id);
  };

  const handleDelete = async (id) => {
    try {
      await OrderService.deleteOrder(id);
      toast({
        title: 'Успіх',
        description: 'Замовлення видалено',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      fetchOrders();
    } catch (error) {
      toast({
        title: 'Помилка',
        description: 'Не вдалося видалити замовлення',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box p={5} shadow="md" borderWidth="1px">
      <FormControl>
        <FormLabel>Користувач</FormLabel>
        <Select placeholder="Виберіть користувача" value={userId} onChange={(e) => setUserId(e.target.value)}>
          {users.map((user) => (
            <option key={user.user_id} value={user.user_id}>
              {user.name}
            </option>
          ))}
        </Select>

        <FormLabel>Час замовлення</FormLabel>
        <Input
          type="datetime-local"
          value={orderTime}
          onChange={(e) => setOrderTime(e.target.value)}
          placeholder="Час замовлення"
        />

        <FormLabel>Статус замовлення</FormLabel>
        <Input
          value={orderStatus}
          onChange={(e) => setOrderStatus(e.target.value)}
          placeholder="Статус замовлення"
        />
      </FormControl>
      <Button mt={4} colorScheme="teal" onClick={handleCreateOrUpdate}>
        {editId ? 'Оновити' : 'Створити'}
      </Button>
      <Table variant="simple" mt={4}>
        <Thead>
          <Tr>
            <Th>Користувач</Th>
            <Th>Час замовлення</Th>
            <Th>Статус замовлення</Th>
            <Th>Дії</Th>
          </Tr>
        </Thead>
        <Tbody>
          {orders.map((order) => (
            <Tr key={order.order_id}>
              <Td>{order.user_id}</Td>
              <Td>{order.order_time}</Td>
              <Td>{order.order_status}</Td>
              <Td>
                <Button size="sm" colorScheme="yellow" onClick={() => handleEdit(order)}>
                  Редагувати
                </Button>
                <Button size="sm" colorScheme="red" ml={2} onClick={() => handleDelete(order.order_id)}>
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

export default OrderAdmin;