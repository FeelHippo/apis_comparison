export interface FunFact {
  iconUrl: string;
  factId: string;
  url: string;
  value: string;
}

export interface PatchFunFactOperation {
  op: keyof FunFact;
  value: string;
}

export interface PatchFunFactRequest {
  operations: PatchFunFactOperation[];
}
