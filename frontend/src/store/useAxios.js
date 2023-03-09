import { useEffect } from 'react';
import { useAuth } from './useAuth';
import axios from 'axios';
import { config } from '../config';
import jwt_decode from 'jwt-decode';
let counter = 1;
const axiosPrivate = axios.create({
  baseURL: config.server,
});
const useAxiosPrivate = () => {
  // console.log('counter =', counter);
  // counter++;
  const { user, setToken } = useAuth((state) => ({
    user: state.user,
    setToken: state.setToken,
  }));

  const { accessToken } = user;

  const refresh = async () => {
    const response = await axios.post(config.server + '/users/refresh', {
      refreshToken: user.refreshToken,
    });
    setToken(response.data.data);
    console.log(response.data.data);
    return response.data.data.accessToken;
  };

  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      async (config) => {
        let currentDate = new Date();
        const decodedToken = jwt_decode(accessToken);
        if (decodedToken.exp * 1000 < currentDate.getTime()) {
          console.log('refresh');

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

    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true;
          console.log('response refresh');
          const newAccessToken = await refresh();
          prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
          return axiosPrivate(prevRequest);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [accessToken, refresh]);

  const Get = async (path) => {
    try {
      return await axiosPrivate.get(path).then((res) => res.data);
    } catch (error) {
      throw error.response.data.message;
    }
  };
  const Post = async (path, data) => {
    try {
      return await axiosPrivate.post(path, data).then((res) => res.data);
    } catch (error) {
      throw error.response.data.message;
    }
  };
  const Put = async (path, data) => {
    try {
      return await axiosPrivate.put(path, data).then((res) => res.data);
    } catch (error) {
      throw error.response.data.message;
    }
  };
  const Delete = async (path, data) => {
    try {
      return await axiosPrivate.delete(path, data).then((res) => res.data);
    } catch (error) {
      throw error.response.data.message;
    }
  };
  return { Get, Post, Put, Delete };
};

export default useAxiosPrivate;
