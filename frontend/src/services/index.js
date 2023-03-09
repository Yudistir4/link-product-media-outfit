import { config } from '../config';
import axios from 'axios';

export const convertToQueryStr = (query) => {
  let result = '';
  for (const key in query) {
    result += `&${key}=${query[key]}`;
  }
  return result.replace('&', '?');
};

export const client = axios.create({
  baseURL: config.server,
});

export const Get = async (path) => {
  try {
    return await client.get(path).then((res) => res.data);
  } catch (error) {
    throw error.response.data.message;
  }
};
export const Post = async (path, data) => {
  try {
    return await client.post(path, data).then((res) => res.data);
  } catch (error) {
    throw error.response.data.message;
  }
};
export const Put = async (path, data) => {
  try {
    return await client.put(path, data).then((res) => res.data);
  } catch (error) {
    throw error.response.data.message;
  }
};
export const Delete = async (path, data) => {
  try {
    return await client.delete(path, data).then((res) => res.data);
  } catch (error) {
    throw error.response.data.message;
  }
};
