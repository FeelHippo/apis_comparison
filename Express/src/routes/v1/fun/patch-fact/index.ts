import { Request, Response } from 'express';
import * as HttpStatus from 'http-status-codes';
import { errorHandler } from 'utils/error-handler';
import { PatchFunFactRequest } from 'interfaces/fun-fact';
import { FunFactDB } from 'storage/fun-fact';

export const patchFact = async (req: Request, res: Response): Promise<void> => {
  try {
    const { ENVIRONMENT: environment } = res.locals;
    const { id } = req.params;
    const data = req.body as PatchFunFactRequest;
    const document = await FunFactDB.updateFunFact(environment, id, data);
    res.status(HttpStatus.StatusCodes.NO_CONTENT).send(document);
  } catch (error: any) {
    errorHandler(res, error, 'patchFact');
  }
};
