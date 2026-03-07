import { useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { useState } from "react";

export function Useregister() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const nameref = useRef();
  const emailref = useRef();
  const passwordref = useRef();
  const phonenoref = useRef();
  const usernameref = useRef();
  const profilepicref = useRef();

  const navigate = useNavigate();

  async function handleonsubmit(e) {
    e.preventDefault();

    console.log("clicked");
    const formdata = new FormData();
    const name = nameref.current.value;
    const username = usernameref.current.value;

    const email = emailref.current.value;
    const password = passwordref.current.value;
    const phoneno = phonenoref.current.value;
    const profilepic = profilepicref.current.files[0]
      ? profilepicref.current.files[0]
      : "";
    formdata.append("name", name);
    formdata.append("email", email);
    console.log("passssssssss", password);
    formdata.append("password", password);
    formdata.append("phoneno", phoneno);
    formdata.append("username", username);

    formdata.append("profilepic", profilepic);

    const user = await axios.post(
      "http://localhost:5000/user/register",

      formdata,

      {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      },
    );
    nameref.current.value = "";
    usernameref.current.value = "";

    usernameref.current.vaule = "";
    emailref.current.value = "";
    passwordref.current.value = "";
    profilepicref.current.value = "";

    phonenoref.current.value = "";
    navigate("/user/home");
  }
  return (
    <>
      {" "}
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-200 via-red-200 to-blue-200 p-3 font-sans">
        {/* Dark Theme Card */}
        <div className="bg-[#1e293b] p-4 rounded-3xl shadow-2xl w-full max-w-lg border bg-gradient-to-br from-purple-200 via-red-200 to-blue-200">
          {/* Title */}
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-extrabold text-white">
              Create <span className="text-blue-500">Account</span>
            </h2>
            <p className="text-gray-400 mt-2 text-sm">
              Join us and start your journey
            </p>
          </div>

          <form
            onSubmit={(e) => {
              handleonsubmit(e);
            }}
            className="grid grid-cols-1 md:grid-cols-2 mx-[1px] gap-3"
          >
            {/* Full Name */}
            <div className="md:col-span-1">
              <label className="text-black-300 text-xs font-semibold uppercase ml-1">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                ref={nameref}
                placeholder="John Doe"
                className="w-full mt-1 px-3 py-3 border-2 border-amber-50 rounded-xl text-black focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                required
              />
            </div>

            {/* Username */}
            <div className="md:col-span-1">
              <label className="text-black-300 text-xs font-semibold uppercase ml-1">
                Username
              </label>
              <input
                type="text"
                name="username"
                ref={usernameref}
                placeholder="john_123"
                className="w-full mt-1 px-3 py-3  border-2 border-amber-50 rounded-xl text-black focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                required
              />
            </div>

            {/* Phone Number */}
            <div className="md:col-span-1">
              <label className="text-black-300 text-xs font-semibold uppercase ml-1">
                Phone No.
              </label>
              <input
                type="tel"
                name="phone"
                ref={phonenoref}
                placeholder="+91 0000000000"
                className="w-full mt-1 px-3 py-3  border-2 border-amber-50 rounded-xl text-black focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                required
              />
            </div>

            {/* Email */}
            <div className="md:col-span-1">
              <label className="text-black-300 text-xs font-semibold uppercase ml-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                ref={emailref}
                placeholder="john@example.com"
                className="w-full mt-1 px-3 py-3  border-2 border-amber-50 rounded-xl text-black focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                required
              />
            </div>

            {/* Profile Pic (Optional) */}
            <div className="md:col-span-2">
              <label className="text-black-300 text-xs font-semibold uppercase ml-1">
                Profile Picture (Optional)
              </label>
              <input
                type="file"
                name="profilePic"
                ref={profilepicref}
                className="w-full mt-1 px-2 py-2  border-2  border-amber-50 rounded-xl text-black file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-500 file:text-black hover:file:bg-blue-600 cursor-pointer"
              />
            </div>

            {/* Password */}
            <div className="md:col-span-2 relative">
              <label className="textblack-300 text-xs font-semibold uppercase ml-1">
                Password
              </label>
              <input
                type={isPasswordVisible ? "text" : "password"}
                name="password"
                ref={passwordref}
                placeholder="••••••••"
                className="w-full mt-1 px-3 py-3  border-2 border-amber-50 rounded-xl text-black focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                required
              />
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

            {/* Buttons */}
            <div className="md:col-span-2 flex flex-col gap-3 mt-2">
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 !rounded-xl border-radius-0
               shadow-lg shadow-blue-500/30 transition-all active:scale-95"
              >
                Sign Up
              </button>
              <button
                type="button"
                onClick={() => {
                  navigate(-1);
                }}
                className="w-full bg-transparent border-2 border-amber-50 text-gray-700 font-semibold py-3 !rounded-xl hover:bg-gray-800 transition-all active:scale-95"
              >
                Cancel
              </button>
            </div>
          </form>

          <p
            className=" text-black-500 mt-3
           text-[13px] mb-0 "
          >
            Already have an account?{" "}
            <a
              href="/foodpartner/login"
              className="text-blue-500 font-bold cursor-pointer hover:underline"
            >
              Log In
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
