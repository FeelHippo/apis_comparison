import 'package:dart_frog/dart_frog.dart';

import '../env/env.dart';

Handler middleware(Handler handler) {
  return (context) async {
    // Execute code before request is handled.
    // validate api-key
    const apiKey = Env.apiKey;
    final apiKeyHeader = context.request.headers['api-key'];
    if (apiKey.isEmpty || apiKey != apiKeyHeader) {
      return Response(statusCode: 401);
    }

    // Forward the request to the respective handler.
    final response = await handler(context);

    // Execute code after request is handled.

    // Return a response.
    return response;
  };
}
