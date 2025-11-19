import { Request, Response } from 'express';
import * as HttpStatus from 'http-status-codes';
import { errorHandler } from 'utils/error-handler';
import ObjectsToCsv from 'objects-to-csv';
import { FunFact } from 'interfaces/fun-fact';

export const postFact = async (req: Request, res: Response): Promise<void> => {
  try {
    const { ENVIRONMENT: environment } = res.locals;
    const data = req.body as Partial<FunFact>;
    const csv = new ObjectsToCsv([{ ...data, environment }]);
    await csv.toDisk(__dirname + '/temp.txt');
    res.status(HttpStatus.StatusCodes.NO_CONTENT).send();
  } catch (error: any) {
    errorHandler(res, error, 'postFact');
  }
};
