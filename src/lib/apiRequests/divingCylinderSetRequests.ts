import { authPostAsync, authGetAsync, authPatchAsync } from './api';
import {
  type DivingCylinder,
  type DivingCylinderSet,
} from '../../interfaces/DivingCylinderSet';
import { type AxiosResponse } from 'axios';

export type DivingCylinderSetTable = {
  divingCylinderSetName: string;
  divingCylinders: Array<Omit<DivingCylinder, 'id'>>;
};

export type DivingCylinderSetPostRequest = {
  owner: string;
  name: string;
  cylinders: Array<Omit<DivingCylinder, 'id'>>;
};

export const postDivingCylinderSet = async (
  payload: DivingCylinderSetPostRequest,
): Promise<DivingCylinderSet> => {
  const response = await authPostAsync<
    DivingCylinderSet,
    DivingCylinderSetPostRequest
  >('/api/cylinder-set/', payload);
  return response.data;
};

export const getDivingCylinderSets = async (
  userId: string,
): Promise<DivingCylinderSet[]> => {
  const response = await authGetAsync<DivingCylinderSet[]>(
    `/api/cylinder-set/?userId=${userId}`,
  );

  return response.data;
};

export const archiveDivingCylinderSet = async (
  divingCylinderSetId: string,
): Promise<AxiosResponse> =>
  authPatchAsync(`/api/cylinder-set/${divingCylinderSetId}/archive`);
