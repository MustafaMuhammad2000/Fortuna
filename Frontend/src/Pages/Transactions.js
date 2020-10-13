import React from "react";
import { OverallExpenses } from "../Components/OverallExpenses";
import { ListofTransactions } from "../Components/ListofTransactions";
import { AddTransaction } from "../Components/AddTransaction";
import { TransactionProvider } from "../Context/TransactionState";

export const Transactions = () => {
  return (
    <React.Fragment>
      <TransactionProvider>
        <OverallExpenses />
        <ListofTransactions />
        <AddTransaction />
      </TransactionProvider>
    </React.Fragment>
  );
};
