import { Express } from 'express';
import * as moduleAlias from 'module-alias';
moduleAlias.addAliases({
  'api-clients': __dirname + '/api-clients',
  config: __dirname + '/config',
  middlewares: __dirname + '/middlewares',
  modules: __dirname + '/modules',
  routes: __dirname + '/routes',
  storage: __dirname + '/storage',
  utils: __dirname + '/utils',
  validators: __dirname + '/validators',
  interfaces: __dirname + '/interfaces',
});
import createServer from './app';
import { connectDB, disconnectDB } from 'storage/db';

const port = process.env.PORT || 3002;

createServer()
  .then(async (app: Express) => {
    await connectDB();
    const server = app.listen(port);
    server.keepAliveTimeout = 70000;
    console.log(`[API] Api is running on port ${port}`);
    console.log(`[API] Swagger UI available with path: /api-docs`);
  })
  .catch((err: any) => {
    console.error(err.stack);
    process.exit(1);
  });

// docker stop command - by ECS
process.on('SIGTERM', async () => {
  await disconnectDB();
});
