import { Request, Response } from 'express';
import * as HttpStatus from 'http-status-codes';
import { errorHandler } from 'utils/error-handler';
import { FunFactsApi } from 'api-clients/bullshit-generator/fun-facts-api';

export const getBullshit = async (_req: Request, res: Response): Promise<void> => {
  try {
    const { ENVIRONMENT } = res.locals;
    const bullshit_api = new FunFactsApi(ENVIRONMENT);
    const data = await bullshit_api.getBullshit();
    res.status(HttpStatus.StatusCodes.OK).send(data);
  } catch (error: any) {
    errorHandler(res, error, 'getBullshit');
  }
};
