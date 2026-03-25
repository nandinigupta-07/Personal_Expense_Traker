import React, { useEffect, useState } from "react";
import API from "../services/api";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

function Categories() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [type, setType] = useState("expense");

  const fetchCategories = async () => {
    try {
      const res = await API.get("/categories");
      setCategories(res.data || []);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!name) return;

    try {
      await API.post("/categories", { name, type });
      setName("");
      fetchCategories();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="ml-60 w-full">

        {/* Header */}
        <Header />

        <div className="p-8 bg-gradient-to-br from-gray-100 to-blue-100 min-h-screen">

          {/* Title */}
          <h2 className="text-2xl font-bold mb-6">Manage Categories</h2>

          {/* Add Category */}
          <form
            onSubmit={handleAdd}
            className="bg-white p-6 rounded-2xl shadow-md mb-6 flex gap-4 flex-wrap"
          >
            <input
              type="text"
              placeholder="Enter category name..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="flex-1 border p-3 rounded-lg"
            />

            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="border p-3 rounded-lg"
            >
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>

            <button
              type="submit"
              className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition"
            >
              Add
            </button>
          </form>

          {/* Category List */}
          <div className="bg-white p-6 rounded-2xl shadow-md">
            <h3 className="mb-4 font-semibold">All Categories</h3>

            {categories.length === 0 ? (
              <p className="text-gray-500 text-center">
                No categories added yet
              </p>
            ) : (
              <div className="space-y-3">
                {categories.map((cat) => (
                  <div
                    key={cat._id}
                    className="flex justify-between items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
                  >
                    <span className="font-medium">{cat.name}</span>

                    <span
                      className={`text-sm font-semibold ${
                        cat.type === "expense"
                          ? "text-red-500"
                          : "text-green-600"
                      }`}
                    >
                      {cat.type}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}

export default Categories;