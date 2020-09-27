import React, { createContext, useReducer } from "react";
import TransactionReducer from "./TransactionReducer";

const initialState = {
  transactions: [],
};

//Initalizes context, for now an empty array of transactions
export const TransactionContext = createContext(initialState);

//Provider, wraps around all of app.js so children component can access context
export const TransactionProvider = ({ children }) => {
  const [state, dispatch] = useReducer(TransactionReducer, initialState);

  //Actions- Calls to reducer
  function deleteTransaction(id) {
    dispatch({
      type: "DELETE_EXPENSE",
      payload: id,
    });
  }
  function addTransaction(transaction) {
    dispatch({
      type: "ADD_EXPENSE",
      payload: transaction,
    });
  }
  return (
    <TransactionContext.Provider
      value={{
        transactions: state.transactions,
        deleteTransaction,
        addTransaction,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
