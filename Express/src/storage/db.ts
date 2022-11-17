import config from 'config';
import { log, log_levels, log_labels } from 'utils/logger';
import * as mongoose from 'mongoose';
import { createBullshitModel } from './bullshit/bullshit.model';

let db_connection: typeof mongoose | undefined;

export const connectDB = async (): Promise<void> => {
  try {
    const mongodb_uri = config.mongodb.uri;
    db_connection = await mongoose.connect(mongodb_uri);
    log(log_levels.info, log_labels.db.connect_success, {});

    console.log('Creating indexes...');
    await createBullshitModel();
    console.log('Indexes creation completed!');
  } catch (error) {
    log(log_levels.error, log_labels.db.connect_error, { error });
    throw error;
  }
};

export async function disconnectDB(): Promise<void> {
  if (db_connection) {
    db_connection.disconnect();
    db_connection = undefined;
  }
}
