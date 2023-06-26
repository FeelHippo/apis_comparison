import { FastifyPluginAsync, FastifyInstance, FastifyPluginOptions  } from 'fastify';
import * as mongoose from 'mongoose';
import { Models } from 'interfaces/db';
import { createPhraseModel, PhraseModel } from './phrase/phrase.model';

export interface PluginOptions {
  uri: string;
}
let db_connection: typeof mongoose | undefined;

export const connectDB: FastifyPluginAsync<PluginOptions> = async (
  fastify: FastifyInstance,
  options: FastifyPluginOptions
): Promise<void> => {
  try {
    db_connection = await mongoose.connect(options.uri);
    await createPhraseModel();
    const models: Models = { PhraseModel };
    fastify.decorate('db', { models });
  } catch (error) {
    fastify.log.error({ actor: 'MongoDB' }, 'error', error);
    throw error;
  }
};

export async function disconnectDB(): Promise<void> {
  if (db_connection) {
    db_connection.disconnect();
    db_connection = undefined;
  }
}
