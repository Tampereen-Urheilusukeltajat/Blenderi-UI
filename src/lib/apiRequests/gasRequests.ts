import { GasWithPricing } from '../queries/gasQuery';
import { authGetAsync } from './api';

export const getGases = async (): Promise<GasWithPricing[]> => {
  const response = await authGetAsync<GasWithPricing[]>('/api/gas');

  return response.data;
};
