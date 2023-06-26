import config from 'config';
import { FastifyRequest } from 'fastify';
import { BaseApiClient } from 'api-clients/base-api-client';
import { Environment } from 'interfaces/global';
// import { InvalidFormatException } from 'utils/error-handler';

export class PhraseApi {
  public phraseBaseApiClient: BaseApiClient;
  public serverInstance: FastifyRequest;

  constructor(environment: Environment, request: FastifyRequest) {
    const phrase_api_config = config.phrase_api;
    this.phraseBaseApiClient = new BaseApiClient(
      phrase_api_config,
      environment,
      request
    );
    this.serverInstance = request;
  }

  async getPhrase(): Promise<any> {
    const response = await this.phraseBaseApiClient.getRequest('/', null, [200]);
    return response;
  }
}
