import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { getFillEvents } from '../apiRequests/fillEventRequests';
import { type FillEvent } from '../../interfaces/FillEvent';
import { type UseQuery } from './common';
import { FILL_EVENT_QUERY_KEY } from './queryKeys';
import { useEffect } from 'react';

export const useFillEventQuery = (): UseQuery<FillEvent[]> => {
  const { isLoading, data, isError } = useQuery({
    queryKey: FILL_EVENT_QUERY_KEY,
    queryFn: async () => getFillEvents(),
    retry: 1,
  });

  useEffect(() => {
    if (isError) {
      toast.error('Täyttötapahtumien hakeminen epäonnistui. Yritä uudelleen.');
    }
  }, [isError]);

  return {
    data,
    isLoading,
    isError,
  };
};
