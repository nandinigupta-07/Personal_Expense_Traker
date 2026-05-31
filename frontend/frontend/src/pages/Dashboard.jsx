import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import Layout from "../components/Layout";
import {
  PieChart, Pie, Cell, Tooltip, Legend,
  BarChart, Bar, XAxis, YAxis, CartesianGrid
} from "recharts";

function Dashboard() {
  const [transactions, setTransactions] = useState([]);
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [budget, setBudget] = useState(0);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const res = await API.get("/transactions");

      let data = [];
      if (Array.isArray(res.data)) data = res.data;
      else if (Array.isArray(res.data?.data)) data = res.data.data;
      else if (Array.isArray(res.data?.transactions)) data = res.data.transactions;

      setTransactions(data);

      const totals = data.reduce(
        (acc, t) => {
          const type = t.type?.toLowerCase();
          if (type === "income") acc.inc += Number(t.amount) || 0;
          else if (type === "expense") acc.exp += Number(t.amount) || 0;
          return acc;
        },
        { inc: 0, exp: 0 }
      );

      setIncome(totals.inc);
      setExpense(totals.exp);
    } catch (err) {
      console.error("Fetch error:", err?.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
    const savedBudget = Number(localStorage.getItem("budget")) || 0;
    setBudget(savedBudget);
  }, [fetchData]);

  const deleteTransaction = async (id) => {
    if (!window.confirm("Delete this transaction?")) return;
    try {
      await API.delete(`/transactions/${id}`);
      fetchData();
    } catch (err) {
      console.error("Delete error:", err?.response?.data || err.message);
    }
  };

  const balance = income - expense;
  const percentage = budget > 0 ? (expense / budget) * 100 : 0;
  const chartData = [
    { name: "Income", value: income },
    { name: "Expense", value: expense },
  ];
  const COLORS = ["#22c55e", "#ef4444"];

  const StatCard = ({ label, value, color }) => (
    <div className="bg-white/80 dark:bg-gray-800 backdrop-blur-lg border border-white/40 dark:border-gray-700 p-6 rounded-3xl shadow-lg hover:shadow-2xl hover:-translate-y-1 transition duration-300 text-center">
      <h3 className="text-gray-500 dark:text-gray-300 mb-2">{label}</h3>
      <p className={`text-3xl font-bold ${color}`}>₹ {value}</p>
    </div>
  );

  return (
    <Layout>

      {/* Welcome */}
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold text-gray-800 dark:text-white">Welcome Back 👋</h1>
        <p className="text-gray-500 dark:text-gray-300 mt-2">Here's your financial overview today</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <StatCard label="Income"  value={income}       color="text-green-600 dark:text-green-400" />
        <StatCard label="Expense" value={expense}      color="text-red-600 dark:text-red-400" />
        <StatCard label="Balance" value={balance}      color="text-blue-600 dark:text-blue-400" />
        <StatCard label="Budget"  value={budget || 0}  color="text-orange-500 dark:text-orange-400" />
      </div>

      {/* Budget Progress */}
      {budget > 0 && (
        <div className="bg-white/80 dark:bg-gray-800 backdrop-blur-lg border border-white/40 dark:border-gray-700 p-6 rounded-3xl shadow-xl mb-6">
          <h3 className="mb-4 text-lg font-semibold text-gray-700 dark:text-gray-200">Budget Usage</h3>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-5 overflow-hidden">
            <div
              className={`h-5 rounded-full transition-all duration-700 ${percentage > 100 ? "bg-red-500" : "bg-green-500"}`}
              style={{ width: `${Math.min(percentage, 100)}%` }}
            />
          </div>
          <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">{percentage.toFixed(1)}% used</p>
        </div>
      )}

      {/* Budget Exceeded Alert */}
      {expense > budget && budget > 0 && (
        <div className="bg-red-100 dark:bg-red-900/40 border border-red-300 dark:border-red-500 text-red-600 dark:text-red-300 p-4 mb-6 rounded-2xl text-center shadow">
          ⚠️ Budget Exceeded
        </div>
      )}

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        <div className="bg-white/80 dark:bg-gray-800 backdrop-blur-lg border border-white/40 dark:border-gray-700 p-6 rounded-3xl shadow-xl flex flex-col items-center hover:shadow-2xl transition duration-300">
          <h3 className="mb-4 font-semibold text-xl text-gray-700 dark:text-gray-200">Income vs Expense</h3>
          <PieChart width={320} height={260}>
            <Pie data={chartData} dataKey="value" cx="50%" cy="50%" outerRadius={90} innerRadius={50} paddingAngle={5}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
              {chartData.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
            </Pie>
            <Tooltip contentStyle={{ borderRadius: "12px", border: "none", backgroundColor: "#1f2937", color: "#f9fafb" }} />
            <Legend formatter={(value) => <span style={{ color: "#d1d5db" }}>{value}</span>} />
          </PieChart>
        </div>

        <div className="bg-white/80 dark:bg-gray-800 backdrop-blur-lg border border-white/40 dark:border-gray-700 p-6 rounded-3xl shadow-xl flex flex-col items-center hover:shadow-2xl transition duration-300">
          <h3 className="mb-4 font-semibold text-xl text-gray-700 dark:text-gray-200">Overview</h3>
          <BarChart width={380} height={260} data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="name" tick={{ fill: "#d1d5db" }} />
            <YAxis tick={{ fill: "#d1d5db" }} />
            <Tooltip contentStyle={{ borderRadius: "12px", border: "none", backgroundColor: "#1f2937", color: "#f9fafb" }} />
            <Bar dataKey="value" fill="#3b82f6" radius={[10, 10, 0, 0]} />
          </BarChart>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white/80 dark:bg-gray-800 backdrop-blur-lg border border-white/40 dark:border-gray-700 rounded-3xl shadow-xl p-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Recent Transactions</h2>

        {loading ? (
          <p className="text-center text-gray-500 dark:text-gray-400 py-8">Loading transactions...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-indigo-50 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300">
                <tr>
                  <th className="p-4 rounded-l-xl">Item</th>
                  <th className="p-4">Amount</th>
                  <th className="p-4">Type</th>
                  <th className="p-4">Date</th>
                  <th className="p-4 rounded-r-xl">Action</th>
                </tr>
              </thead>
              <tbody>
                {transactions.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="p-6 text-center text-gray-500 dark:text-gray-400">
                      📭 No Transactions Found
                    </td>
                  </tr>
                ) : (
                  transactions.map((t) => (
                    <tr key={t._id} className="border-b border-gray-200 dark:border-gray-700 hover:bg-indigo-50/50 dark:hover:bg-indigo-900/20 transition duration-300">
                      <td className="p-4 text-gray-800 dark:text-gray-200">{t.description}</td>
                      <td className="p-4 font-semibold text-gray-800 dark:text-gray-200">₹ {t.amount}</td>
                      <td className="p-4 capitalize">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          t.type?.toLowerCase() === "income"
                            ? "bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300"
                            : "bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300"
                        }`}>
                          {t.type}
                        </span>
                      </td>
                      <td className="p-4 text-gray-800 dark:text-gray-200">
                        {t.date ? new Date(t.date).toLocaleDateString() : "—"}
                      </td>
                      <td className="p-4 flex gap-3">
                        <button type="button" onClick={() => navigate(`/edit/${t._id}`)}
                          className="bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-2 rounded-xl shadow-md transition">
                          Edit
                        </button>
                        <button type="button" onClick={() => deleteTransaction(t._id)}
                          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl shadow-md transition">
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </Layout>
  );
}

export default Dashboard;
