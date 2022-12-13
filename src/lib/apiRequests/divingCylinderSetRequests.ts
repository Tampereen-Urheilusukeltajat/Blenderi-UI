import { postAsync } from '../../lib/apiRequests/api';
import { DivingCylinder } from '../../components/DivingCylinderSet/NewDivingCylinderSet';

type CylinderSetRequest = {
  owner: string;
  name: string;
  cylinders: DivingCylinder[];
};

type CylinderSetResponse = {
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
