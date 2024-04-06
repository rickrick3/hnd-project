import axiosInstance from '../api';

export const fetchTask = async () => {
  const response = await axiosInstance.get('/tasks');
  return response.data;
};

export const createTask = async (todo) => {
  const response = await axiosInstance.post('/tasks', todo);
  return response.data;
};

export const deleteTask = async (id:number) => {
  const response = await axiosInstance.delete(`/tasks/${id}`);
  return response.data;
};
