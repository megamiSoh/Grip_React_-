import { atom } from "recoil";

export const stateToggleEvent = atom<string[]>({
  key: "toggleState",
  default: [],
});
