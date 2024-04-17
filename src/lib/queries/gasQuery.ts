import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { getGases } from '../apiRequests/gasRequests';
import { type AvailableGasses } from '../utils';
import { type UseQuery } from './common';
import { GAS_QUERY } from './queryKeys';
import { useEffect } from 'react';

export type GasWithPricing = {
  activeFrom: string;
  activeTo?: string;
  gasId: string;
  gasName: AvailableGasses;
  gasPriceId: number;
  priceEurCents: number;
};

export const useGasesQuery = (): UseQuery<GasWithPricing[]> => {
  const { isLoading, data, isError } = useQuery({
    queryKey: GAS_QUERY,
    queryFn: async () => getGases(),

    retry: 1,
    staleTime: 1000 * 60 * 60, // One hour
  });

  useEffect(() => {
    if (isError) {
      toast.error('Kaasujen hakeminen epäonnistui. Yritä uudelleen.');
    }
  }, [isError]);

  return {
    data,
    isLoading,
    isError,
  };
};
