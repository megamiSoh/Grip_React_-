import localforage from "localforage";
import { AtomEffect, atom } from "recoil";
import { IResponseType } from "../interfaces";

const localForageEffect: <T>(key: string) => AtomEffect<T> =
  (key: string) =>
  ({ setSelf, onSet, trigger }) => {
    const loadPersisted = async () => {
      const savedValue = (await localforage.getItem(key)) as string;

      if (savedValue !== null) {
        setSelf(JSON.parse(savedValue));
      }
    };

    if (trigger === "get") {
      loadPersisted();
    }

    onSet((newValue, _, isReset) => {
      return isReset
        ? localforage.removeItem(key)
        : localforage.setItem(key, JSON.stringify(newValue));
    });
  };

export const stateFavoritMovies = atom<IResponseType[]>({
  key: "favoritMovies",
  default: [],
  effects: [localForageEffect("favoritMovies")],
});
