import * as mongoose from 'mongoose';
import { Environment } from 'interfaces/global';
import { Bullshit } from 'interfaces/bullshit';

export interface BullshitDocument extends Bullshit, mongoose.Document {}

let BullshitModel: mongoose.Model<BullshitDocument, {}, {}>;

export const createBullshitModel = async (): Promise<void> => {
  const BullshitSchema = new mongoose.Schema(
    {
      phrase: {
        type: String,
        required: true,
      },
      environment: {
        type: String,
        enum: Object.values(Environment),
        default: Environment.PRODUCTION,
      },
    },
    {
      timestamps: true,
      collection: 'express',
    },
  );

  BullshitSchema.index({ phrase: 1, environment: 1 }, { name: 'phrase_environment_index', unique: true });

  BullshitModel = mongoose.model<BullshitDocument>('express', BullshitSchema);
  await BullshitModel.ensureIndexes();
};

export { BullshitModel };
