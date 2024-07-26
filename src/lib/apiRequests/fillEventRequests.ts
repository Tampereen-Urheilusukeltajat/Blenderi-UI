import { authGetAsync, authPostAsync } from './api';
import {
  type FillEvent,
  type CreatedFillEvent,
  type NewFillEvent,
  type UnpaidFillEventsResponse,
} from '../../interfaces/FillEvent';

export const postFillEvent = async (
  payload: NewFillEvent,
): Promise<CreatedFillEvent> => {
  const response = await authPostAsync<CreatedFillEvent, NewFillEvent>(
    '/api/fill-event/',
    payload,
  );
  return response.data;
};

export const getFillEvents = async (): Promise<FillEvent[]> => {
  const response = await authGetAsync<FillEvent[]>('/api/fill-event/');

  return response.data;
};

export const getUnpaidFillEvents =
  async (): Promise<UnpaidFillEventsResponse> => {
    const response = await authGetAsync<UnpaidFillEventsResponse>(
      '/api/fill-event/unpaid',
    );

    return response.data;
  };
