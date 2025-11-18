import config from 'config';
import { get } from 'lodash';
import { log, log_levels, log_labels } from 'utils/logger';
import { BaseApiClient } from 'api-clients/base-api-client';
import { Environment } from 'interfaces/global';
import { InvalidFormatException } from 'utils/error-handler';
import { fun_facts_schema } from 'validators/fun-facts';
import { FunFact } from '../../interfaces/fun-fact';
import { ValidationResult } from 'joi';

export class FunFactsApi {
  public funFactsBaseApiClient: BaseApiClient;

  constructor(environment: Environment) {
    const api_config = get(config, 'fun_facts_api');
    this.funFactsBaseApiClient = new BaseApiClient(api_config, environment);
  }

  async getFunFacts(): Promise<FunFact> {
    const response = await this.funFactsBaseApiClient.getRequest('/', null, [200]);
    const { value, error }: ValidationResult<FunFact> = fun_facts_schema.validate(response);
    if (error) {
      log(log_levels.error, log_labels.api_request.format_error, { error });
      throw new InvalidFormatException();
    }
    return value;
  }
}
