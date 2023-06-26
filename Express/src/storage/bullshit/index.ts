import { BullshitDocument, BullshitModel } from 'storage/bullshit/bullshit.model';
import { log, log_labels, log_levels } from 'utils/logger';
import { Bullshit } from 'interfaces/bullshit';
import { Environment } from 'interfaces/global';
import { DBException } from 'utils/error-handler';

export class BullshitDB {
  static async updateBullshit(environment: Environment, phrase: Bullshit): Promise<BullshitDocument | null> {
    log(log_levels.info, log_labels.db.update_bullshit, {
      name: 'updateBullshit',
      environment,
      phrase,
    });

    const dbBullshit = await BullshitModel.findOneAndUpdate(
      {
        ...phrase,
      },
      {
        $set: { ...phrase, environment },
      },
      {
        new: true,
        upsert: true,
        runValidators: true,
        useFindAndModify: false,
      },
    );

    if (!dbBullshit) {
      throw new DBException();
    }

    return dbBullshit;
  }
  static async deleteBullshit(environment: Environment, phrase: Bullshit): Promise<void> {
    log(log_levels.info, log_labels.db.delete_bullshit, {
      name: 'deleteBullshit',
      environment,
      phrase,
    });

    await BullshitModel.deleteOne({ ...phrase, environment });
  }
}
