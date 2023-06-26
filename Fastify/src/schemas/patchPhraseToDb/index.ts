export default {
  description: 'patch a phrase to database',
  tags: ['phrase'],
  summary: 'updates a phrase to database',
  body: {
    type: 'object',
    properties: {
      phrase: { type: 'string' },
    }
  },
  response: {
    204: {},
    400: {
      description: 'Authentication failed',
      type: 'object',
      properties: {
        success: { type: 'boolean' },
        error_code: { type: 'string' },
        message: { type: 'string' },
      },
    },
    401: {
      description: 'Authentication failed',
      type: 'object',
      properties: {
        success: { type: 'boolean' },
        error_code: { type: 'string' },
        message: { type: 'string' },
      },
    },
    default: {
      description: 'Server error',
      type: 'object',
      properties: {
        success: { type: 'boolean' },
        error_code: { type: 'string' },
        message: { type: 'string' },
      },
    }
  },
}
