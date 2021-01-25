import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import reducer from "./reducer";
import thunkMiddleware from "redux-thunk";

const PreloadedState: string = window.localStorage.getItem("redux") || "{}";

export const store = createStore(
  reducer,
  JSON.parse(PreloadedState),
  composeWithDevTools(applyMiddleware(thunkMiddleware))
);

store.subscribe(() => {
  window.localStorage.setItem("redux", JSON.stringify(store.getState()));
});

export type AppState = ReturnType<typeof reducer>;

export type AppDispatch = typeof store.dispatch;
