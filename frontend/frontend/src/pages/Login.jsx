import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase";
import Navbar from "../components/navigation/Navbar";

// ✅ profilePic aur theme bachate hue clear karo
const safeClear = () => {
  const savedPic = localStorage.getItem("profilePic");
  const savedTheme = localStorage.getItem("theme");
  localStorage.clear();
  if (savedPic) localStorage.setItem("profilePic", savedPic);
  if (savedTheme) localStorage.setItem("theme", savedTheme);
};

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

 const handleLogin = async (e) => {
  e.preventDefault();
  setError("");

  try {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/api/auth/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      }
    );

    const data = await res.json();

    if (res.ok) {
      safeClear();
      localStorage.setItem("token", data.token);
      navigate("/dashboard");
    } else {
      setError(data.message || "Invalid email or password");
    }
  } catch (err) {
    setError("Server error");
  }
};

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      safeClear(); // ✅ localStorage.clear() ki jagah
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
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

      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 px-4 pt-24">
        <div className="w-full max-w-md bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl shadow-2xl p-8 text-white">

          <div className="text-center mb-8">
            <h2 className="text-4xl font-extrabold mb-2">Welcome Back 👋</h2>
            <p className="text-gray-200">Login to manage your finances smartly</p>
          </div>

          {error && (
            <div className="bg-red-500/20 border border-red-400 text-red-100 p-3 rounded-lg mb-4 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block mb-2 text-sm font-medium">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full p-3 rounded-xl bg-white/20 border border-white/20 placeholder-gray-200 outline-none focus:ring-2 focus:ring-white"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full p-3 rounded-xl bg-white/20 border border-white/20 placeholder-gray-200 outline-none focus:ring-2 focus:ring-white"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-white text-indigo-700 font-bold py-3 rounded-xl hover:scale-105 transition duration-300 shadow-lg"
            >
              Login
            </button>
          </form>

          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-white/30"></div>
            <span className="text-sm text-gray-200">OR</span>
            <div className="flex-1 h-px bg-white/30"></div>
          </div>

          <button
            type="button"
            onClick={handleGoogleLogin}
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
            Don't have an account?
            <Link to="/register" className="ml-2 font-bold text-white hover:underline">
              Register
            </Link>
          </p>

        </div>
      </div>
    </>
  );
}

export default Login;
