import { Request, Response } from 'express';
import * as HttpStatus from 'http-status-codes';
import { errorHandler } from 'utils/error-handler';
import { FunFactDB } from 'storage/fun-fact';

export const deleteFact = async (req: Request, res: Response): Promise<void> => {
  try {
    const { ENVIRONMENT: environment } = res.locals;
    const { id } = req.params;
    await FunFactDB.deleteFunFact(environment, id);
    res.status(HttpStatus.StatusCodes.OK).send();
  } catch (error: any) {
    errorHandler(res, error, 'deleteBullcrap');
  }
};
