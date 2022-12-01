import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { getUser, User } from '../apiRequests/userRequests';
import { UseQuery } from './common';
import { USER_QUERY_KEY } from './queryKeys';

export const useUserQuery = (userId: string): UseQuery<User> => {
  const { isLoading, data, isError } = useQuery({
    queryKey: USER_QUERY_KEY(userId),
    queryFn: async () => getUser(userId),
    onError: () => {
      toast.error('Käyttäjätietojen hakeminen epäonnistui. Yritä uudelleen.');
    },
    staleTime: 1000 * 60 * 60, // One hour
    retry: 1,
  });

  return {
    data,
    isLoading,
    isError,
  };
};
