import apiClient from '../apiClient';

const getCategories = () => apiClient.get('/category');
const getCategory = (id) => apiClient.get(`/category/${id}`);
const createCategory = (data) => apiClient.post('/category', data);
const updateCategory = (id, data) => apiClient.put(`/category/${id}`, data);
const deleteCategory = (id) => apiClient.delete(`/category/${id}`);

// Перед експортом присвойте об'єкт змінній
const CategoryService = {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
};

export default CategoryService;