import { authPostAsync, authGetAsync } from './api';

export type DivingCylinder = {
  id: string;
  volume: string;
  material: string;
  pressure: string;
  serialNumber: string;
  inspection: string;
};

export type DivingCylinderSetTable = {
  divingCylinderSetName: string;
  divingCylinders: Array<Omit<DivingCylinder, 'id'>>;
};

export type DivingCylinderSetPostRequest = {
  owner: string;
  name: string;
  cylinders: Array<Omit<DivingCylinder, 'id'>>;
};

export type DivingCylinderSet = {
  id: string;
  owner: string;
  name: string;
  cylinders: DivingCylinder[];
};

export const postDivingCylinderSet = async (
  payload: DivingCylinderSetPostRequest
): Promise<DivingCylinderSet> => {
  const response = await authPostAsync<
    DivingCylinderSet,
    DivingCylinderSetPostRequest
  >('/api/cylinder-set/', payload);
  return response.data;
};

export const getDivingCylinderSets = async (
  userId: string
): Promise<DivingCylinderSet[]> => {
  const response = await authGetAsync<DivingCylinderSet[]>(
    `/api/cylinder-set/?userId=${userId}`
  );

  return response.data;
};
