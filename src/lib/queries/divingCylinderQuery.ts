import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { getDivingCylinderSets } from '../apiRequests/divingCylinderSetRequests';
import { DivingCylinderSet } from '../../interfaces/DivingCylinderSet';
import { UseQuery } from './common';
import { CYLINDER_SETS_QUERY_KEY } from './queryKeys';

export const useDivingCylinderQuery = (
  userId: string
): UseQuery<DivingCylinderSet[]> => {
  const { isLoading, data, isError } = useQuery({
    queryKey: CYLINDER_SETS_QUERY_KEY(userId),
    queryFn: async () => getDivingCylinderSets(userId),
    onError: () => {
      toast.error('Pullojen hakeminen epäonnistui. Yritä uudelleen.');
    },
    retry: 1,
    staleTime: 1000 * 60 * 60, // One hour
  });

  return {
    data,
    isLoading,
    isError,
  };
};
