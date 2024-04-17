import { useMutation } from '@tanstack/react-query';
import {
  type ResetRequestPayload,
  type ResetRequestResponse,
  passwordResetRequest,
} from '../apiRequests/passwordResetRequest';
import { type UseMutation } from './common';
import { toast } from 'react-toastify';

export const usePasswordResetRequestMutation = (
  onSuccess: () => void,
): UseMutation<ResetRequestResponse, ResetRequestPayload> => {
  const { isError, isPending, data, mutate } = useMutation({
    mutationFn: async (payload: ResetRequestPayload) =>
      passwordResetRequest(payload),
    onError: () => {
      toast.error('Palautuslinkin pyyntö epäonnistui. Yritä uudelleen.');
    },
    onSuccess: (data) => {
      toast.success('Palautuslinkin pyyntö onnistui');
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
