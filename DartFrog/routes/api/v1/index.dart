import 'dart:async';
import 'dart:convert';
import 'dart:io';
import 'package:dart_frog/dart_frog.dart';
import 'package:mongo_dart/mongo_dart.dart';

import '../../../http/index.dart';

Future<Response> onRequest(RequestContext context) async {
  final database = Db('mongodb://localhost:27017/test');
  await database.open();

  // access inbound request
  final request = context.request;

  // read HTTP method from request
  final method = request.method.value;

  try {
    // depending on HTTP method, perform a different operation
    switch (method) {
      case 'GET':
        {
          final quote = await fetchQuote();
          return Response(statusCode: 200, body: quote.body);
        }
      case 'POST':
        {
          final saveTo = request.uri.queryParameters['saveTo'];
          if (saveTo == 'disk') {
            await File('temp.txt').writeAsString(await request.body());
          } else if (saveTo == 'db') {
            final body = json.decode(await request.body());
            await upsert(database, body);
          } else {
            return Response(statusCode: 404);
          }
          return Response(statusCode: 201);
        }
      case 'PUT':
        {
          final body = json.decode(await request.body());
          final responseCode = await update(database, body);
          return Response(statusCode: responseCode);
        }
      case 'DELETE':
        {
          final quote = request.uri.queryParameters['quote'];
          if (quote == null) {
            return Response(statusCode: 404);
          }
          final responseCode = await delete(database, quote);
          return Response(statusCode: responseCode);
        }
    }
  } catch (e) {
    return Response(statusCode: 500);
  }
  throw Error();
}
