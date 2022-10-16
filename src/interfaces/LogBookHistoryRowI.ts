interface LogBookHistoryRowI {
  divingCylinder: string;
  compressedAir?: number;
  oxygen?: number;
  helium?: number;
  argon?: number;
  additionalInformation?: string;
  price: number;
  date: Date;
}

export default LogBookHistoryRowI;