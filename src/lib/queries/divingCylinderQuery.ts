import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { getDivingCylinderSets } from '../apiRequests/divingCylinderSetRequests';
import { DivingCylinderSet } from '../../interfaces/DivingCylinderSet';
import { UseQuery } from './common';
import { DIVING_CYLINDER_SETS_QUERY_KEY } from './queryKeys';
import { useEffect } from 'react';

export const useDivingCylinderQuery = (
  userId: string
): UseQuery<DivingCylinderSet[]> => {
  const { isLoading, data, isError } = useQuery({
    queryKey: DIVING_CYLINDER_SETS_QUERY_KEY(userId),
    queryFn: async () => getDivingCylinderSets(userId),
    retry: 1,
    staleTime: 1000 * 60 * 60, // One hour
  });

  useEffect(() => {
    if (isError) {
      toast.error('Pullojen hakeminen epäonnistui. Yritä uudelleen.');
    }
  }, [isError]);

  return {
    data,
    isLoading,
    isError,
  };
};
