import { 
  FastifyInstance, 
  FastifyPluginOptions, 
  FastifyPluginAsync,
} from 'fastify';
import { getPhraseController } from './getPhrase';
import { postPhraseToDiscController } from './postToDisc';
import { postPhraseToDatabaseController } from './postToDb';
import { patchPhraseToDatabaseController } from './patchPhrase';
import { deletePhraseToDatabaseController } from './deletePhrase';
import { Db } from 'interfaces/db';
import { Phrase } from 'interfaces/phrase';
import getPhraseSchema from 'schemas/getPhrase';
import postPhraseToDisc from 'schemas/postPhraseToDisc';
import postPhraseToDatabase from 'schemas/postPhraseToDb';
import patchPhraseToDatabase from 'schemas/patchPhraseToDb';
import deletePhraseToDatabase from 'schemas/deletePhraseToDb';

declare module 'fastify' {
  export interface FastifyInstance {
    db: Db,
  }
}

const phraseRoutes: FastifyPluginAsync = async (server: FastifyInstance, _options: FastifyPluginOptions): Promise<void> => {
  server.get<{
    Reply: Phrase,
  }>(
    '/getPhrase',
    { schema: getPhraseSchema },
    getPhraseController,
  );
  server.post<{
    Body: Phrase,
  }>(
    '/postPhraseToDisc',
    { schema: postPhraseToDisc },
    postPhraseToDiscController,
  );
  server.post<{
    Body: Phrase,
  }>(
    '/postPhraseToDatabase',
    { schema: postPhraseToDatabase },
    async (request, reply) =>
      postPhraseToDatabaseController(request, reply, server),
  );
  server.patch<{
    Body: Phrase,
  }>(
    '/patchPhraseToDatabase',
    { schema: patchPhraseToDatabase },
    async (request, reply) =>
      patchPhraseToDatabaseController(request, reply, server),
  );
  server.delete<{
    Body: Phrase,
  }>(
    '/deletePhraseToDatabase',
    { schema: deletePhraseToDatabase },
    async (request, reply) =>
      deletePhraseToDatabaseController(request, reply, server),
  );
};

export default phraseRoutes;
