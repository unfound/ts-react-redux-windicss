import { StrictMode } from "react";
import { render } from "react-dom";
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk, { ThunkMiddleware } from 'redux-thunk'
import { createLogger } from 'redux-logger'
import * as reducer from './counter-redux/reducer'
import { postsBySubreddit } from './utils/redux-fetch'
import App from "./App";
import "virtual:windi.css";

const store = createStore(
  combineReducers({...reducer, postsBySubreddit}),
  applyMiddleware(thunk as ThunkMiddleware<Record<string, unknown>>, createLogger())
)

render(
  <StrictMode>
    <Provider store={ store }>
      <App />
    </Provider>
  </StrictMode>,
  document.getElementById("root")
);
