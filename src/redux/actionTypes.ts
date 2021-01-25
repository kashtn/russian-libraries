import { Ilib } from "../interfaces";

export const SET_ALL_LIBS = "SET_ALL_LIBS";
export type SetAllLibsAction = {
  type: typeof SET_ALL_LIBS;
  payload: Ilib[];
};
export const LOADING = "LOADING";
export type LoadingAction = {
  type: typeof LOADING;
  payload: boolean;
};
export const FILTERED = "FILTERED";
export type FilteredAction = {
  type: typeof FILTERED;
  payload: Ilib[];
};

export type ActionTypes = SetAllLibsAction | LoadingAction | FilteredAction;
