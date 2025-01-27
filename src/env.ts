import Constants from 'expo-constants';
import { z } from 'zod';
import { Env } from '../types/env';

const envSchema = z.object({
  apiUrl: z.string().url(),
});

const AmbientVariables: Env = {
    apiUrl: Constants.expoConfig?.extra?.apiUrl
};

const result = envSchema.safeParse(AmbientVariables);

if (!result.success) {
  console.error('Invalid environment variables:', result.error.format());
  throw new Error('Invalid environment variables');
}

export default AmbientVariables;
