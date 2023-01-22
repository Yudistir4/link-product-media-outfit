import { config } from "../config";
import axios from "axios";

export const convertToQueryStr = (query) => {
  let result = "";
  for (const key in query) {
    result += `&${key}=${query[key]}`;
  }
  return result.replace("&", "?");
};

export const client = axios.create({ baseURL: config.server });

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
// const Post = (path, data) => client.post(`${config.server}/${path}`, data);
// const Put = (path, data) => client.put(`${config.server}/${path}`, data);
// const Delete = (path, data) => client.delete(`${config.server}/${path}`, data);

// // GET
// export const getAccounts = (query) =>
//   Get(`/accounts${convertToQueryStr(query)}`);
// export const getLinks = (query) => Get(`/links${convertToQueryStr(query)}`);

// // POST
// export const createAccount = (data) => Post(`/accounts`, data);
// export const createLink = (data) => Post(`/links`, data);
// export const convertLink = (data) => Post(`/links/convert`, data);

// // PUT
// export const updateAccount = (data) => Put(`/accounts/${data.id}`, data);
// export const updateProfilePic = (data) => Put(`/accounts/${data.id}`, data);
// export const updateLink = (data) => Put(`/links/${data.id}`, data);

// // DELETE
// export const deleteLink = (id) => Delete(`/links/${id}`);
// export const deleteAccount = (id) => Delete(`/accounts/${id}`);
