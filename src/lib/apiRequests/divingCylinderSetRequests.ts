import { postAsync } from '../../lib/apiRequests/api';

export type DivingCylinder = {
  volume: string;
  material: string;
  pressure: string;
  serialNumber: string;
  inspection: string;
};

export type DivingCylinderSet = {
  divingCylinderSetName: string;
  divingCylinders: DivingCylinder[];
};

export type CylinderSetRequest = {
  owner: string;
  name: string;
  cylinders: DivingCylinder[];
};

export type CylinderSetResponse = {
  id: string;
  owner: string;
  name: string;
  cylinders: Array<
    DivingCylinder & {
      id: string;
    }
  >;
};

export const postCylinderSet = async (
  payload: CylinderSetRequest
): Promise<CylinderSetResponse> => {
  const response = await postAsync<CylinderSetResponse, CylinderSetRequest>(
    '/api/cylinder-set/',
    payload
  );
  return response.data;
};
