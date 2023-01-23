import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { getStorageCylinders } from '../apiRequests/storageCylinderRequests';
import { UseQuery } from './common';
import { STORAGE_CYLINDERS_QUERY_KEY } from './queryKeys';

export type StorageCylinder = {
  id: string;
  gasId: string;
  name: string;
  maxPressure: number;
  volume: number;
};

export const useStorageCylinderQuery = (): UseQuery<StorageCylinder[]> => {
  const { isLoading, data, isError } = useQuery({
    queryKey: STORAGE_CYLINDERS_QUERY_KEY,
    queryFn: async () => getStorageCylinders(),
    onError: () => {
      toast.error('Varastopullojen hakeminen epäonnistui. Yritä uudelleen.');
    },
    // staleTime: 1000 * 60 * 60, // One hour
    retry: 1,
  });

  return {
    data,
    isLoading,
    isError,
  };
};
