export const BASE_URL = "http://localhost:5000/api";
import axios from "axios";

export const getDataApi = async (url: string, token: string) => {
  const res = await axios.get(`${BASE_URL}/${url}`, {
    headers: { Authorization: token },
  });
  return res;
};

export const postDataApi = async (url: string, token: string, data: object) => {
  const res = await axios.post(`${BASE_URL}/${url}`, data, {
    headers: { Authorization: token },
  });
  return res;
};

export const putDataApi = async (url: string, token: string, data: object) => {
  const res = await axios.put(`${BASE_URL}/${url}`, data, {
    headers: { Authorization: token },
  });
  return res;
};

export const patchDataApi = async (
  url: string,
  token: string,
  data: object
) => {
  const res = await axios.patch(`${BASE_URL}/${url}`, data, {
    headers: { Authorization: token },
  });
  return res;
};

export const deleteDataApi = async (url: string, token: string) => {
  const res = await axios.delete(`${BASE_URL}/${url}`, {
    headers: { Authorization: token },
  });
  return res;
};
