/* eslint-disable react-hooks/rules-of-hooks */
import { useToast } from '@chakra-ui/react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { convertToQueryStr, Delete, Get, Post, Put } from '.';
import { useAuth } from '../store/useAuth';
import { useNavigate } from 'react-router-dom';

export const login = () => {
  const login = useAuth((state) => state.login);
  const navigate = useNavigate();
  return useMutation({
    onSuccess: (data) => {
      login(data.data);
      console.log(data.data);
      return navigate('/links');
    },

    mutationFn: (data) => Post(`/users/login`, data),
  });
};
