import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { getFillEvents, postFillEvent } from '../apiRequests/fillEventRequests';
import {
  FillEvent,
  CreatedFillEvent,
  NewFillEvent,
} from '../../interfaces/FillEvent';
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
  });

  return {
    data,
    isLoading,
    isError,
  };
};

export const useNewFillEventQuery = (
  payload: NewFillEvent
): UseQuery<CreatedFillEvent> => {
  const { isLoading, data, isError } = useQuery({
    queryFn: async () => postFillEvent(payload),
    onError: () => {
      toast.error(
        'Täyttötapahtuman tallentaminen epäonnistui. Yritä uudelleen.'
      );
    },
    retry: 1,
  });

  return {
    data,
    isLoading,
    isError,
  };
};
