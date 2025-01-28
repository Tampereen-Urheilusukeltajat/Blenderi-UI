import { type PatchUser } from '../../components/UserSettings/UserSettings';
import { authGetAsync, authPatchAsync } from './api';

export type User = UserRoles & {
  id: string;
  email: string;
  forename: string;
  surname: string;
  phoneNumber: string;
  archivedAt: string;
};

export type UserRoles = {
  isAdmin: boolean;
  isBlender: boolean;
  isUser: boolean;
};

export const getUser = async (userId: string): Promise<User> => {
  const response = await authGetAsync<User>(`/api/user/${userId}`);

  return response.data;
};

export const patchUser = async (
  userId: string,
  payload: Partial<PatchUser>,
): Promise<User> => {
  const response = await authPatchAsync<User, Partial<PatchUser>>(
    `/api/user/${userId}`,
    payload,
  );

  return response.data;
};

/**
 * More restricted user update route for updating users roles.
 * Not even admins should be able to patch everything.
 * @param userId
 * @param payload
 */
export const patchUserRoles = async (
  userId: string,
  payload: Partial<UserRoles>,
): Promise<User> => {
  const response = await authPatchAsync<User, Partial<UserRoles>>(
    `/api/user/${userId}/roles`,
    payload,
  );

  return response.data;
};

export const getUsers = async (): Promise<User[]> => {
  const response = await authGetAsync<User[]>('/api/user');

  return response.data;
};
