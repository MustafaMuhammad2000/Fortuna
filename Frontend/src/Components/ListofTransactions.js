import React, { useContext, useEffect } from "react";
import { TransactionContext } from "../Context/TransactionState";
import { Transaction } from "./Transaction";

export const ListofTransactions = () => {
  const context = useContext(TransactionContext);

  useEffect(() => {
    context.getTransactions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <React.Fragment>
      <h3>Expense History</h3>
      <ul className="ulist">
        {context.transactions.map((transaction) => (
          <Transaction key={transaction.id} transaction={transaction} />
        ))}
      </ul>
    </React.Fragment>
  );
};
