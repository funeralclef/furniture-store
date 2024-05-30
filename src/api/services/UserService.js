import apiClient from '../apiClient';

const getUsers = () => apiClient.get('/user');
const getUser = (id) => apiClient.get(`/user/${id}`);
const createUser = (data) => apiClient.post('/user', data);
const updateUser = (id, data) => apiClient.put(`/user/${id}`, data);
const deleteUser = (id) => apiClient.delete(`/user/${id}`);

const UserService = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};

export default UserService;