import { postAsync } from './api';

export type RegisterPayload = {
  forename: string;
  surname: string;
  email: string;
  phoneNumber: string;
  password: string;
  turnstileToken: string;
};

export type RegisterResponse = {
  id: string;
  email: string;
  phoneNumber: string;
  forename: string;
  surname: string;
  isAdmin: boolean;
  isBlender: boolean;
  archivedAt: string;
};
export const register = async (
  payload: RegisterPayload
): Promise<RegisterResponse> =>
  (await postAsync<RegisterResponse, RegisterPayload>('/api/user/', payload))
    .data;
