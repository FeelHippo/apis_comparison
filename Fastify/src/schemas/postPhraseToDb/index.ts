export default {
  description: 'post a phrase to database',
  tags: ['phrase'],
  summary: 'saves a phrase to database',
  body: {
    type: 'object',
    properties: {
      phrase: { type: 'string' },
    }
  },
  response: {
    201: {},
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
