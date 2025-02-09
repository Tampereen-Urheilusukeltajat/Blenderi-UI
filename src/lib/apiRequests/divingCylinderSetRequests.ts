import { authPostAsync, authGetAsync, authPatchAsync } from './api';
import {
  type DivingCylinder,
  type DivingCylinderSet,
} from '../../interfaces/DivingCylinderSet';

export type DivingCylinderSetTable = {
  divingCylinderSetName: string;
  divingCylinders: Array<Omit<DivingCylinder, 'id'>>;
};

export type DivingCylinderSetPostRequest = {
  owner: string;
  name: string;
  cylinders: Array<Omit<DivingCylinder, 'id'>>;
};

export type PatchDivingCylinderSetPayload = {
  name?: string;
  cylinders?: Array<Partial<DivingCylinder> & { id: string }>;
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
): Promise<string> => {
  const res = await authPatchAsync<string, undefined>(
    `/api/cylinder-set/${divingCylinderSetId}/archive`,
  );
  return res.data;
};

export const patchDivingCylinderSet = async (
  divingCylinderSetId: string,
  payload: PatchDivingCylinderSetPayload,
): Promise<DivingCylinderSet> => {
  const res = await authPatchAsync<
    DivingCylinderSet,
    PatchDivingCylinderSetPayload
  >(`/api/cylinder-set/${divingCylinderSetId}`, payload);

  return res.data;
};
