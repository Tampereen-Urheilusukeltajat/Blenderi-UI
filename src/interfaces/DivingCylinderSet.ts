export type DivingCylinder = {
  id: string;
  volume: string;
  material: string;
  pressure: string;
  serialNumber: string;
  inspection: string;
};

export type DivingCylinderSet = {
  id: string;
  owner: string;
  name: string;
  cylinders: DivingCylinder[];
};
