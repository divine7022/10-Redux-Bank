// this is the @reduxjs/toolkit package that we installed
// this configurStore function basically wraps around createStore and adds a few functionality to it.
// basically consfigureStore dose lot of things automatically for us.(it automatically combines reducers and it will automatically add the tunk midelware and it will even automatically setup the Developertools (i,e
// composeWithDevTools(applyMiddleware(thunk)) this part.
// at the end store is created and returned
import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "./features/accounts/accountSlice";
import customerReducer from "./features/customers/customerSlice";

// call configureStore and pass it our two reducers.
// and the part where we connect the React application with the Redux will works in exact same way as before(*classic* Redux) nothing changes with the React Redux package that we use on the react side.
const store = configureStore({
  reducer: {
    account: accountReducer,
    customer: customerReducer,
  },
});

export default store;

//THIS IS PERFECT AND LOT MORE EASIER USING THE REDUX TOOL KIT
