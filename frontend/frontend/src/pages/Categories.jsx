import React, { useEffect, useState } from "react";

import API from "../services/api";
import Layout from "../components/Layout";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";

function Categories() {

  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [type, setType] = useState("expense");

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await API.get("/categories");
      setCategories(res.data || []);
    } catch (err) {
      console.log(err);
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      alert("Category name is required");
      return;
    }

    const formattedName = name.trim().toLowerCase();

    const exists = categories.find(
      (c) =>
        c.name.trim().toLowerCase() === formattedName &&
        c.type === type
    );

    if (exists) {
      alert("Category already exists for this type");
      return;
    }

    try {
      await API.post("/categories", { name: formattedName, type });
      setName("");
      fetchCategories();
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this category?")) return;

    try {
      await API.delete(`/categories/${id}`);
      fetchCategories();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Layout>

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-extrabold text-gray-800 dark:text-white">
          Manage Categories 📂
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-300 mt-2">
          Organize your income and expense categories easily
        </p>
      </div>

      {/* Add Category Form */}
      <Card className="mb-6 bg-white/80 dark:bg-gray-800 backdrop-blur-lg border border-white/40 dark:border-gray-700 rounded-3xl shadow-xl p-5">

        <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-5">
          Add New Category
        </h2>

        <form onSubmit={handleAdd} className="flex flex-col md:flex-row gap-3">

          {/* Input */}
          <input
            type="text"
            placeholder="Enter category name..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="flex-1 p-3 text-sm rounded-2xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
          />

          {/* Select */}
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="p-3 text-sm rounded-2xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
          >
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>

          {/* Button */}
          <Button
            type="submit"
            className="rounded-2xl px-5 text-sm shadow-lg hover:scale-105 transition"
          >
            + Add Category
          </Button>

        </form>

      </Card>

      {/* Category List */}
      <Card className="bg-white/80 dark:bg-gray-800 backdrop-blur-lg border border-white/40 dark:border-gray-700 rounded-3xl shadow-xl p-5">

        <div className="flex items-center justify-between mb-5">
          <h3 className="text-xl font-bold text-gray-800 dark:text-white">
            All Categories
          </h3>
          <span className="bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 px-3 py-1 rounded-full text-xs font-semibold">
            {categories.length} Categories
          </span>
        </div>

        {categories.length === 0 ? (

          <div className="text-center py-8">
            <div className="text-5xl mb-3">📭</div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              No categories added yet
            </p>
          </div>

        ) : (

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {categories.map((cat) => (

              <div
                key={cat._id}
                className="flex justify-between items-center p-4 bg-gradient-to-r from-white to-indigo-50 dark:from-gray-700 dark:to-gray-700/80 border border-gray-100 dark:border-gray-600 rounded-3xl hover:shadow-2xl hover:-translate-y-1 transition duration-300"
              >

                {/* Left */}
                <div className="flex items-center gap-3">

                  {/* Icon */}
                  <div className={`w-12 h-12 flex items-center justify-center rounded-2xl text-xl shadow-md ${
                    cat.type === "expense"
                      ? "bg-red-100 dark:bg-red-900/40"
                      : "bg-green-100 dark:bg-green-900/40"
                  }`}>
                    {cat.type === "expense" ? "💸" : "💰"}
                  </div>

                  {/* Content */}
                  <div>
                    <p className="font-bold text-sm text-gray-800 dark:text-white capitalize">
                      {cat.name}
                    </p>
                    <span className={`inline-block mt-1 text-[10px] px-3 py-1 rounded-full font-semibold ${
                      cat.type === "expense"
                        ? "bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-300"
                        : "bg-green-100 dark:bg-green-900/40 text-green-600 dark:text-green-300"
                    }`}>
                      {cat.type}
                    </span>
                  </div>

                </div>

                {/* Delete */}
                <button
                  onClick={() => handleDelete(cat._id)}
                  className="bg-red-100 dark:bg-red-900/40 hover:bg-red-500 hover:text-white text-red-600 dark:text-red-300 w-10 h-10 rounded-2xl flex items-center justify-center text-lg transition duration-300 shadow"
                >
                  🗑
                </button>

              </div>

            ))}

          </div>

        )}

      </Card>

    </Layout>
  );
}

export default Categories;