import { Environment } from 'interfaces/global';
import { AxiosRequestHeaders } from 'axios';
export interface BaseApiConfig {
  timeout: number;
  base_url: string;
  headers: (environment: Environment) => AxiosRequestHeaders;
  data?: any;
}

export interface MongoConfig {
  uri: string;
}

export interface AuthorizationConfig {
  api_key?: string;
}

export interface Config {
  mongodb: MongoConfig;
  authorization: AuthorizationConfig;
  phrase_api: BaseApiConfig;
}
