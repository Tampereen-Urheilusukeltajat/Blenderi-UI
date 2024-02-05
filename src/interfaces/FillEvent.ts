export type FillEvent = {
  id: string;
  userId: string;
  cylinderSetId: string;
  cylinderSetName: string;
  gasMixture: string;
  description: string;
  price: number;
  compressorId?: string;
  compressorName?: string;
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
  compressorId?: string;
};

export type CreatedFillEvent = NewFillEvent & {
  id: string;
  userId: string;
};

export type UnpaidFillEventsResponse = {
  fillEvents: FillEvent[];
  totalPriceInEurCents: number;
};
