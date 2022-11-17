import fastify, { FastifyRequest, FastifyReply, HookHandlerDoneFunction } from 'fastify';
import { AuthorizationException, MissingHeaderException } from 'utils/error-handler';
import fp from 'fastify-plugin';
import config from 'config';
import { pingController } from 'routes/pingController';
import { Pino, PinoEnvironment } from 'interfaces/pino';
import isValidApiKeyCheck from 'middlewares/authorizer';
import environmentCheck from 'middlewares/environment-check';
import { connectDB, disconnectDB } from 'storage/db';
import phraseRoutes from 'routes/index';
import swagger from 'schemas/swagger';

const logger_by_env: Pino = {
  development: {
    transport: {
      target: 'pino-pretty',
      options: {
        translateTime: 'HH:MM:ss Z',
        ignore: 'pid,hostname',
      },
    },
  },
  production: true,
  test: false,
}

const port = Number(process.env.PORT) || 8080;
const environment = (process.env.NODE_ENV || 'development') as PinoEnvironment;
const { uri } = config.mongodb;
const server = fastify({
  logger: logger_by_env[environment] ?? true,
  exposeHeadRoutes: false,
});

const start = async () => {
  try {
    process.on('warning', e => server.log.warn(e.stack));
    server.listen({ port }, (err, address) => {
      if(err) server.log.error(`Error: ${err}`);
      server.log.info(`Server listening at ${address}`);
    });
    // Connect Mongo
    server.register(fp(connectDB), { uri });
    // Register Swagger Schema
    server.register(require('@fastify/swagger'), swagger);
    // Register PING route
    server.register((server, _options, done) => {
      server.get('/ping', pingController);
      done();
    }, { prefix: '/health-check' });
    // Register CRUD routes
    server.register((server, _options, done) => {
      // Encapsulate headers handlers
      server.addHook('onRequest', (
          request: FastifyRequest,
          _reply: FastifyReply,
          done: HookHandlerDoneFunction
        ) => isValidApiKeyCheck(request) ? done() : new AuthorizationException());
      server.decorateReply('locals', () => {});
      server.addHook('onRequest', (
          request: FastifyRequest,
          reply: FastifyReply,
          done: HookHandlerDoneFunction
        ) => environmentCheck(request, reply) ? done() : new MissingHeaderException());
      server.register(fp(phraseRoutes));
      done();
    }, { prefix: '/v1' });
  } catch (err) {
    server.log.error(err);
    disconnectDB();
    process.exit(1);
  }
};
start();
