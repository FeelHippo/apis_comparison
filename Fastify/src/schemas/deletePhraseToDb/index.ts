export default {
  description: 'delete a phrase from database',
  tags: ['phrase'],
  summary: 'delete a phrase from database',
  body: {
    type: 'object',
    properties: {
      phrase: { type: 'string' },
    }
  },
  response: {
    200: {},
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
