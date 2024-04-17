import { postAsync } from './api';

export type ResetRequestPayload = {
  email: string;
};

export type ResetRequestResponse = {
  message: string;
};

export const passwordResetRequest = async (
  payload: ResetRequestPayload,
): Promise<ResetRequestResponse> =>
  (
    await postAsync<ResetRequestResponse, ResetRequestPayload>(
      '/api/reset-password/reset-request/',
      payload,
    )
  ).data;
