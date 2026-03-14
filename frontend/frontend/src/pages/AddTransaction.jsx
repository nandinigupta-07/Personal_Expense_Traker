import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import Navbar from "../components/Navbar";

function AddTransaction() {

  const navigate = useNavigate();

  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("expense");
  const [date, setDate] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {

    e.preventDefault();
    setError("");

    try {

      await API.post("/transactions", {
        accountId: "64b123456789abcdef123456",
        categoryId: "64b123456789abcdef123456",
        type,
        amount: Number(amount),
        description: description,
        date
      });

      alert("Transaction added successfully");

      navigate("/dashboard");

    } catch (err) {

      console.log("Transaction Error:", err.response?.data || err);
      setError("Failed to add transaction");

    }

  };

  return (

    <>
      <Navbar />

      <div className="flex justify-center items-center min-h-screen bg-gray-100">

        <div className="bg-white p-8 rounded-xl shadow w-96">

          <h2 className="text-2xl font-bold mb-6 text-center">
            Add Transaction
          </h2>

          {error && (
            <div className="bg-red-100 text-red-600 p-2 mb-4 rounded">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">

            <input
              type="number"
              placeholder="Amount"
              className="w-full border p-3 rounded"
              onChange={(e) => setAmount(e.target.value)}
              required
            />

            <input
              type="text"
              placeholder="Item / Description"
              className="w-full border p-3 rounded"
              onChange={(e) => setDescription(e.target.value)}
              required
            />

            <select
              className="w-full border p-3 rounded"
              onChange={(e) => setType(e.target.value)}
            >
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>

            <input
              type="date"
              className="w-full border p-3 rounded"
              onChange={(e) => setDate(e.target.value)}
              required
            />

            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-600"
            >
              Add Transaction
            </button>

          </form>

        </div>

      </div>
    </>
  );
}

export default AddTransaction;