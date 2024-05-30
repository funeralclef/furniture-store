import apiClient from '../apiClient';

const getOrders = () => apiClient.get('/order');
const getOrder = (id) => apiClient.get(`/order/${id}`);
const createOrder = (data) => apiClient.post('/order', data);
const updateOrder = (id, data) => apiClient.put(`/order/${id}`, data);
const deleteOrder = (id) => apiClient.delete(`/order/${id}`);

const OrderService = {
  getOrders,
  getOrder,
  createOrder,
  updateOrder,
  deleteOrder,
};

export default OrderService;