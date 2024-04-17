import { postAsync } from './api';

export type ResetPayload = {
  token: string;
  userId: string;
  password: string;
};

export type ResetResponse = {
  message: string;
};

export const resetPassword = async (
  payload: ResetPayload,
): Promise<ResetResponse> =>
  (
    await postAsync<ResetResponse, ResetPayload>(
      '/api/reset-password/set-password/',
      payload,
    )
  ).data;
