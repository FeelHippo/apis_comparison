import { Request, Response } from 'express';
import * as HttpStatus from 'http-status-codes';
import { errorHandler } from 'utils/error-handler';
import { FunFactsApi } from 'api-clients/fun-fact/fun-facts-api';

export const getFact = async (_req: Request, res: Response): Promise<void> => {
  try {
    const { ENVIRONMENT } = res.locals;
    const fun_fact_api = new FunFactsApi(ENVIRONMENT);
    const data = await fun_fact_api.getFunFact();
    res.status(HttpStatus.StatusCodes.OK).send(data);
  } catch (error: any) {
    errorHandler(res, error, 'getFact');
  }
};
