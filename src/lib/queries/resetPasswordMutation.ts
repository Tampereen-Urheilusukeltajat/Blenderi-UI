import { useMutation } from '@tanstack/react-query';
import {
  type ResetPayload,
  type ResetResponse,
  resetPassword,
} from '../apiRequests/resetPassword';
import { type UseMutation } from './common';
import { toast } from 'react-toastify';

export const useResetPasswordMutation = (
  onSuccess: () => void,
): UseMutation<ResetResponse, ResetPayload> => {
  const { isError, isPending, data, mutate } = useMutation({
    mutationFn: async (payload: ResetPayload) => resetPassword(payload),
    onError: () => {
      toast.error('Salasanan asettaminen epäonnistui. Yritä uudelleen.');
    },
    onSuccess: (data) => {
      toast.success('Salasana vaihdettu');
      onSuccess();
    },
  });

  return {
    isError,
    isPending,
    data,
    mutate,
  };
};
