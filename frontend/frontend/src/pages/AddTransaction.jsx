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

  useEffect(() => {

    fetchCategories();

    if (id) {
      fetchTransaction();
    }

  }, [id]);

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

      const res = await API.get(
        `/transactions/${id}`
      );

      const data =
        res.data?.data || {};

      setForm({
        amount: data.amount ?? "",
        description:
          data.description ?? "",
        type:
          data.type ?? "expense",
        date: data.date
          ? data.date.split("T")[0]
          : "",
        category:
          data.categoryId?._id ?? "",
      });

    } catch (err) {

      setError(
        "Failed to load transaction"
      );

    }
  };

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    setError("");

    const {
      amount,
      description,
      type,
      date,
      category,
    } = form;

    if (
      !amount ||
      !description ||
      !date ||
      !category
    ) {

      return setError(
        "All fields are required"
      );
    }

    if (Number(amount) <= 0) {

      return setError(
        "Amount must be greater than 0"
      );
    }

    try {

      const payload = {
        amount: Number(amount),
        description,
        type,
        date,
        categoryId: category,
      };

      if (id) {

        await API.put(
          `/transactions/${id}`,
          payload
        );

        alert(
          "Transaction Updated ✅"
        );

      } else {

        await API.post(
          "/transactions",
          payload
        );

        alert(
          "Transaction Added ✅"
        );
      }

      navigate("/dashboard");

    } catch (err) {

      setError(
        "Something went wrong"
      );

    }
  };

  return (

    <Layout>

      <div className="flex justify-center items-center min-h-[85vh] px-4">

        {/* Card */}
        <div className="w-full max-w-md bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-white/40 dark:border-gray-800 rounded-3xl shadow-2xl p-6 transition-all duration-300">

          {/* Heading */}
          <div className="text-center mb-6">

            <h2 className="text-3xl font-extrabold text-gray-800 dark:text-white mb-2">

              {id
                ? "Edit Transaction ✏️"
                : "Add Transaction 💸"}

            </h2>

            <p className="text-sm text-gray-500 dark:text-gray-300">
              Track your income and expenses easily
            </p>

          </div>

          {/* Error */}
          {error && (

            <div className="bg-red-100 dark:bg-red-900/40 border border-red-300 dark:border-red-700 text-red-600 dark:text-red-300 p-3 rounded-2xl text-center mb-5 text-sm">

              {error}

            </div>

          )}

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="space-y-4"
          >

            {/* Amount */}
            <div>

              <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-200">

                Amount

              </label>

              <input
                type="number"
                name="amount"
                placeholder="Enter amount"
                className="w-full p-3 text-sm rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                value={form.amount}
                onChange={handleChange}
              />

            </div>

            {/* Description */}
            <div>

              <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-200">

                Description

              </label>

              <input
                type="text"
                name="description"
                placeholder="Enter description"
                className="w-full p-3 text-sm rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                value={form.description}
                onChange={handleChange}
              />

            </div>

            {/* Type */}
            <div>

              <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-200">

                Transaction Type

              </label>

              <select
                name="type"
                className="w-full p-3 text-sm rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                value={form.type}
                onChange={handleChange}
              >

                <option value="expense">
                  Expense
                </option>

                <option value="income">
                  Income
                </option>

              </select>

            </div>

            {/* Category */}
            <div>

              <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-200">

                Category

              </label>

              <select
                name="category"
                className="w-full p-3 text-sm rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                value={form.category}
                onChange={handleChange}
              >

                <option value="">
                  Select Category
                </option>

                {categories
                  .filter(
                    (cat) =>
                      cat.type ===
                      form.type
                  )
                  .map((cat) => (

                    <option
                      key={cat._id}
                      value={cat._id}
                    >

                      {cat.name}

                    </option>

                  ))}

              </select>

            </div>

            {/* Date */}
            <div>

              <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-200">

                Date

              </label>

              <input
                type="date"
                name="date"
                className="w-full p-3 text-sm rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                value={form.date}
                onChange={handleChange}
              />

            </div>

            {/* Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 text-white p-3 rounded-2xl font-semibold text-sm hover:scale-[1.02] hover:shadow-xl transition duration-300"
            >

              {id
                ? "Update Transaction"
                : "Add Transaction"}

            </button>

          </form>

        </div>

      </div>

    </Layout>
  );
}

export default AddTransaction;