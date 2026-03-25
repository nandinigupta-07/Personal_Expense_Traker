import { useNavigate } from "react-router-dom";

function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">

      {/* HERO SECTION */}
      <div className="flex flex-col items-center justify-center text-center h-screen px-4 bg-gradient-to-br from-blue-500 to-indigo-600 text-white">

        <h1 className="text-5xl md:text-6xl font-bold mb-4">
          Expense Tracker 💸
        </h1>

        <p className="text-lg md:text-xl mb-6 max-w-xl">
          Manage your income and expenses smartly with real-time insights and analytics
        </p>

        <div className="flex gap-4">
          <button
            onClick={() => navigate("/dashboard")}
            className="bg-white text-blue-600 px-6 py-3 rounded-xl font-semibold hover:bg-gray-200 transition"
          >
            Get Started
          </button>

          <button
            className="border border-white px-6 py-3 rounded-xl hover:bg-white hover:text-blue-600 transition"
          >
            Learn More
          </button>
        </div>

      </div>

      {/* FEATURES */}
      <div className="py-16 px-6 md:px-16 bg-gray-50">

        <h2 className="text-3xl font-bold text-center mb-10">
          Features
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-xl transition text-center">
            <h3 className="font-bold text-xl mb-2">Add Transactions</h3>
            <p className="text-gray-500">
              Easily track your income and expenses
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-xl transition text-center">
            <h3 className="font-bold text-xl mb-2">Budget Control</h3>
            <p className="text-gray-500">
              Set budgets and avoid overspending
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-xl transition text-center">
            <h3 className="font-bold text-xl mb-2">Analytics</h3>
            <p className="text-gray-500">
              Visualize your spending with charts
            </p>
          </div>

        </div>
      </div>

      {/* CTA SECTION */}
      <div className="bg-blue-600 text-white py-16 text-center">

        <h2 className="text-3xl font-bold mb-4">
          Start Managing Your Money Today 🚀
        </h2>

        <button
          onClick={() => navigate("/dashboard")}
          className="bg-white text-blue-600 px-8 py-3 rounded-xl font-semibold hover:bg-gray-200 transition"
        >
          Go to Dashboard
        </button>

      </div>

      {/* FOOTER */}
      <div className="bg-gray-900 text-gray-400 text-center py-4">
        © 2026 Expense Tracker | Made with ❤️
      </div>

    </div>
  );
}

export default Landing;