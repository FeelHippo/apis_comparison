import { Config } from 'interfaces/config';
import { AxiosRequestHeaders } from 'axios';

export const getEnvironmentVariable = (key: string, alt: string = ''): string => {
  if (!process.env[key]) {
    console.log(`Missing environment variable '${key}'`);
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
  phrase_api: {
    timeout: 4000,
    base_url: 'https://corporatebs-generator.sameerkumar.website/',
    headers: (): AxiosRequestHeaders => {
      return {
        'Content-Type': 'application/json',
      };
    },
  },
};

export default config;
