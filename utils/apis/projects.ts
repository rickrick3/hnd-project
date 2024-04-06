import axiosInstance from '../api';

export const fetchMyProjects = async (id:number) => {
  const response = await axiosInstance.get(`/projects/${id}`);
  return response.data;
};

export const createProject = async (project) => {
  const response = await axiosInstance.post('/project', project);
  return response.data;
};

export const deleteProject = async (id:number) => {
  const response = await axiosInstance.delete(`/project/${id}`);
  return response.data;
};
