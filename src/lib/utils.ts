import { type AccessToken } from './auth';

type UserRoles = {
  isAdmin: boolean;
  isBlender: boolean;
};

export enum AvailableGasses {
  air = 'Air',
  argon = 'Argon',
  diluent = 'Diluent',
  helium = 'Helium',
  oxygen = 'Oxygen',
}

export enum AvailableMixtures {
  Nitrox = 'Nitrox',
  Trimix = 'Trimix',
  Heliox = 'Heliox',
  Argon = 'Argon',
}

export const AvailableMixtureCompositions = [
  {
    id: AvailableMixtures.Nitrox,
    components: [AvailableGasses.oxygen],
  },
  {
    id: AvailableMixtures.Trimix,
    components: [AvailableGasses.oxygen, AvailableGasses.helium],
  },
  {
    id: AvailableMixtures.Heliox,
    components: [AvailableGasses.oxygen, AvailableGasses.helium],
  },
  {
    id: AvailableMixtures.Argon,
    components: [AvailableGasses.argon],
  },
];

export const formalizeGasMixture = (
  gasMixture: AvailableMixtures,
  oxygenPercentage: string,
  heliumPercentage: string
): string => {
  switch (gasMixture) {
    case AvailableMixtures.Argon:
      return 'Argon';
    case AvailableMixtures.Heliox:
      return `Heliox ${heliumPercentage}/${oxygenPercentage}`;
    case AvailableMixtures.Nitrox:
      return `EAN${oxygenPercentage}`;
    case AvailableMixtures.Trimix:
      return `Trimix ${oxygenPercentage}/${heliumPercentage}`;
  }
};

export const mapGasToName = (gas?: AvailableGasses): string => {
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
export const formatEurToEurCents = (eur: number): number => eur * 100;

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

/**
 * @returns UserId
 * @throws If accessToken is not found (shouldn't happen)
 */
export const getUserIdFromAccessToken = (): string => {
  const token = getTokenFromLocalStorage<AccessToken>('accessToken');
  if (!token) throw new Error('accessToken not found');

  return token.payload.id;
};

/**
 * Gets changed values from two similar objects
 * @returns changed values
 */
export const getChangedFieldValues = (
  initialValues: Record<string, unknown>,
  changedFields: Record<string, unknown>
): Record<string, unknown> => {
  const changedKeys = Object.keys(initialValues).filter((key) => {
    return initialValues[key] !== changedFields[key];
  });

  return changedKeys.reduce(
    (previousValue, currentValue) => ({
      ...previousValue,
      [currentValue]: changedFields[currentValue],
    }),
    {}
  );
};

/**
 * @returns User roles
 * @throws If accessToken is not found (shouldn't happen)
 */
export const getUserRoles = (): UserRoles => {
  const token = getTokenFromLocalStorage<AccessToken>('accessToken');
  if (!token) throw new Error('accessToken not found');

  const { isAdmin, isBlender } = token.payload;

  return {
    isAdmin,
    isBlender,
  };
};
