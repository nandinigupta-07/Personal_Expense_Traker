import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  return (
    <div className="bg-white px-6 py-4 flex justify-between items-center shadow-sm">

      {/* Left */}
      <h2 className="text-xl font-semibold">
        Welcome, Nandini 👋
      </h2>

      {/* Right */}
      <div className="flex items-center gap-4">

        {/* Search */}
        <input
          type="text"
          placeholder="Search..."
          className="border px-3 py-1 rounded-md outline-none"
        />

        {/* Notification */}
        <span className="cursor-pointer text-xl">🔔</span>

        {/* Profile */}
        <div
          onClick={() => navigate("/profile")}
          className="cursor-pointer bg-blue-500 text-white px-3 py-1 rounded-full"
        >
          N
        </div>

      </div>

    </div>
  );
}

export default Header;