// with this createSlice function gives us three big benifits:
//1)  it will automatically create action creaters from our reducers.
//2) it makes writing this reducers lot easier coz we no longer need switch statement and also the default case is automatically handled.
//3) we can mutate now our state inside our reducer.
// (behind the sceans it will then use a liberary "immer" which will convert our logic back to immutable logic )
//but now we can mutate the logic in the reducer.

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
  isLoading: false,
};

const accountSlice = createSlice({
  // name of the slice
  // these are the inbuilt properties(name,initialState...etc)
  name: "account",
  // initialState: initialState, since in our case we have the same name just use initialState
  initialState,
  // this time we will have multiple reducers , one reducer for each of the actions.
  // now we can write without the thunk(without the asyncronous data)
  reducers: {
    deposit(state, action) {
      // state.balance = state.balance + action.payload;
      state.balance += action.payload;
      state.isLoading = false;
    },
    withdraw(state, action) {
      state.balance -= action.payload;
    },

    // requestLoan(state, action) {
    //   if (state.loan > 0) return;
    //   state.loan = action.payload.amount;
    //   state.loanPurpose = action.payload.purpose;
    //   state.balance += action.payload.amount;
    // },
    // basiclly in redux toolkit it can't take two arguments , like( loan amount and loan purpose), it can only take one argument.[this is the one of the drawback of the redux tool kit].
    // so we need to sepereate it using * : * and prepare that method

    // if we want two argument then this is the way to go.
    requestLoan: {
      // this can have a parameter that earler we have for the action creator.
      prepare(amount, purpose) {
        // here we need to return a new object which will then become a payload object in the reducer below. so thats why it is called as prepare
        return {
          payload: { amount, purpose }, // this will then the payload in the reducer
        };
      },

      reducer(state, action) {
        if (state.loan > 0) return;
        state.loan = action.payload.amount;
        state.loanPurpose = action.payload.purpose;
        state.balance += action.payload.amount;
      },
    },

    payLoan(state) {
      state.balance -= state.loan;
      state.loan = 0;
      state.loanPurpose = "";
    },
    convertingCurrency(state) {
      state.isLoading = true;
    },
  },
});

// customerSlice.actions will creates an actions which we will then destructure

export const { withdraw, requestLoan, payLoan } = accountSlice.actions;

// It actually work automatically, coz *thunks* are automatically provided in redux tool kit. so we don't have to install anything and this will simply already work. No setup required . the only thing we need to do is : we should not export action creator that we automatically get.

export function deposit(amount, currency) {
  if (currency === "INR") return { type: "account/deposit", payload: amount };
  // type: "account/deposit" [i,e name of the slice /name of the reducer]

  return async function (dispatch, getState) {
    dispatch({ type: "account/convertingCurrency" });
    // 1) API call
    const res = await fetch(
      `https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=INR`
    );
    const data = await res.json();
    const converted = data.rates.INR;
    console.log(converted);

    // after this function successfully retrive data we dispatch
    // 2) return action
    dispatch({ type: "account/deposit", payload: converted });
  };
}

export default accountSlice.reducer;

//-------------- THIS OLDER APPROCH IS THE BEST APPROCH COZ IT IS LOT MORE CLEAR THEN THE REDEX TOOL KIT.------------

// CODE BEFORE USE REDUX TOOLKIT ( WRITTEN WITH "CLASICAL REDUX")
/*
export default function accountReducer(state = initialStateAccount, action) {
  switch (action.type) {
    case "account/deposit":
      return {
        ...state,
        balance: state.balance + action.payload,
        isLoading: false,
      };
    case "account/withdraw":
      return { ...state, balance: state.balance - action.payload };

    case "account/requestLona":
      if (state.loan > 0) return state;
      return {
        ...state,
        loan: action.payload.amount,
        loanPurpose: action.payload.purpose,
        balance: state.balance + action.payload.amount,
      };

    case "account/payLoan":
      return {
        ...state,
        loan: 0,
        loanPurpose: "",
        balance: state.balance - state.loan,
      };

    case "account/convertingCurrency":
      return { ...state, isLoading: true };
    default:
      return state;
  }
}

// this function is only going to return an action.
export function deposit(amount, currency) {
  // if the currency is us dollors then notheing to change
  if (currency === "USD") return { type: "account/deposit", payload: amount };
  // if the currency is different(if the user is trying to deposit in currency other then us dollores) then we need to make a api call and convert the amount to us dollors. So for that we need the *thunk*.

  // using this middleware: the only thing that changes is , here in this action creater we will not return action immidetly  , but insterd return function .

  //in order to later dispatch this function that here that then Redux will call internally, will get acess to the dispatch function and to the current state. by calling the getState function.

  // here *getState* is the current state of the store and *dispatch* is form where it is getting dispatched(i,e in this case the function is dispatching in the AccountOperation.js )
  return async function (dispatch, getState) {
    dispatch({ type: "account/convertingCurrency" });
    // 1) API call
    const res = await fetch(
      `https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`
    );
    const data = await res.json();
    const converted = data.rates.USD;

    // after this function successfully retrive data we dispatch
    // 2) return action
    dispatch({ type: "account/deposit", payload: converted });
  };
}

export function withdraw(amount) {
  return { type: "account/withdraw", payload: amount };
}

export function requestLoan(amount, purpose) {
  return {
    type: "account/requestLona",
    payload: { amount, purpose },
  };
}

export function payLoad() {
  return { type: "account/payLoan" };
}

*/
