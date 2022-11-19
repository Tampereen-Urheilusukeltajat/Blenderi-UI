import { AxiosResponse } from 'axios';
import { getAsync } from './api';

export type User = {
  email: string;
  forename: string;
  surname: string;
  isAdmin: boolean;
  isBlender: boolean;
};

export const getUser = async (
  userId: string,
  accessToken: string
): Promise<AxiosResponse<User>> => getAsync<User>(`/api/user/${userId}`);
