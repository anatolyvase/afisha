export interface ISearchEvent {
  id: number;
  title: string;
  description: string;
  slug: string;
}

export type SearchResponse = {
  count: number;
  results: ISearchEvent[];
};
