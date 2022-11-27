import { LoginResponse } from '../components/SignInForm';
import { postAsync } from './apiRequests/api';
import { getTokenFromLocalStorage, tokenExpired } from './utils';

export type AccessToken = {
  exp: number;
  iat: number;
  id: string;
};

export type RefreshToken = AccessToken & {
  isRefreshToken: boolean;
  jti: string;
};

/**
 * Gets new authentication tokens from the backend and updates them to local
 * storage. Also returns them directly
 * @param refreshToken
 * @returns fresh tokens
 */
export const rotateTokens = async (
  refreshToken: string
): Promise<LoginResponse> => {
  const res = await postAsync<LoginResponse, { refreshToken: string }>(
    '/api/refresh',
    {
      refreshToken,
    }
  );

  localStorage.setItem('accessToken', res.data.accessToken);
  localStorage.setItem('refreshToken', res.data.refreshToken);

  return {
    accessToken: res.data.accessToken,
    refreshToken: res.data.refreshToken,
  };
};

/**
 * Gets valid token (if possible) from local storage or backend
 * @returns Valid access token
 * @throws If tokens do not exist or if they are expired
 */
export const getValidToken = async (): Promise<string> => {
  const accessToken = getTokenFromLocalStorage<AccessToken>('accessToken');

  if (!accessToken || tokenExpired(accessToken.payload.exp)) {
    const refreshToken = getTokenFromLocalStorage<RefreshToken>('refreshToken');

    if (!refreshToken || tokenExpired(refreshToken.payload.exp)) {
      throw new Error('Unauthorized');
    }

    const newTokens = await rotateTokens(refreshToken.token);
    return newTokens.accessToken;
  }

  return accessToken.token;
};

/**
 * Helper function which is used in protected routes to see if browser has
 * valid access tokens stored
 * @returns boolean
 * @throws If it has invalid refreshToken
 */
export const isAuthenticated = async (): Promise<boolean> => {
  const accessToken = getTokenFromLocalStorage<AccessToken>('accessToken');
  const refreshToken = getTokenFromLocalStorage<RefreshToken>('refreshToken');

  if (!accessToken || tokenExpired(accessToken.payload.exp)) {
    if (!refreshToken || tokenExpired(refreshToken.payload.exp)) {
      return false;
    }

    // Rotate tokens
    await rotateTokens(refreshToken.token);
  }

  return true;
};
