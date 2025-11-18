import { Environment } from 'interfaces/global';
import { HeadersDefaults } from 'axios';
export interface BaseApiConfig {
  timeout: number;
  base_url: string;
  headers: (environment: Environment) => ApiHeaders;
  data?: any;
}
export interface ApiHeaders extends Partial<HeadersDefaults> {
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
  fun_facts_api: BaseApiConfig;
}
