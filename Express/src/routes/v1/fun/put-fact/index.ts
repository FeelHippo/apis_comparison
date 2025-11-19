import { Request, Response } from 'express';
import { errorHandler } from 'utils/error-handler';
import { FunFact } from 'interfaces/fun-fact';
import { FunFactDB } from 'storage/fun-fact';

export const putFact = async (req: Request, res: Response): Promise<void> => {
  try {
    const { ENVIRONMENT: environment } = res.locals;
    const { id } = req.params;
    const data = req.body as FunFact;
    const { document, statusCode } = await FunFactDB.upsertFunFact(environment, id, data);
    res.status(statusCode).send(document);
  } catch (error: any) {
    errorHandler(res, error, 'putFact');
  }
};
