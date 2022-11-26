import { AxiosResponse } from 'axios';
import { getAsync } from './api';

export type User = {
  id: string;
  email: string;
  phone: string;
  forename: string;
  surname: string;
  phoneNumber: string;
  isAdmin: true;
  isBlender: true;
  archivedAt: string;
};

export const getUser = async (
  userId: string,
  accessToken: string
): Promise<AxiosResponse<User>> => getAsync<User>(`/api/user/${userId}`);
