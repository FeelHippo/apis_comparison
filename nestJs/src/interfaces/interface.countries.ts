interface NodeInterface {
  name: string;
  phone_code: string;
  capital: string;
  currency: string;
  native: string;
  emoji: string;
}

interface EdgeInterface {
  cursor: string;
  node: NodeInterface;
}

interface PageInfoInterface {
  hasNextPage: boolean;
  endCursor: string;
  hasPreviousPage: boolean;
  startCursor: string;
}

interface CountriesInterface {
  totalCount: number;
  edges: EdgeInterface[];
  pageInfo: PageInfoInterface;
}

export interface Countries {
  countries: CountriesInterface;
}
