export enum AvailableGasses {
  air = 'air',
  argon = 'argon',
  diluent = 'diluent',
  helium = 'helium',
  oxygen = 'oxygen',
}

export const mapGasToName = (gas: AvailableGasses): string => {
  switch (gas) {
    case AvailableGasses.air:
      return 'Ilma';
    case AvailableGasses.argon:
      return 'Argon';
    case AvailableGasses.diluent:
      return 'Diluentti';
    case AvailableGasses.helium:
      return 'Helium';
    case AvailableGasses.oxygen:
      return 'Happi';
    default:
      throw new Error('Unknown gas met!');
  }
};

export const formatEurCentsToEur = (eurCents: number): number => eurCents / 100;

export const calculateGasConsumption = (
  cylinderVolume: number,
  startPressure: number,
  endPressure: number
): number => (startPressure - endPressure) * cylinderVolume;

export const tokenExpired = (exp: number): boolean =>
  new Date().getTime() > exp;
