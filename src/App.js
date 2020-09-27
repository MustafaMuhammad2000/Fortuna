import React from "react";
import "./App.css";
import { Title } from "./Components/Title";
import { OverallExpenses } from "./Components/OverallExpenses";
import { ListofTransactions } from "./Components/ListofTransactions";
import { AddTransaction } from "./Components/AddTransaction";
import { TransactionProvider } from "./Context/TransactionState";
import { NavBar } from "./Components/NavBar";
function App() {
  return (
    <TransactionProvider>
      <NavBar />
      <Title />
      <OverallExpenses />
      <ListofTransactions />
      <AddTransaction />
    </TransactionProvider>
  );
}

export default App;
