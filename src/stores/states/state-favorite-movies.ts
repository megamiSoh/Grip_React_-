import localforage from "localforage";
import { AtomEffect, atom } from "recoil";
import { IResponseType } from "../interfaces";

const localForageEffect: (key: string) => AtomEffect<IResponseType[]> =
  (key: string) =>
  ({ setSelf, onSet, trigger }) => {
    const loadPersisted = async () => {
      const savedValue = (await localforage.getItem(key)) as IResponseType[];

      if (savedValue !== null) {
        setSelf(savedValue);
      }
    };

    if (trigger === "get") {
      loadPersisted();
    }

    onSet((newValue, _, isReset) => {
      return isReset
        ? localforage.removeItem(key)
        : localforage.setItem(key, newValue);
    });
  };

export const stateFavoritMovies = atom<IResponseType[]>({
  key: "favoritMovies",
  default: [],
  effects: [localForageEffect("favoritMovies")],
});
