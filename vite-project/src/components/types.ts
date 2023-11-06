export interface ApiRezSearch {
  results: ApiSearchResult;
  info: ApiPages;
}
export interface ApiSearchResult {
  id: number;
  name: string;
  status: string;
  species: string;
  gender: string;
  image: string;
}

export interface ApiPages {
  count: number;
  next: string | null;
  pages: number;
  prev: string | null;
}
