import { AxiosError } from 'axios';

export interface ApiError {
  status?: number;
  code?: string;
  message: string;
  fieldErrors?: Record<string, string[]>;
}

interface ApiErrorResponseBody {
  code?: string;
  message?: string;
  errors?: Record<string, string[]>;
  fieldErrors?: Record<string, string[]>;
}

export function normalizeApiError(error: unknown): ApiError {
  if (error instanceof AxiosError) {
    const data = error.response?.data as ApiErrorResponseBody | undefined;
    const isNetworkError = !error.response;

    return {
      status: error.response?.status,
      code: data?.code,
      message:
        data?.message ??
        (isNetworkError
          ? 'Backend API is unavailable. Please try again when the server is running.'
          : error.message) ??
        'The request failed. Please try again.',
      fieldErrors: data?.fieldErrors ?? data?.errors,
    };
  }

  if (error instanceof Error) {
    return {
      message: error.message,
    };
  }

  return {
    message: 'An unexpected error occurred.',
  };
}

export function getUserFacingErrorMessage(error: unknown): string {
  return normalizeApiError(error).message;
}
