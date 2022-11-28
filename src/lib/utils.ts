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
  // Date now gives timestamp in ms, token has seconds
  Math.floor(Date.now() / 1000) > exp;

type TokenPayload<Payload> = {
  token: string;
  payload: Payload;
};

export const getTokenFromLocalStorage = <Payload>(
  tokenName: string
): TokenPayload<Payload> | undefined => {
  const token = localStorage.getItem(tokenName) ?? '';
  const splittedToken = token.split('.');

  // Valid tokens always have three parts
  if (splittedToken.length !== 3) return undefined;

  const payload: Payload = JSON.parse(window.atob(splittedToken[1]));

  return {
    token,
    payload,
  };
};
