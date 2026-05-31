import { useNavigate } from "react-router-dom";

const navItems = [
  { label: "Dashboard", icon: "📊", path: "/dashboard" },
  { label: "Add Transaction", icon: "➕", path: "/add-transaction" },
  { label: "Categories", icon: "📂", path: "/categories" }
];

function Sidebar() {
  const navigate = useNavigate();

  // ✅ Sirf token aur user clear karo — profilePic aur theme bachao
  const handleLogout = () => {
    const savedPic = localStorage.getItem("profilePic");
    const savedTheme = localStorage.getItem("theme");
    localStorage.clear();
    if (savedPic) localStorage.setItem("profilePic", savedPic);
    if (savedTheme) localStorage.setItem("theme", savedTheme);
    navigate("/");
  };

  return (
    <aside className="w-60 h-screen bg-gradient-to-b from-gray-900 to-gray-800 dark:from-black dark:to-gray-950 text-white fixed p-5 flex flex-col justify-between shadow-xl">
      <div>
        <h2 className="text-2xl font-bold mb-10">ExpenseTracker</h2>
        <ul className="space-y-4">
          {navItems.map(({ label, icon, path }) => (
            <li
              key={path}
              onClick={() => navigate(path)}
              className="cursor-pointer hover:text-blue-400 dark:hover:text-indigo-400 hover:translate-x-1 transition"
            >
              {icon} {label}
            </li>
          ))}
        </ul>
      </div>

      <button
        type="button"
        onClick={handleLogout}
        className="w-full py-2 rounded-xl bg-red-500 hover:bg-red-600 transition"
      >
        Logout
      </button>
    </aside>
  );
}

export default Sidebar;
