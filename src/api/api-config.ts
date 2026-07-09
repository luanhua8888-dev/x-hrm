import { env } from '@/config/env';

export const API_CONFIG = {
  BASE_URL: env.VITE_API_URL,
  TIMEOUT: 30_000,
} as const;
