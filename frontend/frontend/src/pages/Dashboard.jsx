import React, { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";

function Dashboard() {

  const [transactions, setTransactions] = useState([]);
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);

  useEffect(() => {
    getTransactions();
  }, []);

  const getTransactions = async () => {

    try {

      const res = await API.get("/transactions");
      const data = res.data.data;

      setTransactions(data);

      let totalIncome = 0;
      let totalExpense = 0;

      data.forEach((t) => {

        if (t.type === "income") {
          totalIncome += t.amount;
        } else {
          totalExpense += t.amount;
        }

      });

      setIncome(totalIncome);
      setExpense(totalExpense);

    } catch (error) {
      console.log(error);
    }

  };

  // DELETE WITH CONFIRMATION
  const deleteTransaction = async (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this transaction?"
    );

    if (!confirmDelete) return;

    try {

      await API.delete(`/transactions/${id}`);

      getTransactions();

    } catch (error) {
      console.log(error);
    }

  };

  const balance = income - expense;

  return (

    <>
      <Navbar />

      <div className="p-10 bg-gray-100 min-h-screen">

        <h1 className="text-3xl font-bold mb-6">
          Dashboard
        </h1>

        {/* Summary Cards */}

        <div className="flex gap-6">

          <div className="bg-white p-6 rounded-xl shadow w-60 text-center">
            <h3 className="text-gray-500">Total Income</h3>
            <p className="text-2xl font-bold text-green-600">
              ₹ {income}
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow w-60 text-center">
            <h3 className="text-gray-500">Total Expense</h3>
            <p className="text-2xl font-bold text-red-600">
              ₹ {expense}
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow w-60 text-center">
            <h3 className="text-gray-500">Balance</h3>
            <p className="text-2xl font-bold text-blue-600">
              ₹ {balance}
            </p>
          </div>

        </div>

        {/* Transactions Table */}

        <h2 className="text-xl font-semibold mt-10">
          Recent Transactions
        </h2>

        <div className="bg-white shadow rounded-lg mt-4 overflow-hidden">

          <table className="w-full">

            <thead className="bg-gray-200">

              <tr>

                <th className="p-3 text-left">
                  Item
                </th>

                <th className="p-3 text-left">
                  Amount
                </th>

                <th className="p-3 text-left">
                  Type
                </th>

                <th className="p-3 text-left">
                  Date
                </th>

                <th className="p-3 text-left">
                  Action
                </th>

              </tr>

            </thead>

            <tbody>

              {transactions.slice(0,5).map((t) => (

                <tr key={t._id} className="border-t">

                  <td className="p-3">
                    {t.description}
                  </td>

                  <td className="p-3">
                    ₹ {t.amount}
                  </td>

                  <td className="p-3">
                    {t.type}
                  </td>

                  <td className="p-3">
                    {new Date(t.date).toLocaleDateString()}
                  </td>

                  <td className="p-3">
                    <button
                      onClick={() => deleteTransaction(t._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </>
  );

}

export default Dashboard;