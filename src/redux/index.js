import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger/src";
import logging from "./logging";
import contacts from "./contacts";

const rootReducer = combineReducers({
  logging,
  contacts,
});
const index = createStore(rootReducer, applyMiddleware(thunk, logger));

export default index;
