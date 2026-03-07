import { useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { useState } from "react";
export function Userlogin() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const navigate = useNavigate();
  const emailref = useRef();
  const passwordref = useRef();
  async function handleonsubmit(e) {
    e.preventDefault();
    console.log("clicked");
    const email = emailref.current.value;
    const password = passwordref.current.value;

    const user = await axios.post(
      "http://localhost:5000/user/login",
      {
        email,
        password: password,
      },
      { withCredentials: true },
    );
    ((emailref.current.value = ""), (passwordref.current.value = ""));
    navigate("/user/home");
  }

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 via-black-500 to-pink-500 p-3">
        {/* Main Card */}
        <div className="bg-white/20 backdrop-blur-lg border border-white/30 px-4 rounded-3xl shadow-2xl w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-6 mt-4">
            <h1 className="text-4xl font-extrabold text-white tracking-tight">
              Welcome Back
            </h1>
            <p className="text-white/80 text-sm mt-2">
              Please user login to your account
            </p>
          </div>

          <form
            onSubmit={(e) => {
              handleonsubmit(e);
            }}
            className="space-y-5"
          >
            {/* Email Input */}
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

            {/* Password Input */}
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

            {/* Buttons Container */}
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
              href="/user/register"
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
