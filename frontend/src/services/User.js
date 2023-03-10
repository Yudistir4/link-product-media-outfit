/* eslint-disable react-hooks/rules-of-hooks */
import { useMutation } from '@tanstack/react-query';
import { useAuth } from '../store/useAuth';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { config } from '../config';
import { client } from '.';
export const login = () => {
  const login = useAuth((state) => state.login);
  const navigate = useNavigate();
  return useMutation({
    onSuccess: (data) => {
      login(data.data.data);
      client.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${data.data.data.accessToken}`;
      console.log(data.data);
      return navigate('/links');
    },

    mutationFn: (data) => axios.post(config.server + `/users/login`, data),
    // mutationFn: (data) => Post(`/users/login`, data),
  });
};
