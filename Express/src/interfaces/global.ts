export enum Environment {
  PRODUCTION = 'PRODUCTION',
  DEVELOPMENT = 'DEVELOPMENT',
}

export interface BaseResponse {
  success?: boolean;
  error_code: string | null;
  message_localized?: string | null;
  data_type?: string;
  data?: any;
}
