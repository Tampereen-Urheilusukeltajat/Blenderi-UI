import { type StorageCylinder } from '../queries/storageCylinderQuery';
import { authGetAsync } from './api';

export const getStorageCylinders = async (): Promise<StorageCylinder[]> => {
  const response = await authGetAsync<StorageCylinder[]>(
    '/api/storage-cylinder',
  );

  return response.data;
};
