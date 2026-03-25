import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../services/api";
import Layout from "../components/Layout";

function AddTransaction() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [form, setForm] = useState({
    amount: "",
    description: "",
    type: "expense",
    date: "",
    category: "",
  });

  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");

  const fetchCategories = async () => {
    try {
      const res = await API.get("/categories");
      setCategories(res.data || []);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchTransaction = async () => {
    try {
      const res = await API.get(`/transactions/${id}`);
      const data = res.data?.data || {};

      setForm({
        amount: data.amount ?? "",
        description: data.description ?? "",
        type: data.type ?? "expense",
        date: data.date ? data.date.split("T")[0] : "",
        category: data.categoryId?.name ?? "",
      });
    } catch (err) {
      setError("Failed to load transaction");
    }
  };

  useEffect(() => {
    fetchCategories();
    if (id) fetchTransaction();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const { amount, description, type, date, category } = form;

    if (!amount || !description || !date || !category) {
      return setError("All fields are required");
    }

    if (Number(amount) <= 0) {
      return setError("Amount must be greater than 0");
    }

    try {
      let existing = categories.find(
        (c) => c.name.toLowerCase() === category.toLowerCase()
      );

      let categoryId;

      if (existing) {
        categoryId = existing._id;
      } else {
        const res = await API.post("/categories", {
          name: category,
          type,
        });
        categoryId = res.data.category._id;
      }

      const payload = {
        amount: Number(amount),
        description,
        type,
        date,
        categoryId,
      };

      if (id) {
        await API.put(`/transactions/${id}`, payload);
        alert("Transaction Updated ✅");
      } else {
        await API.post("/transactions", payload);
        alert("Transaction Added ✅");
      }

      navigate("/dashboard");

    } catch (err) {
      setError("Something went wrong");
    }
  };

  return (
    <Layout>

      <div className="flex justify-center items-center min-h-[80vh]">

        <div className="bg-white p-8 rounded-2xl shadow-lg w-96">

          <h2 className="text-2xl font-bold mb-6 text-center">
            {id ? "Edit Transaction" : "Add Transaction"}
          </h2>

          {error && (
            <div className="bg-red-100 text-red-600 p-2 mb-4 rounded text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">

            <input
              type="number"
              name="amount"
              placeholder="Amount"
              className="w-full border p-3 rounded"
              value={form.amount}
              onChange={handleChange}
            />

            <input
              type="text"
              name="description"
              placeholder="Description"
              className="w-full border p-3 rounded"
              value={form.description}
              onChange={handleChange}
            />

            <input
              type="text"
              name="category"
              placeholder="Category"
              className="w-full border p-3 rounded"
              value={form.category}
              onChange={handleChange}
            />

            <select
              name="type"
              className="w-full border p-3 rounded"
              value={form.type}
              onChange={handleChange}
            >
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>

            <input
              type="date"
              name="date"
              className="w-full border p-3 rounded"
              value={form.date}
              onChange={handleChange}
            />

            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-600 transition"
            >
              {id ? "Update" : "Add"}
            </button>

          </form>

        </div>

      </div>

    </Layout>
  );
}

export default AddTransaction;