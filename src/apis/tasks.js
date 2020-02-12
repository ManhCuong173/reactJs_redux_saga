import qs, { parse } from 'query-string';
import AxiosService from './../commons/axiosService';
import { API_ENDPOINT } from './../constants';

const url = 'tasks';
const instanceAxios = new AxiosService();

// https://localhost:4400/tasks METHOD=GET
export const getList = (params = {}) => {
  let parsedQueryString = '';
  if (Object.keys(params).length > 0) {
    parsedQueryString = `?${qs.stringify(params)}`;
  }
  return instanceAxios.get(`${API_ENDPOINT}/${url}${parsedQueryString}`);
};

// https://localhost:4400/tasks METHOD=POST
export const addTask = data => {
  return instanceAxios.post(`${API_ENDPOINT}/${url}`, data);
};

// https://localhost:4400/tasks/:id METHOD=PUT
export const updateTask = (data, taskId) => {
  return instanceAxios.put(`${API_ENDPOINT}/${url}/${taskId}`, data);
};

// https://localhost:4400/tasks/:id METHOD=DELETE
export const removeTask = taskId => {
  return instanceAxios.delete(`${API_ENDPOINT}/${url}/${taskId}`);
};
