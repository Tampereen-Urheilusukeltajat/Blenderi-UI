import { authGetAsync, authPostAsync } from './api';
import {
  FillEvent,
  CreatedFillEvent,
  NewFillEvent,
} from '../../interfaces/FillEvent';

export const postFillEvent = async (
  payload: NewFillEvent
): Promise<CreatedFillEvent> => {
  const response = await authPostAsync<CreatedFillEvent, NewFillEvent>(
    '/api/fill-event/',
    payload
  );
  return response.data;
};

export const getFillEvents = async (): Promise<FillEvent[]> => {
  const response = await authGetAsync<FillEvent[]>('/api/fill-event/');

  return response.data;
};
