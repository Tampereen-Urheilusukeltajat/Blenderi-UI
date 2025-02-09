import { useMutation } from '@tanstack/react-query';

import { type UseMutation } from './common';
import { toast } from 'react-toastify';
import { DIVING_CYLINDER_SETS_QUERY_KEY } from './queryKeys';
import { archiveDivingCylinderSet } from '../apiRequests/divingCylinderSetRequests';

export const useArchieveDivingCylinderSetMutation = (
  userId: string,
  onSuccess: () => void,
): UseMutation<string, string> => {
  const { mutate, isPending, isError, data } = useMutation({
    mutationKey: DIVING_CYLINDER_SETS_QUERY_KEY(userId),
    mutationFn: async (divingCylinderSetId: string) =>
      archiveDivingCylinderSet(divingCylinderSetId),
    onSuccess: () => {
      onSuccess?.();

      toast.success('Pullosetti poistettu näkyvistä.');
    },
    onError: () => {
      toast.error('Pullosetin poistaminen epäonnistui. Yritä uudelleen.');
    },
  });

  return {
    isPending,
    isError,
    data,
    mutate,
  };
};
