import React, { useContext } from "react";
import moment from 'moment';
import { TransactionContext } from "../Context/TransactionState";


export const Transaction = (props) => {
  const { deleteTransaction } = useContext(TransactionContext);

  function categoryCSS() {
    if (props.transaction.category === "Food and drinks") {
      return "Food";
    } else if (props.transaction.category === "Travel") {
      return "Travel";
    } else if (props.transaction.category === "Clothes or accessories ") {
      return "Clothes or accessories";
    } else if (props.transaction.category === "Subscriptions") {
      return "Subscriptions";
    } else if (props.transaction.category === "Rent") {
      return "Rent";
    } else if (props.transaction.category === "Technology") {
      return "Technology";
    } else if (props.transaction.category === "Other") {
      return "Other";
    }
  }
  return (
    <li>
      <div className={categoryCSS()}>{props.transaction.category}</div>
      <span>{props.transaction.description} </span>
      <span>${props.transaction.amount}</span>
      <span>{moment(props.transaction.date).format('DD MMM, YYYY')}</span>
      <button
        className="deletebutton"
        onClick={() => deleteTransaction(props.transaction.id)}
      >
        x
      </button>
    </li>
  );
};
