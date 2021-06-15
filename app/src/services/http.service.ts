import axios, { AxiosInstance } from 'axios';

export const HTTP: AxiosInstance = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
});