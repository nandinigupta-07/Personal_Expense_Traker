import Navbar from "../components/navigation/Navbar";

const About = () => {
  return (
    <>
      <Navbar
        brand="ExpenseTracker"
        links={[
          { label: "Home", to: "/" },
          { label: "About", to: "/about" },
          { label: "Contact", to: "/contact" },
          { label: "Login", to: "/login" },
          { label: "Register", to: "/register" }
        ]}
      />

      <div className="min-h-screen bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 flex items-center justify-center px-6 py-20 pt-32">

        <div className="max-w-4xl w-full bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl p-10 text-white border border-white/20">

          <h1 className="text-5xl font-bold text-center mb-8">
            About ExpenseTracker 💸
          </h1>

          <p className="text-lg text-center text-gray-200 mb-10">
            ExpenseTracker is a Full Stack Personal Finance Management
            application that helps users manage income, expenses,
            budgets and financial goals efficiently.
          </p>

          <div className="grid md:grid-cols-2 gap-8">

            <div className="bg-white/10 rounded-2xl p-6">
              <h2 className="text-2xl font-bold mb-4">
                🚀 Features
              </h2>

              <ul className="space-y-2 text-gray-200">
                <li>✅ Secure User Authentication</li>
                <li>✅ Income & Expense Tracking</li>
                <li>✅ Budget Management</li>
                <li>✅ Financial Dashboard</li>
                <li>✅ Profile Management</li>
                <li>✅ Dark & Light Theme</li>
              </ul>
            </div>

            <div className="bg-white/10 rounded-2xl p-6">
              <h2 className="text-2xl font-bold mb-4">
                💻 Tech Stack
              </h2>

              <ul className="space-y-2 text-gray-200">
                <li>⚛ React.js</li>
                <li>🟢 Node.js</li>
                <li>🚂 Express.js</li>
                <li>🍃 MongoDB</li>
              </ul>
            </div>

          </div>

        </div>

      </div>
    </>
  );
};

export default About;