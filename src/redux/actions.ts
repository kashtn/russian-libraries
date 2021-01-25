import { Ilib } from "../interfaces";
import {
  SET_ALL_LIBS,
  LOADING,
  FILTERED,
  LoadingAction,
  SetAllLibsAction,
  FilteredAction,
} from "./actionTypes";
import { AppDispatch } from "./store";

import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";

export function loading(bool: boolean): LoadingAction {
  return {
    type: LOADING,
    payload: bool,
  };
}

export function getAllLibs() {
  return async function (dispatch: AppDispatch) {
    dispatch(loading(true));
    const url = "https://cors-anywhere.herokuapp.com/";
    const response = await fetch(
      url +
        "https://data.gov.ru/opendata/7705851331-statlibrary/data-20161110T1744.json"
    );
    const result = await response.json();

    console.log(result);
    dispatch(setAllLibs(result));
    dispatch(loading(false));
  };
}

export function setAllLibs(libs: Ilib[]): SetAllLibsAction {
  return {
    type: SET_ALL_LIBS,
    payload: libs,
  };
}

export function filterLibs(libs: Ilib[], filter: string): FilteredAction {
  let filtered;
  if (filter === "toHighest") {
    filtered = libs.sort((first: Ilib, second: Ilib) => {
      if (
        typeof first.libraries === "number" &&
        typeof second.libraries === "number"
      ) {
        return first.libraries - second.libraries;
      }
      return 0;
    });
  } else if (filter === "toLowest") {
    filtered = libs.sort((first: Ilib, second: Ilib) => {
      if (
        typeof first.libraries === "number" &&
        typeof second.libraries === "number"
      ) {
        return second.libraries - first.libraries;
      }
      return 0;
    });
  }
  return {
    type: FILTERED,
    payload: libs,
  };
}
