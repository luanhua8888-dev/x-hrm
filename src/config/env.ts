type RequiredEnvKey = 'VITE_API_URL';

function readEnvValue(key: RequiredEnvKey): string {
  const metaEnv = import.meta.env as unknown as Record<RequiredEnvKey, string | undefined>;
  const value = metaEnv[key];

  if (value && typeof value === 'string') {
    return value;
  }

  if (import.meta.env.DEV && key === 'VITE_API_URL') {
    return 'http://localhost:5000/api';
  }

  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }

  return value;
}

export const env = {
  VITE_API_URL: readEnvValue('VITE_API_URL'),
} as const;
