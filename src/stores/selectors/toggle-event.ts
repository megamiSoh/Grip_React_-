import { DefaultValue, selector } from "recoil";
import { stateToggleEvent } from "../states/state-toggle-event";
import { xor } from "lodash-es";

export const toggleEvent = selector<string[]>({
  key: "toggleSelector",
  get: ({ get }) => {
    return get(stateToggleEvent);
  },
  set: ({ set }, newValue) => {
    return set(stateToggleEvent, (prev) => {
      if (newValue instanceof DefaultValue) {
        return prev;
      }
      return xor(prev, newValue);
    });
  },
});
