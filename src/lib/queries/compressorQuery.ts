import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { UseQuery } from './common';
import { COMPRESSOR_QUERY_KEY } from './queryKeys';
import { getCompressors } from '../apiRequests/compressor';
import { useEffect } from 'react';

export type Compressor = {
  id: string;
  name: string;
  description: string;
  isEnabled: boolean;
  airOnly: boolean;
};

export const useCompressorQuery = (): UseQuery<Compressor[]> => {
  const { isLoading, data, isError } = useQuery({
    queryKey: COMPRESSOR_QUERY_KEY,
    queryFn: async () => getCompressors(),
    staleTime: 1000 * 60 * 60, // One hour
    retry: 1,
  });

  useEffect(() => {
    if (isError) {
      toast.error('Kompressoreiden hakeminen epäonnistui. Yritä uudelleen.');
    }
  }, [isError]);

  return {
    data,
    isLoading,
    isError,
  };
};
