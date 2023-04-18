import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { getGases } from '../apiRequests/gasRequests';
import { AvailableGasses } from '../utils';
import { UseQuery } from './common';
import { GAS_QUERY } from './queryKeys';

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
    onError: () => {
      toast.error('Kaasujen hakeminen epäonnistui. Yritä uudelleen.');
    },
    retry: 1,
  });

  return {
    data,
    isLoading,
    isError,
  };
};
