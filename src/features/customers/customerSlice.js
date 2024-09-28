import { createSlice } from "@reduxjs/toolkit";

const initialStateCustomer = {
  fullName: "",
  nationalID: "",
  createdAt: "",
};

const customerSlice = createSlice({
  name: "customer",
  initialState: initialStateCustomer,
  reducers: {
    createCustomer: {
      // prepare: function(fullName, nationalID) {    this is same as writing below but it is written like this in the modern javascript. Below written is just a simplified way of writing like this in the modern javascript.
      prepare(fullName, nationalID, createdAt) {
        return {
          payload: { fullName, nationalID, createdAt },
        };
      },

      reducer(state, action) {
        state.fullName = action.payload.fullName;
        state.nationalID = action.payload.nationalID;
        state.createdAt = action.payload.createdAt;
        // state.createdAt = new Date().toISOString();  this is kind of side effect so we should not do in the reducer
      },
    },

    // you can update this name only in Redux devtool not in UI
    updateName(state, action) {
      state.fullName = action.payload;
    },
  },
});

// customerSlice.actions will creates an actions which we will then destructure

export const { createCustomer, updateName } = customerSlice.actions;

export default customerSlice.reducer;

// CODE BEFORE USE REDUX TOOLKIT ( WRITTEN WITH "CLASICAL REDUX")
/*
const initialStateCustomer = {
  fullName: "",
  nationalID: "",
  cretatedAt: "",
};

export default function customerReducer(state = initialStateCustomer, action) {
  switch (action.type) {
    case "customer/createCustomer":
      return {
        ...state,
        fullName: action.payload.fullName,
        nationalID: action.payload.nationalID,
        createdAt: action.payload.createdAt,
      };

    case "customer/updateName":
      return { ...state, fullName: action.payload };

    default:
      return state;
  }
}

// ususally we do, combine all the reducers that we have.

// creating Action creater for the InitaialCustomer
export function createCustomer(fullName, nationalID) {
  return {
    type: "customer/createCustomer",
    // we should try to keep most of the business logic in the reducer export function, but since Date().toISOString() is asyncronous we need to keep it in action.
    payload: { fullName, nationalID, createdAt: new Date().toISOString() },
  };
}

export function updateName(fullName) {
  return { type: "customer/updateName", payLoad: fullName };
}
*/
