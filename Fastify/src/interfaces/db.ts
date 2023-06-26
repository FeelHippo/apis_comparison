import { PhraseModelInterface } from 'storage/phrase/phrase.model';

export interface Models {
  PhraseModel: PhraseModelInterface;
}

export interface Db {
  models: Models;
}
