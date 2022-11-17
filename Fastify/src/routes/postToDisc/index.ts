import { FastifyRequest } from 'fastify';
import * as HttpStatus from 'http-status-codes';
import { FastifyReplyWithLocals } from 'interfaces/middleware';
import ObjectsToCsv from 'objects-to-csv';
import { errorHandler } from 'utils/error-handler';
import { Phrase } from 'interfaces/phrase';

export const postPhraseToDiscController = async (request: FastifyRequest, reply: FastifyReplyWithLocals): Promise<void> => {
  try {
    const environment = reply.locals!.ENVIRONMENT;
    const data = request.body as Phrase;
    const csv = new ObjectsToCsv([{ ...data, environment }]);
    await csv.toDisk(__dirname + '/temp.csv');
    reply.code(HttpStatus.StatusCodes.CREATED).send();
  } catch (err: any) {
    request.log.error(err);
    errorHandler(reply, err, 'postPhraseToDiscController');
  }
};
