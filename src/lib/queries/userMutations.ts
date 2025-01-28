import { useMutation, useQueryClient } from '@tanstack/react-query';
import { type PatchUser } from '../../components/UserSettings/UserSettings';
import { patchUser, type User } from '../apiRequests/userRequests';
import { USER_QUERY_KEY } from './queryKeys';
import { toast } from 'react-toastify';
import { type UseMutation } from './common';

type MutationPayload = {
  userId: string;
  payload: Partial<PatchUser>;
};

export const useUserMutation = (
  onSuccess: () => void,
): UseMutation<User, MutationPayload> => {
  const queryClient = useQueryClient();
  const { isPending, mutate, data, isError } = useMutation({
    mutationFn: async ({ userId, payload }: MutationPayload) =>
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
