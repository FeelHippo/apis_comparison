import { FastifyRequest, FastifyReply } from 'fastify';
export const pingController = async (_req: FastifyRequest, res: FastifyReply): Promise<void> => {
  res.code(200).send('ping')
};
