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

export type storageCylinderUsage = {
  storageCylinderId: number;
  startPressure: number;
  endPressure: number;
};

export type NewFillEvent = {
  cylinderSetId: string;
  gasMixture: string;
  filledAir: boolean;
  description: string;
  price: number;
  storageCylinderUsageArr: storageCylinderUsage[];
};

export type CreatedFillEvent = NewFillEvent & {
  id: string;
  userId: string;
};
