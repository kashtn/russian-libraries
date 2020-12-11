import { SET_ALL_LIBS, LOADING, FILTERED } from "./actionTypes";

export function loading(bool) {
  return {
    type: LOADING,
    payload: bool,
  };
}

export function getAllLibs() {
  return async function (dispatch) {
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

export function setAllLibs(libs) {
  return {
    type: SET_ALL_LIBS,
    payload: libs,
  };
}

export function filterLibs(libs, filter) {
  let filtered;
  if (filter === "toHighest") {
    filtered = libs.sort((a, b) => {
      return a.libraries - b.libraries;
    });
  } else if (filter === "toLowest") {
    filtered = libs.sort((a, b) => {
      return b.libraries - a.libraries;
    });
  }
  return {
    type: FILTERED,
    payload: filtered,
  };
}
