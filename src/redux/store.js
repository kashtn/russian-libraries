import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import reducer from "./reducer";
import thunkMiddleware from "redux-thunk";

const PreloadedState = window.localStorage.getItem("redux") || "{}";

const store = createStore(
  reducer,
  JSON.parse(PreloadedState),
  composeWithDevTools(applyMiddleware(thunkMiddleware))
);

store.subscribe(() => {
  window.localStorage.setItem("redux", JSON.stringify(store.getState()));
});

export default store;
