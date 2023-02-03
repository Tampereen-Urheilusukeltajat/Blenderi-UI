import { authGetAsync } from './api';

export type FillEvent = {
  id: string;
  userId: string;
  cylinderSetId: string;
  cylinderSetName: string;
  gasMixture: string;
  description: string;
  price: number;
  createdAt: string;
};

export const getFillEvents = async (): Promise<FillEvent[]> => {
  const response = await authGetAsync<FillEvent[]>(
    '/api/fill-event/'
  );

  return response.data;
};
