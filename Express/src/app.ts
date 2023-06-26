import express, { Express } from 'express';
import compression from 'compression';
import * as swaggerUi from 'swagger-ui-express';
import helmet from 'helmet';
import * as YAML from 'yamljs';
import * as OpenApiValidator from 'express-openapi-validator';
import router from 'routes/api-router';
import healthCheck from 'modules/health-check/health-check-router';
import { multiFileSwagger } from 'utils/swagger-multifile-spec';

const createServer = async (): Promise<Express> => {
  const app = express();
  const root = YAML.load('src/schemas/private.yaml');
  const swaggerDocument = await multiFileSwagger(root);
  app.use(helmet());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(compression());
  app.use(
    OpenApiValidator.middleware({
      apiSpec: 'src/schemas/public.yaml',
      validateRequests: true,
      validateResponses: true,
    }),
    OpenApiValidator.middleware({
      apiSpec: 'src/schemas/private.yaml',
      validateRequests: true,
      validateResponses: true,
    }),
  );

  app.use((err: any, _req: any, res: any, _next: any) => {
    res.status(err.status || 500).json({
      message: err.message,
      errors: err.errors,
      success: false,
      error_code: err.status,
    });
  });

  // define api routes
  app.use('/api', router);
  app.use('/health-check', healthCheck);
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  return app;
};

export default createServer;
