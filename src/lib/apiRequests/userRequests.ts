import { FormUser } from '../../components/UserSettings/UserSettings';
import { authGetAsync, authPatchAsync } from './api';

export type User = {
  id: string;
  email: string;
  forename: string;
  surname: string;
  phone: string;
  isAdmin: boolean;
  isBlender: boolean;
  archivedAt: string;
};

export const getUser = async (userId: string): Promise<User> => {
  const response = await authGetAsync<User>(`/api/user/${userId}`);

  return response.data;
};

export const patchUser = async (
  userId: string,
  payload: Partial<FormUser>
): Promise<User> => {
  const response = await authPatchAsync<User, Partial<FormUser>>(
    `/api/user/${userId}`,
    payload
  );

  return response.data;
};
