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
      return total + parseFloat(transaction.amount);
    } else {
      return total - parseFloat(transaction.amount);
    }
  }, 0);

  const handleUpdateTransactions = (updatedTransactions) => {
    setTransactions(updatedTransactions);
  };

  return (
    <>
      <header>
        <h1 className="text-center mt-5">Personal Finance Management</h1>
        <nav className="mt-4 mb-4">
          <ul className="nav nav-tabs">
            <li className="nav-item">
              <a className="nav-link active" href="#">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Statistics
              </a>
            </li>
          </ul>
        </nav>
      </header>
      <main>
        <section id="home">
          <h2 className="text-center mb-4">Home</h2>
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
