import AppForm from "./AppForm";
import { useState } from "react";
import TransactionTable from "./TransactionTable";

export default function App() {
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem("transactions");
    return JSON.parse(saved) || [];
  });
  const balance = transactions.reduce((total, transaction) => {
    if (transaction.type === "income") {
      return total + transaction.amount;
    } else {
      return total - transaction.amount;
    }
  }, 0);
  const incomeArr = transactions
    .filter((transaction) => transaction.type === "income")
    .map((transaction) => transaction.amount);
  const income =
    incomeArr.length > 0
      ? incomeArr.reduce((total, transaction) => total + transaction)
      : 0;

  const expenseArr = transactions
    .filter((transaction) => transaction.type === "expense")
    .map((transaction) => transaction.amount);

  const expense =
    expenseArr.length > 0
      ? expenseArr.reduce((total, transaction) => total + transaction)
      : 0;

  const handleUpdateTransactions = (updatedTransactions) => {
    setTransactions(updatedTransactions);
  };

  return (
    <>
      <header>
        <h1 className="text-center mt-5">Personal Finance Management</h1>
      </header>
      <main>
        <section id="home">
          <div className="card mb-4">
            <div className="card-header">
              <h3 className="card-title">Current Balance:</h3>
            </div>
            <div className="card-body">
              <h2 className="card-text text-center">${balance}</h2>
            </div>
          </div>
          <div className="card mb-4">
            <div className="card-header">
              <h3 className="card-title">Total income:</h3>
            </div>
            <div className="card-body">
              <h2 className="card-text text-center">${income}</h2>
            </div>
          </div>
          <div className="card mb-4">
            <div className="card-header">
              <h3 className="card-title">Total expenses:</h3>
            </div>
            <div className="card-body">
              <h2 className="card-text text-center">-${expense}</h2>
            </div>
          </div>
          <div className="card mb-4">
            <div className="card-header">
              <h3 className="card-title">Add a New Transaction:</h3>
            </div>
            <div className="card-body">
              <AppForm onUpdateTransactions={handleUpdateTransactions} />
            </div>
          </div>
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Transaction History:</h3>
            </div>
            <div className="card-body">
              <TransactionTable transactions={transactions} />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
