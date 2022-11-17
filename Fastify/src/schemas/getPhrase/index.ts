export default {
  description: 'get a phrase',
  tags: ['phrase'],
  summary: 'fetches a random phrase from https://corporatebs-generator.sameerkumar.website/',
  response: {
    200: {
      description: 'Successful response',
      type: 'object',
      properties: {
        phrase: { type: 'string' }
      }
    },
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
