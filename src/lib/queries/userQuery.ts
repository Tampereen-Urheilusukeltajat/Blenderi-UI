import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { getUser, type User } from '../apiRequests/userRequests';
import { type UseQuery } from './common';
import { USER_QUERY_KEY } from './queryKeys';
import { useEffect } from 'react';

export const useUserQuery = (userId: string): UseQuery<User> => {
  const { isLoading, data, isError } = useQuery({
    queryKey: USER_QUERY_KEY(userId),
    queryFn: async () => getUser(userId),
    staleTime: 1000 * 60 * 60, // One hour
    retry: 1,
  });

  useEffect(() => {
    if (isError) {
      toast.error('Käyttäjätietojen hakeminen epäonnistui. Yritä uudelleen.');
    }
  }, [isError]);

  return {
    data,
    isLoading,
    isError,
  };
};
