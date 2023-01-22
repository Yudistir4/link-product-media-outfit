/* eslint-disable react-hooks/rules-of-hooks */
import { useToast } from "@chakra-ui/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { convertToQueryStr, Delete, Get, Post, Put } from ".";
export const getAccounts = (query) => {
  return useQuery({
    queryKey: ["get-accounts"],
    queryFn: () => Get(`/accounts${convertToQueryStr(query)}`),
  });
};

export const createAccount = (data, onSuccess, onError) => {
  const queryClient = useQueryClient();
  return useMutation({
    onSuccess: (data) => {
      queryClient.invalidateQueries("get-accounts");
      onSuccess(data);
    },
    onError,
    mutationFn: () => Post(`/accounts`, data),
  });
};
export const deleteAccount = (id) => {
  const toast = useToast();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const accounts = queryClient.getQueryData(["get-accounts"]).data.docs;

  let idnext;
  if (accounts.length > 1) {
    idnext = accounts[0].id === id ? accounts[1].id : accounts[0].id;
  } else {
    idnext = accounts[0].id;
  }

  return useMutation({
    onSuccess: (data) => {
      queryClient.invalidateQueries("get-accounts");
      navigate(`/links/${idnext}`);
      toast({ title: data.message, status: "success" });
    },

    onError: (err) => toast({ title: err, status: "error" }),
    mutationFn: () => Delete(`/accounts/${id}`),
  });
};
export const updateProfilePic = (id, onSuccess, onError) => {
  const toast = useToast();
  const queryClient = useQueryClient();
  return useMutation({
    onSuccess: (data) => {
      queryClient.invalidateQueries("get-accounts");
      onSuccess && onSuccess(data);
      toast({ title: data.message, status: "success" });
    },

    onError: (err) => {
      toast({ title: err, status: "error" });
      onError && onError(err);
    },
    mutationFn: (data) => Put(`/accounts/${id}/upload`, data),
  });
};
export const updateAccount = (id, onSuccess, onError) => {
  const toast = useToast();
  const queryClient = useQueryClient();
  return useMutation({
    onSuccess: (data) => {
      queryClient.invalidateQueries("get-accounts");
      onSuccess && onSuccess(data);
      toast({ title: data.message, status: "success" });
    },

    onError: (err) => {
      toast({ title: err, status: "error" });
      onError && onError(err);
    },
    mutationFn: (data) => Put(`/accounts/${id}`, data),
  });
};
