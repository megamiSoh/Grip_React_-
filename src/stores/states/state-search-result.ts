import { atom } from "recoil";
import { ISearchResultType } from "../interfaces";

export const stateSearchResult = atom<ISearchResultType>({
  key: "searchResult",
  default: { result: [], totalCount: 0 },
});
