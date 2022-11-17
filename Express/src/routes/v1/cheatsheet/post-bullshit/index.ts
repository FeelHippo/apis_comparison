import { Request, Response } from 'express';
import * as HttpStatus from 'http-status-codes';
import { errorHandler } from 'utils/error-handler';
import ObjectsToCsv from 'objects-to-csv';
import { Bullshit } from 'interfaces/bullshit';

export const postBullshit = async (req: Request, res: Response): Promise<void> => {
  try {
    const { ENVIRONMENT: environment } = res.locals;
    const data = req.body as Bullshit;
    const csv = new ObjectsToCsv([{ ...data, environment }]);
    await csv.toDisk(__dirname + '/temp.txt');
    res.status(HttpStatus.StatusCodes.CREATED).send();
  } catch (error: any) {
    errorHandler(res, error, 'postBullshit');
  }
};
