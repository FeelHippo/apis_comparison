import { ApiClientException } from 'utils/error-handler';
import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { FastifyRequest } from 'fastify';
import { ParsedQs } from 'qs';
import { BaseApiConfig } from 'interfaces/config';
import { Environment } from 'interfaces/global';

export class BaseApiClient {
  public instance: AxiosInstance;
  public timeout: number;
  public environment: string;
  public serverInstance: FastifyRequest;

  constructor(config: BaseApiConfig, environment: Environment, request: FastifyRequest) {
    const { timeout, base_url: baseURL, headers } = config;
    this.environment = environment;
    this.timeout = timeout;

    this.instance = axios.create({
      baseURL,
      timeout,
      headers: headers(environment),
    });

    this.serverInstance = request;
  }

  async getRequest(endpoint: string, params: ParsedQs | null = {}, status_codes: Array<number>): Promise<any> {
    const { environment, timeout, instance } = this;
    this.serverInstance.log.info({ endpoint, environment, params });
    const config = {
      timeout,
      params,
      validateStatus: (status: number) =>
        status_codes.includes(status)
          ? true
          : (this.serverInstance.log.warn({
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
      this.serverInstance.log.info({
        endpoint,
        response: data,
        environment,
      });
      return data;
    } catch (error: any) {
      this.serverInstance.log.error({
        endpoint,
        error: error.message,
        environment,
      });
      throw new ApiClientException(error.response.data.errorCode);
    }
  }

  async postRequest(endpoint: string, payload: any, status_codes: Array<number>): Promise<any> {
    const { environment, timeout, instance } = this;
    this.serverInstance.log.info({
      endpoint,
      environment,
      payload,
    });
    const config = {
      timeout,
      validateStatus: (status: number) =>
        status_codes.includes(status)
          ? true
          : (this.serverInstance.log.warn({
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
      this.serverInstance.log.info({
        endpoint,
        response: data,
        environment,
      });
      return data;
    } catch (error: any) {
      this.serverInstance.log.error({
        endpoint,
        error: error.message,
        environment,
      });
      throw new ApiClientException(error.response.data.errorCode);
    }
  }

  async patchRequest(endpoint: string, payload: any, status_codes: Array<number>): Promise<any> {
    this.serverInstance.log.info({
      endpoint,
      environment: this.environment,
      payload,
    });
    const config = {
      timeout: this.timeout,
      validateStatus: (status: number) => {
        const validate = status_codes.includes(status);
        if (!validate)
          this.serverInstance.log.warn({
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
      this.serverInstance.log.info({
        endpoint,
        response: response.data,
        environment: this.environment,
      });

      return response.data;
    } catch (error: any) {
      this.serverInstance.log.error({
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
          this.serverInstance.log.info({
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
      this.serverInstance.log.info({
        endpoint,
        response: response.data,
        environment: this.environment,
      });

      return response.data;
    } catch (error: any) {
      this.serverInstance.log.error({
        endpoint,
        error: error.message,
        environment: this.environment,
      });
      throw new ApiClientException(error.response.data.errorCode);
    }
  }
}
