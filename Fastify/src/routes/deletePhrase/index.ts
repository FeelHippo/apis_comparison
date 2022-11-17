import { FastifyRequest, FastifyInstance } from 'fastify';
import * as HttpStatus from 'http-status-codes';
import { FastifyReplyWithLocals } from 'interfaces/middleware';
import { errorHandler } from 'utils/error-handler';
import { Phrase } from 'interfaces/phrase';

export const deletePhraseToDatabaseController = async (request: FastifyRequest, reply: FastifyReplyWithLocals, server: FastifyInstance): Promise<void> => {
  try {
    const environment = reply.locals!.ENVIRONMENT;
    const phrase = request.body as Phrase;
    server.db.models.PhraseModel.deletePhrase(environment, phrase);
    reply.code(HttpStatus.StatusCodes.OK).send();
  } catch (err: any) {
    request.log.error(err);
    errorHandler(reply, err, 'deletePhraseToDatabaseController');
  }
};
