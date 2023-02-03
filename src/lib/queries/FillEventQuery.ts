import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import {
  FillEvent,
  getFillEvents,
} from '../apiRequests/fillEventRequests';
import { UseQuery } from './common';
import { FILL_EVENT_QUERY_KEY } from './queryKeys';

export const useFillEventQuery = (): UseQuery<FillEvent[]> => {
  const { isLoading, data, isError } = useQuery({
    queryKey: FILL_EVENT_QUERY_KEY,
    queryFn: async () => getFillEvents(),
    onError: () => {
      toast.error('Täyttötapahtumien hakeminen epäonnistui. Yritä uudelleen.');
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
