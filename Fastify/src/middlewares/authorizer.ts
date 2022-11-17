import { FastifyRequest } from 'fastify';
import config from 'config';

export default (request: FastifyRequest): boolean => {
  const api_key = request.headers['api-key'] as string;
  if(!api_key || api_key !== config.authorization.api_key) return false;
  return true;
};
