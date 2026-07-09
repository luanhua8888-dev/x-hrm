import axios, { AxiosError, AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios';

import { API_CONFIG } from '@/api/api-config';
import { API_ENDPOINTS } from '@/api/api-endpoints';
import { normalizeApiError } from '@/api/api-error';
import { useAuthStore } from '@/stores/auth.store';

interface RetryableAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

export const apiClient = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

apiClient.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as RetryableAxiosRequestConfig | undefined;
    const isUnauthorized = error.response?.status === 401;
    const refreshToken = useAuthStore.getState().refreshToken;

    if (isUnauthorized && originalRequest && !originalRequest._retry && refreshToken) {
      originalRequest._retry = true;

      try {
        const response = await axios.post<{ accessToken: string }>(
          `${API_CONFIG.BASE_URL}${API_ENDPOINTS.AUTH.REFRESH_TOKEN}`,
          { refreshToken },
          { timeout: API_CONFIG.TIMEOUT },
        );

        useAuthStore.getState().SetSession({
          ...useAuthStore.getState(),
          accessToken: response.data.accessToken,
          refreshToken,
          user: useAuthStore.getState().user,
        });

        originalRequest.headers.Authorization = `Bearer ${response.data.accessToken}`;
        return apiClient(originalRequest);
      } catch {
        useAuthStore.getState().ClearSession();
      }
    }

    const normalizedError = normalizeApiError(error);
    return Promise.reject(Object.assign(new Error(normalizedError.message), normalizedError));
  },
);
/**
 * Thin wrapper around apiClient that automatically unwraps response.data.
 * Use this in services to write single-line methods.
 *
 * api.get<T>(url, params?, config?)   → GET  with optional query params + axios config
 * api.post<T>(url, body?, config?)    → POST with optional body + axios config
 * api.put<T>(url, body?, config?)     → PUT  with optional body + axios config
 * api.patch<T>(url, body?, config?)   → PATCH with optional body + axios config
 * api.del(url, config?)               → DELETE with optional axios config
 *
 * The `config` param accepts any AxiosRequestConfig field:
 *   headers, timeout, responseType, signal, onUploadProgress, ...
 */
export const api = {
  get: <T>(url: string, params?: object, config?: AxiosRequestConfig) =>
    apiClient.get<T>(url, { params, ...config }).then((r) => r.data),

  post: <T>(url: string, body?: unknown, config?: AxiosRequestConfig) =>
    apiClient.post<T>(url, body, config).then((r) => r.data),

  put: <T>(url: string, body?: unknown, config?: AxiosRequestConfig) =>
    apiClient.put<T>(url, body, config).then((r) => r.data),

  patch: <T>(url: string, body?: unknown, config?: AxiosRequestConfig) =>
    apiClient.patch<T>(url, body, config).then((r) => r.data),

  del: (url: string, config?: AxiosRequestConfig) =>
    apiClient.delete(url, config).then((r) => r.data as void),
};
