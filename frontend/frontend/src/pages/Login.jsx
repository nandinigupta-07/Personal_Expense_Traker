import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login(){

  const navigate = useNavigate();

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [error,setError] = useState("");

  const handleLogin = async (e)=>{

    e.preventDefault();

    setError("");

    try{

      const res = await fetch("http://localhost:3000/api/auth/login",{

        method:"POST",

        headers:{
          "Content-Type":"application/json"
        },

        body:JSON.stringify({
          email,
          password
        })

      });

      const data = await res.json();

      if(res.ok){

        localStorage.setItem("token",data.token);

        navigate("/dashboard");

      }else{

        setError(data.message || "Invalid email or password");

      }

    }catch(err){

      setError("Server error");

    }

  };

  return(

    <div className="flex items-center justify-center min-h-screen bg-gray-100">

      <div className="bg-white p-8 rounded-xl shadow w-96">

        <h2 className="text-3xl font-bold text-center mb-6">
          Login
        </h2>

        {error && (
          <div className="bg-red-100 text-red-600 p-2 mb-4 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">

          <input
            type="email"
            placeholder="Email"
            className="w-full border p-3 rounded"
            onChange={(e)=>setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border p-3 rounded"
            onChange={(e)=>setPassword(e.target.value)}
          />

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-600"
          >
            Login
          </button>

        </form>

        <p className="text-center mt-4">

          Don't have account?

          <Link to="/register" className="text-blue-500 ml-1">
            Register
          </Link>

        </p>

      </div>

    </div>

  )

}

export default Login;