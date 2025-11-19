import { FunFactDocument, funFactModel } from 'storage/fun-fact/fun-fact.model';
import { log, log_labels, log_levels } from 'utils/logger';
import { FunFact, PatchFunFactRequest } from 'interfaces/fun-fact';
import { Environment } from 'interfaces/global';
import { DBException } from 'utils/error-handler';
import * as HttpStatus from 'http-status-codes';

export class FunFactDB {
  static async upsertFunFact(environment: Environment, id: string, { iconUrl, factId, url, value }: FunFact) {
    log(log_levels.info, log_labels.db.update_fun_fact, {
      name: 'updateFunFact',
      factId,
    });
    // https://www.codemzy.com/blog/mongodb-findoneandupdate-with-upsert

    let timestamp = new Date().toISOString();
    const document = await funFactModel.findOneAndUpdate(
      {
        factId: id,
      },
      {
        $set: { iconUrl, factId, url, value, environment },
        $setOnInsert: { createdAt: timestamp },
      },
      {
        upsert: true,
        returnDocument: 'after',
      },
    );

    if (!document) {
      throw new DBException();
    }

    return {
      document,
      statusCode: document.createdAt == timestamp ? HttpStatus.StatusCodes.CREATED : HttpStatus.StatusCodes.NO_CONTENT,
    };
  }
  static async updateFunFact(
    environment: Environment,
    id: string,
    data: PatchFunFactRequest,
  ): Promise<FunFactDocument | null> {
    for (const operation of data.operations) {
      log(log_levels.info, log_labels.db.update_fun_fact, {
        name: 'updateFunFact',
        environment,
        operation,
      });

      await funFactModel.findOneAndUpdate(
        {
          factId: id,
        },
        {
          $set: { [operation.op]: operation.value },
        },
        {
          useFindAndModify: true,
        },
      );

    }

    const dbFunFact = await funFactModel.findOne({
      factId: id,
    });

    if (!dbFunFact) {
      throw new DBException();
    }

    return dbFunFact;
  }
  static async deleteFunFact(environment: Environment, id: string): Promise<void> {
    log(log_levels.info, log_labels.db.delete_fun_fact, {
      name: 'deleteFunFact',
      environment,
      id,
    });

    await funFactModel.deleteOne({ factId: id, environment });
  }
}
