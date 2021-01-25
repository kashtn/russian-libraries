import { SET_ALL_LIBS, LOADING, FILTERED, ActionTypes } from "./actionTypes";
import { Ilib } from "../interfaces";

export type StateType = {
  allLibs: Ilib[];
  loading: boolean;
};

const initialState: StateType = {
  allLibs: [],
  loading: false,
};

export default function reducer(
  state = initialState,
  action: ActionTypes
): StateType {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case SET_ALL_LIBS:
      return {
        ...state,
        allLibs: action.payload,
      };
    case FILTERED:
      return {
        ...state,
        allLibs: [...action.payload],
      };
    default:
      return state;
  }
}
