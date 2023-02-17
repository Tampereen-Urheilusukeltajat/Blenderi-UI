export type DivingCylinder = {
  id: string;
  volume: number;
  material: string;
  pressure: number;
  serialNumber: string;
  inspection: string;
};

export type DivingCylinderSet = {
  id: string;
  owner: string;
  name: string;
  cylinders: DivingCylinder[];
};
