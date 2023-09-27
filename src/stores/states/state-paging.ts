import { atomFamily } from "recoil";
import { ISearchType } from "../interfaces";

export const statePaging = atomFamily<number, ISearchType>({
  key: "paging",
  default: 0,
});
