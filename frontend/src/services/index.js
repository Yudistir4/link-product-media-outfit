import { config } from '../config';
import axios from 'axios';
import jwt_decode from 'jwt-decode';

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
const refresh = async () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const response = await axios.post(config.server + '/users/refresh', {
    refreshToken: user.refreshToken,
  });

  localStorage.setItem(
    'user',
    JSON.stringify({ ...user, ...response.data.data })
  );
  client.defaults.headers.common[
    'Authorization'
  ] = `Bearer ${response.data.data.accessToken}`;

  return response.data.data.accessToken;
};
client.interceptors.request.use(
  async (config) => {
    let currentDate = new Date();
    let accessToken = JSON.parse(localStorage.getItem('user')).accessToken;
    let decodedToken = jwt_decode(accessToken);
    if (decodedToken.exp * 1000 < currentDate.getTime()) {
      const accessToken = await refresh();
      config.headers['Authorization'] = 'Bearer ' + accessToken;
    } else {
      if (!config.headers['Authorization']) {
        config.headers['Authorization'] = `Bearer ${accessToken}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// let waiting = false;

// client.interceptors.response.use(
//   (resp) => resp,
//   async (error) => {
//     if (error.response.status === 401 && !waiting) {
//       waiting = true;
//       await refresh();
//       // client.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
//       return client(error.config);
//     }
//     waiting = false;
//     return error;
//   }
// );

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
