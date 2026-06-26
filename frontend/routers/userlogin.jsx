import { useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

export function Userlogin() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); // 1. एरर के लिए स्टेट

  const navigate = useNavigate();
  const emailref = useRef();
  const passwordref = useRef();

  async function handleonsubmit(e) {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(""); 

    try {
      const user = await axios.post("https://food-webapp-6n6a.onrender.com/user/login"||
        "http://localhost:5000/user/login",
        {
          email: emailref.current.value,
          password: passwordref.current.value,
        },
        { withCredentials: true }
      );
      
      const role = user.data.user.role;
      localStorage.setItem("userRole", role);
      
      navigate("/user/home");
    } catch (err) {
     
      const msg = err.response?.data?.message || "Invalid email or password.";
      setErrorMessage(msg);
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 via-black-500 to-pink-500 p-3">
      <div className="bg-white/20 backdrop-blur-lg border border-white/30 p-6 rounded-3xl shadow-2xl w-full max-w-md">
        
        <div className="text-center mb-6">
          <h1 className="text-4xl font-extrabold text-white">Welcome Back</h1>
          <p className="text-white/80 text-sm mt-2">Please login to your account</p>
        </div>

        {/* 3. एरर मैसेज डिस्प्ले */}
        {errorMessage && (
          <div className="bg-red-500/80 text-white p-3 rounded-xl mb-4 text-sm text-center border border-white/20">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleonsubmit} className="space-y-5">
          <div className="relative">
            <label className="block text-white text-sm font-medium mb-1 ml-1">Email Address</label>
            <input
              type="email"
              ref={emailref}
              placeholder="name@example.com"
              className="w-full px-3 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50"
              required
            />
          </div>

          <div className="relative flex flex-col">
            <label className="block text-white text-sm font-medium mb-1 ml-1">Password</label>
            <input
              type={isPasswordVisible ? "text" : "password"}
              ref={passwordref}
              placeholder="••••••••"
              className="w-full px-3 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50"
              required
            />
            <span
              className="absolute right-4 top-[38px] cursor-pointer text-xl"
              onClick={() => setIsPasswordVisible(!isPasswordVisible)}
            >
              {isPasswordVisible ? "🙈" : "👁️"}
            </span>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-white text-blue-600 font-bold py-3 !rounded-xl shadow-lg hover:bg-orange-50 transition-all mb-2 active:scale-95 text-lg"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <button
            type="button"
            onClick={() => navigate(-1)}
            className="w-full bg-transparent border border-white/40 text-white font-semibold py-3 !rounded-xl hover:bg-white/10 transition-all"
          >
            Go Back
          </button>
        </form>

        <p className="text-center text-white/70 mt-4 text-[13px]">
          Don't have an account? <a href="/user/register" className="text-white font-bold hover:underline">Sign Up</a>
        </p>
      </div>
    </div>
  );
}