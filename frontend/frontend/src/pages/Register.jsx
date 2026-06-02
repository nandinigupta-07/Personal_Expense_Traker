import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase";
import Navbar from "../components/navigation/Navbar";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
  e.preventDefault();

  setError("");
  setSuccess("");

  if (!name.trim()) {
    setError("Name is required");
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    setError("Please enter a valid email");
    return;
  }

  if (password.length < 6) {
    setError("Password must be at least 6 characters");
    return;
  }

  try {
    setLoading(true);

    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/api/auth/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      }
    );

    const data = await res.json();

    if (res.ok) {
      setSuccess(
        data.message || "Account created successfully!"
      );

      setName("");
      setEmail("");
      setPassword("");

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } else {
      setError(data.message || "Registration failed");
    }
  } catch (err) {
    console.error(err);
    setError("Server not responding");
  } finally {
    setLoading(false);
  }
};
  const handleGoogleSignup = async () => {
    try {
      const result = await signInWithPopup(auth, provider);

      const user = result.user;

      localStorage.clear();

      localStorage.setItem(
        "user",
        JSON.stringify(user)
      );

      navigate("/dashboard");

    } catch (error) {
      console.error(error);
      setError("Google login failed");
    }
  };

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

      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-700 via-indigo-700 to-blue-700 px-4 pt-24">

        <div className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-8 text-white">

          <div className="text-center mb-8">

            <h2 className="text-4xl font-extrabold mb-2">
              Create Account 🚀
            </h2>

            <p className="text-gray-200">
              Start managing your finances smartly
            </p>

          </div>

          {error && (
            <div className="bg-red-500/20 border border-red-400 text-red-100 p-3 rounded-lg mb-4 text-sm">
              {error}
            </div>
          )}

          {success && (
            <div className="bg-green-500/20 border border-green-400 text-green-100 p-3 rounded-lg mb-4 text-sm">
              {success}
            </div>
          )}

          <form
            onSubmit={handleRegister}
            className="space-y-5"
          >

            <div>
              <label className="block mb-2 text-sm font-medium">
                Full Name
              </label>

              <input
                type="text"
                placeholder="Enter your full name"
                className="w-full p-3 rounded-xl bg-white/20 border border-white/20 placeholder-gray-200 outline-none focus:ring-2 focus:ring-white"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium">
                Email
              </label>

              <input
                type="email"
                placeholder="Enter your email"
                className="w-full p-3 rounded-xl bg-white/20 border border-white/20 placeholder-gray-200 outline-none focus:ring-2 focus:ring-white"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium">
                Password
              </label>

              <input
                type="password"
                placeholder="Enter your password"
                className="w-full p-3 rounded-xl bg-white/20 border border-white/20 placeholder-gray-200 outline-none focus:ring-2 focus:ring-white"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-white text-indigo-700 font-bold py-3 rounded-xl hover:scale-105 transition duration-300 shadow-lg disabled:opacity-50"
            >
              {loading
                ? "Creating Account..."
                : "Register"}
            </button>

          </form>

          <div className="flex items-center gap-4 my-6">

            <div className="flex-1 h-px bg-white/30"></div>

            <span className="text-sm text-gray-200">
              OR
            </span>

            <div className="flex-1 h-px bg-white/30"></div>

          </div>

          <button
            type="button"
            onClick={handleGoogleSignup}
            className="w-full bg-white text-gray-800 py-3 rounded-xl flex justify-center items-center gap-3 hover:scale-105 transition duration-300 shadow-lg"
          >

            <img
              src="https://developers.google.com/identity/images/g-logo.png"
              className="w-5 h-5"
              alt="google"
            />

            Continue with Google

          </button>

          <p className="text-center mt-6 text-gray-200">

            Already have an account?

            <Link
              to="/login"
              className="ml-2 font-bold text-white hover:underline"
            >
              Login
            </Link>

          </p>

        </div>

      </div>
    </>
  );
}

export default Register;