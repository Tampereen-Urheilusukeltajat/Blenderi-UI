import { postAsync } from './api';

export type LoginPayload = {
  email: string;
  password: string;
};

export type LoginResponse = {
  refreshToken: string;
  accessToken: string;
};

export const login = async (payload: LoginPayload): Promise<LoginResponse> =>
  (await postAsync<LoginResponse, LoginPayload>('/api/login/', payload)).data;
