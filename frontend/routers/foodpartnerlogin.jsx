import axios from "axios";
import { useRef, useState } from "react";
import { useNavigate } from "react-router";

export function Foodpartnerlogin() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const emailref = useRef();
  const passwordref = useRef();

  async function handlelogin(e) {
    e.preventDefault();
    setError("");
    const email = emailref.current.value;
    const password = passwordref.current.value;

    try {
      const foodpartner = await axios.post(`https://food-webapp-6n6a.onrender.com/foodpartner/login`||
        "http://localhost:5000/foodpartner/login",
        { email, password },
        { withCredentials: true }
      );
            setError(foodpartner?.message || "Login successfully");

      const role = foodpartner.data.foodpartner.role;
      localStorage.setItem("partnerRole", role);

      emailref.current.value = "";
      passwordref.current.value = "";
      navigate("/foodpartner/home");
    } catch (err) {
      setError(err.response?.data?.message || "password or Something went wrong");
    }
  }

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 via-orange-700 to-teal-500  p-3">
        <div className="bg-white/20 backdrop-blur-lg border border-white/30 px-4 rounded-3xl shadow-2xl w-full max-w-md">
          <div className="text-center mb-6 mt-4">
            <h1 className="text-4xl font-extrabold text-white tracking-tight">
              Welcome Back
            </h1>
            <p className="text-white/80 text-sm mt-2">
              Please Foodpartner login to your account
            </p>
          </div>

          {error && (
            <div className="bg-red-500/20 border border-red-500 text-white text-center py-2 rounded-xl mb-4 text-sm">
              {error}
            </div>
          )}

          <form
            onSubmit={(e) => {
              handlelogin(e);
            }}
            className="space-y-5"
          >
            {/* Email */}
            <div className="relative">
              <label className="block text-white text-sm font-medium mb-1 ml-1">
                Email Address
              </label>
              <input
                type="email"
                ref={emailref}
                placeholder="name@example.com"
                className="w-full px-3 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all shadow-inner"
                required
              />
            </div>

            {/* Password */}
            <div className="relative flex flex-col justify-center ">
              <label className="block text-white text-sm font-medium mb-1 ml-1">
                Password
              </label>
              <input
                type={isPasswordVisible ? "text" : "password"}
                id="passes"
                ref={passwordref}
                placeholder="••••••••"
                className="w-full px-3 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all shadow-inner"
                required
              />{" "}
              <span
                className="absolute right-3 top-2/3 -translate-y-1/2 cursor-pointer text-xl"
                id="eyeicon"
                onClick={() => {
                  const togglePassword = () => {
                    setIsPasswordVisible(!isPasswordVisible);
                  };
                  togglePassword();
                }}
              >
                {" "}
                {isPasswordVisible ? " 🙈 " : "👁️"}
              </span>
            </div>

            {/* Buttons  */}
            <div className="flex flex-col gap-2 mt-8">
              <button
                type="submit"
                className="w-full bg-white text-black-500 font-bold py-3 !rounded-xl shadow-lg hover:bg-orange-50 transition-all active:scale-95 text-lg"
              >
                Login
              </button>

              <button
                type="button"
                onClick={() => navigate(-1)}
                className="w-full bg-transparent border border-white/40 text-white font-semibold py-3 !rounded-xl hover:bg-white/10 transition-all active:scale-95"
              >
                Go Back
              </button>
            </div>
          </form>

          {/* Footer */}
          <p className="text-center text-white/70 !mt-4  text-[13px]">
            Don't have an account?{" "}
            <a
              href="/foodpartner/register"
              className="text-white font-bold cursor-pointer hover:underline"
            >
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
