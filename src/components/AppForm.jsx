import { useState } from "react";

const AppForm = ({ onUpdateTransactions }) => {
  const [amount, setAmount] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const currentDate = new Date().toLocaleDateString("en-GB");
    let transaction = {
      amount: +amount,
      description: description,
      category: category,
      type: type,
      date: currentDate,
    };

    // add the transaction to the existing transactions in localStorage
    const saved = localStorage.getItem("transactions");
    const transactions = JSON.parse(saved) || [];
    const updatedTransactions = [...transactions, transaction];
    localStorage.setItem("transactions", JSON.stringify(updatedTransactions));
    // call the onUpdateTransactions callback with the updated transactions
    onUpdateTransactions(updatedTransactions);
    // clear the form inputs
    setAmount("");
    setDescription("");
    setCategory("");
    setType("");
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="amount">Amount:</label>
          <input
            required
            type="number"
            className="form-control"
            id="amount"
            name="amount"
            value={amount}
            onChange={(e) => {
              setAmount(e.target.value);
            }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <input
            required
            type="text"
            className="form-control"
            id="description"
            name="description"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="category">Category:</label>
          <input
            required
            type="text"
            className="form-control"
            id="category"
            name="category"
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
            }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="type">Type:</label>
          <select
            className="form-control"
            id="type"
            name="type"
            value={type}
            onChange={(e) => {
              setType(e.target.value);
            }}
          >
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          Add Transaction
        </button>
      </form>
    </>
  );
};

export default AppForm;
