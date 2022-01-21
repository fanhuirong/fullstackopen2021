import { createStore, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import {reducer} from "./reducers/anecdoteReducer"
// step 6.9
const anecdoteReducer = combineReducers({
  anecdotes: reducer,
});

const store = createStore(anecdoteReducer, composeWithDevTools());

export default store;