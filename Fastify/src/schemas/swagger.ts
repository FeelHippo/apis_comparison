export default {
  routePrefix: '/documentation',
  swagger: {
    info: {
      title: 'Fastify swagger',
      description: 'Testing the Fastify swagger API',
      version: '0.1.0'
    },
    externalDocs: {
      url: 'https://swagger.io',
      description: 'Find more info here'
    },
    host: 'localhost',
    schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json'],
    tags: [
      { name: 'phrase', description: 'Phrase related end-points' },
    ],
    definitions: {
      Phrase: {
        type: 'object',
        required: ['phrase'],
        properties: {
          phrase: { type: 'string' },
          environment: { type: 'string' },
        }
      }
    },
    securityDefinitions: {
      apiKey: {
        type: 'apiKey',
        name: 'api-key',
        in: 'header',
      },
    },
  },
  uiConfig: {
    docExpansion: 'full',
    deepLinking: false,
  },
  staticCSP: true,
  exposeRoute: true,
}
