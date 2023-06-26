import { log, log_levels, log_labels } from 'utils/logger';
import { ApiClientException } from 'utils/error-handler';
import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { ParsedQs } from 'qs';
import { BaseApiConfig } from 'interfaces/config';
import { Environment } from 'interfaces/global';

export class BaseApiClient {
  public instance: AxiosInstance;
  public timeout: number;
  public environment: string;

  constructor(config: BaseApiConfig, environment: Environment) {
    const { timeout, base_url: baseURL, headers } = config;
    this.environment = environment;
    this.timeout = timeout;

    this.instance = axios.create({
      baseURL,
      timeout,
      headers: headers(environment),
    });
  }

  async getRequest(endpoint: string, params: ParsedQs | null = {}, status_codes: Array<number>): Promise<any> {
    const { environment, timeout, instance } = this;
    log(log_levels.info, log_labels.api_request.get, { endpoint, environment, params });
    const config = {
      timeout,
      params,
      validateStatus: (status: number) =>
        status_codes.includes(status)
          ? true
          : (log(log_levels.warning, log_labels.api_request.unexpected_status_code, {
              endpoint,
              expected: status_codes,
              received: status,
              environment,
            }),
            false),
    };
    try {
      const response: AxiosResponse = await instance.get(endpoint, config);
      const { data } = response;
      log(log_levels.info, log_labels.api_request.get_success, {
        endpoint,
        response: data,
        environment,
      });
      return data;
    } catch (error: any) {
      log(log_levels.error, log_labels.api_request.get_failure, {
        endpoint,
        error: error.message,
        environment,
      });
      throw new ApiClientException(error.response.data.errorCode);
    }
  }

  async postRequest(endpoint: string, payload: any, status_codes: Array<number>): Promise<any> {
    const { environment, timeout, instance } = this;
    log(log_levels.info, log_labels.api_request.post, {
      endpoint,
      environment,
      payload,
    });
    const config = {
      timeout,
      validateStatus: (status: number) =>
        status_codes.includes(status)
          ? true
          : (log(log_levels.warning, log_labels.api_request.unexpected_status_code, {
              endpoint,
              expected: status_codes,
              received: status,
              environment,
            }),
            false),
    };

    try {
      const response: AxiosResponse = await instance.post(endpoint, payload, config);
      const { data } = response;
      log(log_levels.info, log_labels.api_request.post_success, {
        endpoint,
        response: data,
        environment,
      });
      return data;
    } catch (error: any) {
      log(log_levels.error, log_labels.api_request.post_failure, {
        endpoint,
        error: error.message,
        environment,
      });
      throw new ApiClientException(error.response.data.errorCode);
    }
  }

  async patchRequest(endpoint: string, payload: any, status_codes: Array<number>): Promise<any> {
    log(log_levels.info, log_labels.api_request.patch, {
      endpoint,
      environment: this.environment,
      payload,
    });
    const config = {
      timeout: this.timeout,
      validateStatus: (status: number) => {
        const validate = status_codes.includes(status);
        if (!validate)
          log(log_levels.warning, log_labels.api_request.unexpected_status_code, {
            endpoint,
            expected: status_codes,
            received: status,
            environment: this.environment,
          });
        return validate;
      },
    };

    try {
      const response: AxiosResponse = await this.instance.patch(endpoint, payload, config);
      log(log_levels.info, log_labels.api_request.patch_success, {
        endpoint,
        response: response.data,
        environment: this.environment,
      });

      return response.data;
    } catch (error: any) {
      log(log_levels.error, log_labels.api_request.patch_failure, {
        endpoint,
        error: error.message,
        environment: this.environment,
      });
      throw new ApiClientException(error.response.data.errorCode);
    }
  }

  async deleteRequest(endpoint: string, params: ParsedQs | null = {}, status_codes: Array<number>): Promise<any> {
    const config = {
      timeout: this.timeout,
      url: endpoint,
      params,
      validateStatus: (status: number) => {
        const validate = status_codes.includes(status);
        if (!validate)
          log(log_levels.info, log_labels.api_request.unexpected_status_code, {
            endpoint,
            expected: status_codes,
            received: status,
            environment: this.environment,
          });
        return validate;
      },
    };

    try {
      const response: AxiosResponse = await this.instance.delete(endpoint, config);
      log(log_levels.info, log_labels.api_request.delete_success, {
        endpoint,
        response: response.data,
        environment: this.environment,
      });

      return response.data;
    } catch (error: any) {
      log(log_levels.error, log_labels.api_request.delete_failure, {
        endpoint,
        error: error.message,
        environment: this.environment,
      });
      throw new ApiClientException(error.response.data.errorCode);
    }
  }
}
