import { FastifyRequest } from 'fastify';
import * as HttpStatus from 'http-status-codes';
import { FastifyReplyWithLocals } from 'interfaces/middleware';
import { PhraseApi } from 'api-clients/phrase-generator/phrase-api';
import { errorHandler } from 'utils/error-handler';

export const getPhraseController = async (request: FastifyRequest, reply: FastifyReplyWithLocals): Promise<void> => {
  try {
    const environment = reply.locals!.ENVIRONMENT;
    const phrase_api = new PhraseApi(environment, request);
    const phrase = await phrase_api.getPhrase();
    reply.code(HttpStatus.StatusCodes.OK).send(phrase);
  } catch (err: any) {
    request.log.error(err);
    errorHandler(reply, err, 'getPhraseController');
  }
};
