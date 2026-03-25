import { useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();

  return (
    <div className="w-60 h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white fixed p-5 flex flex-col justify-between shadow-xl">

      {/* Top */}
      <div>
        <h2 className="text-2xl font-bold mb-10">💰 MoneyTrack</h2>

        <ul className="space-y-4">

          <li
            onClick={() => navigate("/dashboard")}
            className="cursor-pointer hover:text-blue-400 hover:translate-x-1 transition"
          >
            📊 Dashboard
          </li>

          <li
            onClick={() => navigate("/add-transaction")}
            className="cursor-pointer hover:text-blue-400 hover:translate-x-1 transition"
          >
            ➕ Add Transaction
          </li>

          <li
            onClick={() => navigate("/categories")}
            className="cursor-pointer hover:text-blue-400 hover:translate-x-1 transition"
          >
            📂 Categories
          </li>

        </ul>
      </div>

      {/* Bottom */}
      <div>
        <button
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/login");
          }}
          className="w-full bg-red-500 py-2 rounded hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>

    </div>
  );
}

export default Sidebar;