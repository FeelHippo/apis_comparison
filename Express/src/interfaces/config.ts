import { Environment } from 'interfaces/global';
export interface BaseApiConfig {
  timeout: number;
  base_url: string;
  headers: (environment: Environment) => ApiHeaders;
  data?: any;
}
export interface ApiHeaders {
  'api-key'?: string;
  ENVIRONMENT?: Environment;
  authorization?: string;
  'Content-Type'?: string;
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
  bullshit_api: BaseApiConfig;
}
