import { SerializableParam } from "recoil";

export interface ISearchType
  extends Readonly<Record<string, SerializableParam>> {
  type: SearchType;
}

export enum SearchType {
  searchMovie = "/",
  searchFavorite = "/favoriteMovies",
}

export interface IResponseType {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

export interface ISearchResultType {
  result: IResponseType[];
  totalCount: number;
}

export interface ISearchResult {
  type: SearchType;
  response: ISearchResultType;
  page: number;
  keyword: string;
}
