import { Compressor } from '../queries/compressorQuery';
import { authGetAsync } from './api';

export const getCompressors = async (): Promise<Compressor[]> => {
  const response = await authGetAsync<Compressor[]>('/api/compressor');

  return response.data;
};
