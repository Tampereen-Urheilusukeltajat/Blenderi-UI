import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { getStorageCylinders } from '../apiRequests/storageCylinderRequests';
import { UseQuery } from './common';
import { STORAGE_CYLINDERS_QUERY_KEY } from './queryKeys';
import { useEffect } from 'react';

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
    staleTime: 1000 * 60 * 60, // One hour
    retry: 1,
  });

  useEffect(() => {
    if (isError) {
      toast.error('Varastopullojen hakeminen epäonnistui. Yritä uudelleen.');
    }
  }, [isError]);

  return {
    data,
    isLoading,
    isError,
  };
};
