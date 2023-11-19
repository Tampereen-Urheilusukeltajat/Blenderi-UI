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

export type StorageCylinderUsage = {
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
  storageCylinderUsageArr: StorageCylinderUsage[];
};

export type CreatedFillEvent = NewFillEvent & {
  id: string;
  userId: string;
};
