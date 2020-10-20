import React from "react";
import { OverallExpenses } from "../Components/OverallExpenses";
import { ListofTransactions } from "../Components/ListofTransactions";
import { AddTransaction } from "../Components/AddTransaction";

export const Transactions = () => {
  return (
    <React.Fragment>
        <div className="test">
        <OverallExpenses />
        <ListofTransactions />
        <AddTransaction />
        </div>
    </React.Fragment>
  );
};
