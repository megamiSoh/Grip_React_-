import { atomFamily } from "recoil";
import { ISearchType } from "../interfaces";

export const stateSearchKeyword = atomFamily<string, ISearchType>({
  key: "searchKeyword",
  default: "",
});
