/* eslint-disable react-hooks/rules-of-hooks */
import { useToast } from '@chakra-ui/react';
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { convertToQueryStr } from '.';
import copy from 'copy-to-clipboard';
import useAxiosPrivate from '../store/useAxios';
export const getGenerateLink = (id, onSuccess, onError) => {
  // Get(`/links${convertToQueryStr({ limit: 999999, page: 1, id })}`);
  const { Get } = useAxiosPrivate();

  const toast = useToast();
  return useQuery({
    // refetchOnMount: false,
    refetchOnWindowFocus: false,
    enabled: false,
    queryKey: ['get-generate-link', id],
    onSuccess: (data) => {
      onSuccess && onSuccess(data);
      for (let i = 0; i < data.data.docs.length; i++) {
        delete data.data.docs[i]._id;
        delete data.data.docs[i].updatedAt;
        delete data.data.docs[i].createdAt;
        delete data.data.docs[i].__v;
        delete data.data.docs[i].account;
      }
      console.log(data);

      copy(JSON.stringify(data.data.docs));
      toast({ title: 'Text Copied!!!', status: 'success' });
    },

    onError: (err) => {
      toast({ title: err, status: 'error' });
      onError && onError(err);
    },
    queryFn: () =>
      Get(
        `/links${convertToQueryStr({ limit: 999999, page: 1, account: id })}`
      ),
  });
};
export const getLinks = (query) => {
  const { Get } = useAxiosPrivate();

  return useInfiniteQuery({
    queryKey: ['get-links', query.account],
    queryFn: ({ pageParam = 1 }) => {
      return Get(`/links${convertToQueryStr(query)}&page=${pageParam}`);
    },
    getNextPageParam: (last, pages) => {
      if (pages.length < last.data.totalPages) {
        return pages.length + 1;
      } else {
        return undefined;
      }
    },
  });
};

export const createLink = (onSuccess, onError) => {
  const { Post } = useAxiosPrivate();
  const queryClient = useQueryClient();
  const toast = useToast();
  return useMutation({
    onSuccess: (data) => {
      queryClient.invalidateQueries('get-links');
      onSuccess && onSuccess(data);
      toast({ title: data.message, status: 'success' });
    },

    onError: (err) => {
      console.log(err);
      toast({ title: err, status: 'error' });
      onError && onError(err);
    },
    mutationFn: (data) => Post(`/links`, data),
  });
};
export const deleteLink = (id) => {
  const { Delete } = useAxiosPrivate();

  const toast = useToast();
  const queryClient = useQueryClient();
  return useMutation({
    onSuccess: (data) => {
      queryClient.invalidateQueries('get-links');
      toast({ title: data.message, status: 'success' });
    },
    onError: (err) => toast({ title: err, status: 'error' }),
    mutationFn: () => Delete(`/links/${id}`),
  });
};

export const updateLink = (id, onSuccess, onError) => {
  const { Put } = useAxiosPrivate();
  const toast = useToast();
  const queryClient = useQueryClient();
  return useMutation({
    onSuccess: (data) => {
      queryClient.invalidateQueries('get-links');
      onSuccess && onSuccess(data);
      toast({ title: data.message, status: 'success' });
    },

    onError: (err) => {
      toast({ title: err, status: 'error' });
      onError && onError(err);
    },
    mutationFn: (data) => Put(`/links/${id}`, data),
  });
};
export const convertLink = (onSuccess, onError) => {
  const { Post } = useAxiosPrivate();
  const toast = useToast();
  const queryClient = useQueryClient();
  return useMutation({
    onSuccess: (data) => {
      queryClient.invalidateQueries('get-links');
      onSuccess && onSuccess(data);
      toast({ title: data.message, status: 'success' });
    },

    onError: (err) => {
      toast({ title: err, status: 'error' });
      onError && onError(err);
    },
    mutationFn: (data) => Post(`/links/convert`, data),
  });
};
