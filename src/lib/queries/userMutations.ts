import { useMutation, useQueryClient } from '@tanstack/react-query';
import { type PatchUser } from '../../components/UserSettings/UserSettings';
import {
  patchUser,
  patchUserRoles,
  type UserRoles,
  type User,
} from '../apiRequests/userRequests';
import { USER_QUERY_KEY, USERS_QUERY_KEY } from './queryKeys';
import { toast } from 'react-toastify';
import { type UseMutation } from './common';

type UserMutationPayload = {
  userId: string;
  payload: Partial<PatchUser>;
};

type UserRolesMutationPayload = {
  userId: string;
  payload: Partial<UserRoles>;
};

export const useUserMutation = (
  onSuccess: () => void,
): UseMutation<User, UserMutationPayload> => {
  const queryClient = useQueryClient();
  const { isPending, mutate, data, isError } = useMutation({
    mutationFn: async ({ userId, payload }: UserMutationPayload) =>
      patchUser(userId, payload),
    onSuccess: async (user) => {
      await queryClient.setQueryData(USER_QUERY_KEY(user.id), user);
      toast.success('Tiedot päivitetty');
      onSuccess();
    },
    onError: () => {
      toast.error('Tietojen päivitys epäonnistui. Yritä uudelleen.');
    },
    retry: 0,
  });

  return {
    isError,
    isPending,
    data,
    mutate,
  };
};

export const useUserRolesMutation = (
  onSuccess?: () => void,
): UseMutation<User, UserRolesMutationPayload> => {
  const queryClient = useQueryClient();
  const { isPending, mutate, data, isError } = useMutation({
    mutationFn: async ({ userId, payload }: UserRolesMutationPayload) =>
      patchUserRoles(userId, payload),
    onSuccess: async (user) => {
      await queryClient.invalidateQueries({ queryKey: USERS_QUERY_KEY });
      toast.success('Käyttäjän rooli päivitetty');
      onSuccess?.();
    },
    onError: () => {
      toast.error('Roolin päivitys epäonnistui. Yritä uudelleen.');
    },
    retry: 0,
  });

  return {
    isError,
    isPending,
    data,
    mutate,
  };
};
