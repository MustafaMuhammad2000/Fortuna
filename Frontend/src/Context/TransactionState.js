import React, { createContext, useReducer, useContext } from "react";
import { useSnackbar } from 'notistack';

import { AuthContext} from "./auth-context"
import TransactionReducer from "./TransactionReducer";

const initialState = {
  transactions: [],
};

//Initalizes context, for now an empty array of transactions
export const TransactionContext = createContext(initialState);

//Provider, wraps around all of app.js so children component can access context
export const TransactionProvider = ({ children }) => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const auth = useContext(AuthContext);
  const [state, dispatch] = useReducer(TransactionReducer, initialState);

  //Actions- Calls to reducer

  async function getTransactions(){
    try{
      const response = await fetch('http://localhost:5000/api/transactions/all' , {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
           'Authorization' : 'Bearer '+auth.token
        },
      })
      const responseData = await response.json();
      if(!response.ok){
        throw new Error(responseData.message);
      }
      console.log(responseData);
      dispatch({
        type: 'GET_TRANSACTIONS',
        payload: responseData.transactions
      });
    } catch (error) {
      console.log(error)
      enqueueSnackbar(error.message, {
        variant: 'error',
        autoHideDuration: 2000,
      });
      dispatch({
        type: 'TRANSACTION_ERROR',
        payload: error.message
      })
    }
  }
  async function deleteTransaction(id) {
    try{
      const response = await fetch('http://localhost:5000/api/transactions/' , {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization' : 'Bearer '+auth.token
        },
        body: JSON.stringify({
          transactionId: String(id)
        })
      })
      const responseData = await response.json();
      if(!response.ok){
        throw new Error(responseData.message);
      }
      console.log(responseData);
      enqueueSnackbar(responseData.message, {
        variant: 'success',
        autoHideDuration: 2000,
      });
      dispatch({
        type: 'DELETE_TRANSACTION',
        payload: id
      });
    } catch (error) {
      console.log(error)
      enqueueSnackbar(error.message, {
        variant: 'error',
        autoHideDuration: 2000,
      });
      dispatch({
        type: 'TRANSACTION_ERROR',
        payload: error.message
      })
    }
  }
  async function addTransaction(transaction) {
    try{
      const response = await fetch('http://localhost:5000/api/transactions' , {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
           'Authorization' : 'Bearer '+auth.token
        },
        body: JSON.stringify({
          id: transaction.id,
          description: transaction.description,
          amount: transaction.amount,
          category: transaction.category,
          date: transaction.date,
        })
      })
      const responseData = await response.json();
      if(!response.ok){
        throw new Error(responseData.message);
      }
      console.log(responseData);
      enqueueSnackbar(responseData.message, {
        variant: 'success',
        autoHideDuration: 2000,
      });
      dispatch({
        type: 'ADD_TRANSACTION',
        payload: transaction
      });
    } catch (error) {
      console.log(error)
      enqueueSnackbar(error.message, {
        variant: 'error',
        autoHideDuration: 2000,
      });
      dispatch({
        type: 'TRANSACTION_ERROR',
        payload: error.message
      })
    }
  }
  return (
    <TransactionContext.Provider
      value={{
        transactions: state.transactions,
        getTransactions,
        deleteTransaction,
        addTransaction,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
