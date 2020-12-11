import ActionButton from "antd/lib/modal/ActionButton";
import { SET_ALL_LIBS, LOADING, FILTERED } from "./actionTypes";

const initialState = {
  allLibs: [],
  loading: false,
};

export default function reducer(state = initialState, action) {
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
