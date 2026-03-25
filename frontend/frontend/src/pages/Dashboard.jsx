import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import Layout from "../components/Layout";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid
} from "recharts";

function Dashboard() {
  const [transactions, setTransactions] = useState([]);
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [budget, setBudget] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await API.get("/transactions");
      const data = res.data.data || res.data || [];

      setTransactions(data);

      let inc = 0;
      let exp = 0;

      data.forEach((t) => {
        if (t.type === "income") inc += Number(t.amount);
        else exp += Number(t.amount);
      });

      setIncome(inc);
      setExpense(exp);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteTransaction = async (id) => {
    if (!window.confirm("Delete this transaction?")) return;

    await API.delete(`/transactions/${id}`);
    fetchData();
  };

  const balance = income - expense;

  const chartData = [
    { name: "Income", value: income },
    { name: "Expense", value: expense }
  ];

  const COLORS = ["#22c55e", "#ef4444"];

  const percentage = budget > 0 ? (expense / budget) * 100 : 0;

  return (
    <Layout>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">

        <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition text-center">
          <h3 className="text-gray-500">Income</h3>
          <p className="text-2xl font-bold text-green-600">₹ {income}</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition text-center">
          <h3 className="text-gray-500">Expense</h3>
          <p className="text-2xl font-bold text-red-600">₹ {expense}</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition text-center">
          <h3 className="text-gray-500">Balance</h3>
          <p className="text-2xl font-bold text-blue-600">₹ {balance}</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition text-center">
          <h3 className="text-gray-500">Budget</h3>
          <p className="text-2xl font-bold text-orange-500">
            ₹ {budget || 0}
          </p>
        </div>

      </div>

      {/* Budget Progress */}
      {budget > 0 && (
        <div className="bg-white p-4 rounded-xl shadow mb-6">
          <h3 className="mb-2 font-semibold">Budget Usage</h3>

          <div className="w-full bg-gray-200 rounded-full h-4">
            <div
              className={`h-4 rounded-full transition-all duration-500 ${
                percentage > 100 ? "bg-red-500" : "bg-green-500"
              }`}
              style={{ width: `${Math.min(percentage, 100)}%` }}
            ></div>
          </div>

          <p className="mt-2 text-sm">
            {percentage.toFixed(1)}% used
          </p>
        </div>
      )}

      {/* Alert */}
      {expense > budget && budget > 0 && (
        <div className="bg-red-100 text-red-600 p-3 mb-6 rounded text-center">
          ⚠️ Budget Exceeded
        </div>
      )}

     {/* Charts */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">

  {/* PIE CHART */}
  <div className="bg-white p-6 rounded-2xl shadow-lg flex flex-col items-center hover:shadow-xl transition">
    <h3 className="mb-4 font-semibold text-lg">Income vs Expense</h3>

    <PieChart width={320} height={260}>
      <Pie
        data={chartData}
        dataKey="value"
        cx="50%"
        cy="50%"
        outerRadius={90}
        innerRadius={50}   // 🔥 donut effect
        paddingAngle={5}   // 🔥 spacing between slices
        label={({ name, percent }) =>
          `${name} ${(percent * 100).toFixed(0)}%`
        }
      >
        {chartData.map((_, i) => (
          <Cell key={i} fill={COLORS[i]} />
        ))}
      </Pie>

      <Tooltip
        contentStyle={{ borderRadius: "10px", border: "none" }}
      />
      <Legend />
    </PieChart>
  </div>

  {/* BAR CHART */}
  <div className="bg-white p-6 rounded-2xl shadow-lg flex flex-col items-center hover:shadow-xl transition">
    <h3 className="mb-4 font-semibold text-lg">Overview</h3>

    <BarChart width={380} height={260} data={chartData}>
      <CartesianGrid strokeDasharray="3 3" />

      <XAxis dataKey="name" />
      <YAxis />

      <Tooltip
        contentStyle={{ borderRadius: "10px", border: "none" }}
      />

      <Bar
        dataKey="value"
        fill="#3b82f6"
        radius={[10, 10, 0, 0]} // 🔥 rounded bars
      />
    </BarChart>
  </div>

</div>

      {/* Transactions */}
      <div className="bg-white rounded-xl shadow p-4">
        <h2 className="text-xl font-semibold mb-4">
          Recent Transactions
        </h2>

        <table className="w-full text-left">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="p-3">Item</th>
              <th className="p-3">Amount</th>
              <th className="p-3">Type</th>
              <th className="p-3">Date</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {transactions.length === 0 ? (
              <tr>
                <td colSpan="5" className="p-4 text-center">
                  No Data
                </td>
              </tr>
            ) : (
              transactions.map((t) => (
                <tr key={t._id} className="border-b hover:bg-gray-50 transition">
                  <td className="p-3">{t.description}</td>
                  <td className="p-3">₹ {t.amount}</td>
                  <td className="p-3 capitalize">{t.type}</td>
                  <td className="p-3">
                    {new Date(t.date).toLocaleDateString()}
                  </td>
                  <td className="p-3 flex gap-2">
                    <button
                      onClick={() => navigate(`/edit/${t._id}`)}
                      className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded-lg transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteTransaction(t._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

    </Layout>
  );
}

export default Dashboard;