import { Config, ApiHeaders } from 'interfaces/config';
import { log, log_levels } from 'utils/logger';

export const getEnvironmentVariable = (key: string, alt: string = ''): string => {
  if (!process.env[key]) {
    log(log_levels.warning, `Missing environment variable '${key}'`);
    return alt;
  }
  return process.env[key] as string;
};

const config: Config = {
  mongodb: {
    uri: getEnvironmentVariable('MONGODB_URI'),
  },
  authorization: {
    api_key: getEnvironmentVariable('API_KEY'),
  },
  bullshit_api: {
    timeout: 4000,
    base_url: 'https://corporatebs-generator.sameerkumar.website/',
    headers: (): ApiHeaders => {
      return {
        'Content-Type': 'application/json',
      };
    },
  },
};

export default config;
