import { FastifyRequest } from 'fastify';
import { Environment } from 'interfaces/global';
import { FastifyReplyWithLocals } from 'interfaces/middleware';

export default (req: FastifyRequest, res: FastifyReplyWithLocals): boolean => {
  const environment = req.headers['environment'] as Environment;
  res.locals!.ENVIRONMENT = environment;
  return !!environment;
};
