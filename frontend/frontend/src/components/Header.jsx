import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function Header({
  sidebarOpen,
  setSidebarOpen
}) {

  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user") || "null"
  );

  const [darkMode, setDarkMode] = useState(
    document.documentElement.classList.contains("dark")
  );

  useEffect(() => {
    document.documentElement.classList.toggle(
      "dark",
      darkMode
    );
  }, [darkMode]);

  return (
    <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-800 px-6 py-4 flex justify-between items-center shadow-sm transition-all duration-300">

      {/* Left */}
      <div className="flex items-center gap-4">

        <button
          onClick={() =>
            setSidebarOpen(!sidebarOpen)
          }
          className="w-10 h-10 flex items-center justify-center rounded-xl bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-white hover:bg-blue-500 hover:text-white transition-all duration-300"
        >
          ☰
        </button>

        <div className="h-6 w-px bg-gray-300 dark:bg-gray-700"></div>

        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
          Welcome, {user?.displayName || "User"} 👋
        </h2>

      </div>

      {/* Right */}
      <div className="flex items-center gap-4">

        <input
          type="text"
          placeholder="Search..."
          className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-white px-3 py-2 rounded-xl outline-none"
        />

        <button
          onClick={() =>
            setDarkMode(!darkMode)
          }
          className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white px-3 py-2 rounded-xl transition hover:scale-105"
        >
          {darkMode ? "☀️" : "🌙"}
        </button>

        <span className="cursor-pointer text-xl text-gray-700 dark:text-white">
          🔔
        </span>

        {user?.photoURL ? (
          <img
            src={user.photoURL}
            alt="profile"
            onClick={() =>
              navigate("/profile")
            }
            className="w-10 h-10 rounded-full cursor-pointer border-2 border-indigo-500"
          />
        ) : (
          <div
            onClick={() =>
              navigate("/profile")
            }
            className="cursor-pointer bg-blue-500 text-white px-3 py-1 rounded-full"
          >
            {user?.displayName?.charAt(0) || "N"}
          </div>
        )}

      </div>

    </div>
  );
}

export default Header;