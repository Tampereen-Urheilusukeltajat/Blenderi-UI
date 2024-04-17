import { useMutation } from '@tanstack/react-query';
import { LoginPayload, LoginResponse, login } from '../apiRequests/login';
import { UseMutation } from './common';
import { toast } from 'react-toastify';

export const useLoginMutation = (
  onSuccess: () => void
): UseMutation<LoginResponse, LoginPayload> => {
  const { isError, data, mutate, isPending } = useMutation({
    mutationFn: async (payload: LoginPayload) => login(payload),
    onError: () => {
      toast.error(
        'Kirjautuminen epäonnistui. Tarkista tiedot ja yritä uudelleen.'
      );
    },
    onSuccess: (data) => {
      localStorage.setItem('refreshToken', data.refreshToken);
      localStorage.setItem('accessToken', data.accessToken);

      onSuccess();
    },
  });

  return {
    isPending,
    isError,
    data,
    mutate,
  };
};
