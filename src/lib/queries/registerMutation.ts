import { useMutation } from '@tanstack/react-query';
import { type UseMutation } from './common';
import { toast } from 'react-toastify';
import {
  type RegisterPayload,
  type RegisterResponse,
  register,
} from '../apiRequests/register';
import { useNavigate } from 'react-router-dom';

export const useRegisterMutation = (): UseMutation<
  RegisterResponse,
  RegisterPayload
> => {
  const navigate = useNavigate();

  const { isError, isPending, data, mutate } = useMutation({
    mutationFn: async (payload: RegisterPayload) => register(payload),
    onError: () => {
      toast.error(
        'Rekistöröityminen epäonnistui. Tarkista tiedot ja yritä uudelleen.',
      );
    },
    onSuccess: () => {
      toast.success('Rekistöröityminen onnistui! Kirjaudu sisään.');
      navigate('/login');
    },
  });

  return {
    isError,
    isPending,
    data,
    mutate,
  };
};
