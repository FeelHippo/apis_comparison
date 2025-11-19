import * as mongoose from 'mongoose';
import { Environment } from 'interfaces/global';
import { FunFact } from 'interfaces/fun-fact';

export interface FunFactDocument extends FunFact, mongoose.Document, mongoose.SchemaTimestampsConfig {}

export let funFactModel: mongoose.Model<FunFactDocument, {}, {}>;

export const createFunFactModel = async (): Promise<void> => {
  const FunFactSchema = new mongoose.Schema(
    {
      iconUrl: {
        type: String,
        required: false,
      },
      factId: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
      value: {
        type: String,
        required: true,
      },
      environment: {
        type: String,
        enum: Object.values(Environment),
        default: Environment.PRODUCTION,
      },
      createdAt: { type: Date },
    },
    {
      collection: 'express',
    },
  );

  FunFactSchema.index({ factId: 1, environment: 1 }, { name: 'fact_id_environment_index', unique: true });

  funFactModel = mongoose.model<FunFactDocument>('express', FunFactSchema);
  await funFactModel.ensureIndexes();
};
