import * as mongoose from 'mongoose';
import { Environment } from 'interfaces/global';
import { Phrase } from 'interfaces/phrase';
import { DBException } from 'utils/error-handler';

export interface PhraseDocument extends Phrase, mongoose.Document {}
export interface PhraseModelInterface extends mongoose.Model<Phrase> {
  updatePhrase(environment: Environment, phrase: Phrase): void;
  deletePhrase(environment: Environment, phrase: Phrase): void;
}

let PhraseModel: PhraseModelInterface;

export const createPhraseModel = async (): Promise<void> => {
  const PhraseSchema = new mongoose.Schema<
    Phrase,
    PhraseModelInterface
  >(
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
      collection: 'fastify',
    },
  );

  PhraseSchema.index({ phrase: 1, environment: 1 }, { name: 'phrase_environment_index', unique: true });
  PhraseSchema.static('updatePhrase', async function (environment: Environment, phrase: Phrase): Promise<void> {
    const dbPhrase = await this.findOneAndUpdate(
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

    if (!dbPhrase) {
      throw new DBException();
    }
  });
  PhraseSchema.static('deletePhrase', async function (environment: Environment, phrase: Phrase): Promise<void> {
    await this.deleteOne({ ...phrase, environment });
  });

  PhraseModel = mongoose.model<PhraseDocument, PhraseModelInterface>('PhraseModel', PhraseSchema);
  await PhraseModel.ensureIndexes();
};

export { PhraseModel };
