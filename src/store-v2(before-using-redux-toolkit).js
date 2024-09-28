import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import accountReducer from "./features/accounts/accountSlice";
import customerReducer from "./features/customers/customerSlice";

const rootReducer = combineReducers({
  // we are initializing accountReducer as renaming account
  account: accountReducer,
  customer: customerReducer,
});

//  applyMiddleware() provided by Redux
// we need to pass anohter argument in createStore (applyMiddleware as an second argument) for this applyMiddleware() we pass in our middleware (i,e thunk)
// basically by this we told the store that we want to use the thunk in our application.
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
