import { ISearchResult } from "./../interfaces";
import { selectorFamily, waitForAll } from "recoil";
import { ISearchType } from "../interfaces";
import { statePaging, stateSearchKeyword, stateSearchResult } from "../states";

export const searchDomainResult = selectorFamily<ISearchResult, ISearchType>({
  key: "searchResultData",
  get:
    (type) =>
    ({ get }) => {
      const { response, page, keyword } = get(
        waitForAll({
          response: stateSearchResult,
          page: statePaging(type),
          keyword: stateSearchKeyword(type),
        })
      );
      const searchResult: ISearchResult = {
        type: type.type,
        response,
        page,
        keyword,
      };

      return searchResult;
    },
  set:
    (type) =>
    ({ set, get }, newValue: any) => {
      const { response, page } = get(
        waitForAll({
          response: stateSearchResult,
          page: statePaging(type),
          keyword: stateSearchKeyword(type),
        })
      );
      const mergedData =
        page === 1 ? newValue.Search : [...response.result, ...newValue.Search];

      return set(stateSearchResult, (prev) => {
        return {
          result: mergedData,
          totalCount: newValue.totalResults,
        };
      });
    },
});
