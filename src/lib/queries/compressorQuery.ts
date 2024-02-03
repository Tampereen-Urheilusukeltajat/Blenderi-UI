import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { UseQuery } from './common';
import { COMPRESSOR_QUERY_KEY } from './queryKeys';
import { getCompressors } from '../apiRequests/compressor';

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
    onError: () => {
      toast.error('Kompressoreiden hakeminen epäonnistui. Yritä uudelleen.');
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
