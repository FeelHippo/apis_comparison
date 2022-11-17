import config from 'config';
import { get } from 'lodash';
import { log, log_levels, log_labels } from 'utils/logger';
import { BaseApiClient } from 'api-clients/base-api-client';
import { Environment } from 'interfaces/global';
import { InvalidFormatException } from 'utils/error-handler';
import { bullshit_schema } from 'validators/bullshit';

export class BullshitApi {
  public bullshitBaseApiClient: BaseApiClient;

  constructor(environment: Environment) {
    const bullshit_api_config = get(config, 'bullshit_api');
    this.bullshitBaseApiClient = new BaseApiClient(bullshit_api_config, environment);
  }

  async getBullshit(): Promise<any> {
    const response = await this.bullshitBaseApiClient.getRequest('/', null, [200]);
    const { value, error } = bullshit_schema.validate(response);
    if (error) {
      log(log_levels.error, log_labels.api_request.format_error, { error });
      throw new InvalidFormatException();
    }
    return value;
  }
}
