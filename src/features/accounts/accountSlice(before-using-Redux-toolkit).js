const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
  isLoading: false,
};

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
