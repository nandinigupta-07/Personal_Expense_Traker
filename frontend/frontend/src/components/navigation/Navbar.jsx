import { Link } from "react-router-dom";

function Navbar({
  brand = "ExpenseTracker",
  links = [],
  rightContent = null
}) {

  return (

    <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-xl bg-white/10 border-b border-white/20 shadow-lg">

      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 md:px-10 py-4">

        {/* Logo */}
        <div className="flex items-center gap-3">

          <div className="w-10 h-10 rounded-2xl bg-gradient-to-r from-indigo-500 to-blue-500 flex items-center justify-center text-white text-lg shadow-lg">

            💸

          </div>

          <h2 className="text-2xl font-extrabold text-white tracking-wide">

            {brand}

          </h2>

        </div>

        {/* Links */}
        <div className="flex items-center gap-6">

          {links.map(({ label, to }) => (

            <Link
              key={to}
              to={to}
              className="relative text-sm md:text-base font-medium text-white hover:text-blue-200 transition duration-300 after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-[2px] after:bg-white hover:after:w-full after:transition-all"
            >

              {label}

            </Link>

          ))}

          {/* Extra Right Content */}
          {rightContent}

        </div>

      </div>

    </nav>
  );
}

export default Navbar;