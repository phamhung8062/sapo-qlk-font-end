import axiosService from '../commons/axoisService';
import qs from 'query-string';
import { API_ENDPOINT } from '../constants';
const url = 'task';
export const getList = (params = {}) => {
  let queryParam = '';
  if (Object.keys(params).length > 0) {
    queryParam = `?${qs.stringify(params)}`;
  }
  return axiosService.get(`${API_ENDPOINT}/${url}${queryParam}`);
};
export const addTask = (data) => {
  return axiosService.post(`${API_ENDPOINT}/${url}`, data);
};
export const updateTask = (data, taskId) => {
  return axiosService.put(`${API_ENDPOINT}/${url}/${taskId}`, data);
};
export const deleteTask = (taskId) => {
  return axiosService.delete(`${API_ENDPOINT}/${url}/${taskId}`);
};
