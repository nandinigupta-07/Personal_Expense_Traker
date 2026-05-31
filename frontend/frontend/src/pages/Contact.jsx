import Navbar from "../components/navigation/Navbar";

const Contact = () => {
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

      <div className="min-h-screen bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 flex justify-center items-center px-6 pt-32">

        <div className="w-full max-w-xl bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl p-10 border border-white/20">

          <h1 className="text-4xl font-bold text-center text-white mb-8">
            Contact Us 📩
          </h1>

          <form className="space-y-5">

            <input
              type="text"
              placeholder="Your Name"
              className="w-full p-4 rounded-xl bg-white/20 text-white placeholder-gray-200 outline-none"
            />

            <input
              type="email"
              placeholder="Your Email"
              className="w-full p-4 rounded-xl bg-white/20 text-white placeholder-gray-200 outline-none"
            />

            <textarea
              rows="5"
              placeholder="Your Message"
              className="w-full p-4 rounded-xl bg-white/20 text-white placeholder-gray-200 outline-none"
            />

            <button
              type="submit"
              className="w-full bg-white text-indigo-700 font-bold py-3 rounded-xl hover:scale-105 transition"
            >
              Send Message
            </button>

          </form>

        </div>

      </div>
    </>
  );
};

export default Contact;