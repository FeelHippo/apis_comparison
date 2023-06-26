import 'package:http/http.dart' as http;
import 'package:mongo_dart/mongo_dart.dart';

Future<http.Response> fetchQuote() {
  return http
      .get(Uri.parse('https://corporatebs-generator.sameerkumar.website/'));
}

Future<void> upsert(Db database, dynamic body) async {
  final quote = body['quote'] as String;
  await database.collection('dart').updateOne(
        where.eq('quote', quote),
        modify.set('quote', quote),
        upsert: true,
      );
}

Future<int> update(Db database, dynamic body) async {
  final quote = body['quote'] as String;
  final putOperation = await database.collection('dart').updateOne(
        where.eq('quote', quote),
        modify.set('updated', true),
        upsert: true,
      );
  if (putOperation.nUpserted == 1) {
    return 204;
  }
  return 201;
}

Future<int> delete(Db database, String quote) async {
  final deleteOperation = await database.collection('dart').deleteOne(
        where.eq('quote', quote),
      );
  if (deleteOperation.isFailure) {
    return 404;
  }
  return 204;
}
