import { authGetAsync } from './api';
import FillEvent from '../../interfaces/FillEvent';

export const getFillEvents = async (): Promise<FillEvent[]> => {
  const response = await authGetAsync<FillEvent[]>(
    '/api/fill-event/'
  );

  return response.data;
};
