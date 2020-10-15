import React, { useState, useContext } from "react";
import { TransactionContext } from "../Context/TransactionState";
import uuid from "react-uuid";

export const AddTransaction = () => {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("DEFAULT");
  const [displayErrors, setdisplayErrors] = useState();
  const { addTransaction } = useContext(TransactionContext);

  const onSubmit = (e) => {
    e.preventDefault();
    if (!e.target.checkValidity()) {
      setdisplayErrors(true);
      return;
    }
    if (amount < 0) {
      setdisplayErrors(true);
      setAmount("");
      return;
    }
    if (category === "DEFAULT") {
      return;
    }

    const newTransaction = {
      id: uuid(),
      description,
      amount: parseFloat(amount),
      category,
    };
    addTransaction(newTransaction);
    setDescription("");
    setAmount("");
    setCategory("DEFAULT");
    setdisplayErrors(false);
  };

  return (
    <React.Fragment>
      <h3>Add a new expense</h3>
      <form
        noValidate
        onSubmit={onSubmit}
        className={displayErrors ? "displayErrors" : ""}
      >
        <div>
          <label>
            Enter Description
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="E.g Uber ride"
              required
            />
          </label>
        </div>
        <label>
          Select Category
          <div>
            <select
              defaultValue={"DEFAULT"}
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="DEFAULT" disabled>
                Select your category
              </option>
              <option value="Food and drinks">Food and drinks</option>
              <option value="Travel">Travel</option>
              <option value="Clothes or accessories">
                Clothes or accessories
              </option>
              <option value="Subscriptions">Subscriptions</option>
              <option value="Rent">Rent</option>
              <option value="Technology">Technology</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </label>
        <label>
          Enter money spent
          <div>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="E.g 20.17"
              required
            />
          </div>
        </label>
        <button className="button"> Add transaction</button>
      </form>
    </React.Fragment>
  );
};
