import { useMutation } from '@tanstack/react-query';
import {
  ResetRequestPayload,
  ResetRequestResponse,
  passwordResetRequest,
} from '../apiRequests/passwordResetRequest';
import { UseMutation } from './common';
import { toast } from 'react-toastify';

export const usePasswordResetRequestMutation = (
  onSuccess: () => void
): UseMutation<ResetRequestResponse, ResetRequestPayload> => {
  const { isError, isLoading, data, mutate } = useMutation({
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
    isLoading,
    data,
    mutate,
  };
};
