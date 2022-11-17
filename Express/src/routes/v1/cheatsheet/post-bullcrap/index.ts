import { Request, Response } from 'express';
import * as HttpStatus from 'http-status-codes';
import { errorHandler } from 'utils/error-handler';
import { Bullshit } from 'interfaces/bullshit';
import { BullshitDB } from 'storage/bullshit';

export const postBullcrap = async (req: Request, res: Response): Promise<void> => {
  try {
    const { ENVIRONMENT: environment } = res.locals;
    const data = req.body as Bullshit;
    await BullshitDB.updateBullshit(environment, data);
    res.status(HttpStatus.StatusCodes.CREATED).send();
  } catch (error: any) {
    errorHandler(res, error, 'postBullcrap');
  }
};
