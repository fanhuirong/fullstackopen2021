import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from "redux-devtools-extension";
import anecdoteReducer from "./reducers/anecdoteReducer"
import notificationReducer from './reducers/notificationReducer'
// step 6.9
const reducer = combineReducers({
  anecdotes: anecdoteReducer,
  notification: notificationReducer
});

const store = createStore(reducer, composeWithDevTools( applyMiddleware(thunk) ));

export default store;