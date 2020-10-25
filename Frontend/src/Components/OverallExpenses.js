import React, { useContext } from "react";

import { TransactionContext } from "../Context/TransactionState";

export const OverallExpenses = () => {
  const context = useContext(TransactionContext);
  const values = context.transactions.map((transaction) => transaction.amount);
  const total = values.reduce((prev, tot) => prev + tot, 0).toFixed(2);


  return (
    <React.Fragment>
      <h4>Your Total Expenditure:</h4>
      <div className="inc-exp-container">
        <h1 className="h1v1">${total}</h1>
      </div>
    </React.Fragment>
  );
};
