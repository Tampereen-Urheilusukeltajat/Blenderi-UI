import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

export const AXIOS_CONFIG: AxiosRequestConfig = {
  baseURL: process.env.REACT_APP_BACKEND_URL,
};

export const getAsync = async <Response>(
  url: string
): Promise<AxiosResponse<Response>> => axios.get<Response>(url, AXIOS_CONFIG);

export const postAsync = async <Response, Payload>(
  url: string,
  payload: Payload
): Promise<AxiosResponse<Response>> =>
  axios.post<Response>(url, payload, AXIOS_CONFIG);

export const patchAsync = async <Response, Payload>(
  url: string,
  payload: Payload
): Promise<AxiosResponse<Response>> =>
  axios.patch<Response>(url, payload, AXIOS_CONFIG);

export const deleteAsync = async <Response>(
  url: string
): Promise<AxiosResponse<Response>> =>
  axios.delete<Response>(url, AXIOS_CONFIG);
