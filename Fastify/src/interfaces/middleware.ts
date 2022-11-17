import { FastifyReply } from 'fastify';
import { Environment } from 'interfaces/global';

export interface FastifyReplyWithLocals extends FastifyReply {
  locals?: {
    ENVIRONMENT: Environment;
  };
}
