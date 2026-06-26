import { useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

export function Useregister() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  const nameref = useRef();
  const emailref = useRef();
  const passwordref = useRef();
  const phonenoref = useRef();
  const usernameref = useRef();
  const profilepicref = useRef();

  const navigate = useNavigate();

  async function handleonsubmit(e) {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage({ text: "", type: "" });

    const formdata = new FormData();
    formdata.append("name", nameref.current.value);
    formdata.append("username", usernameref.current.value);
    formdata.append("email", emailref.current.value);
    formdata.append("password", passwordref.current.value);
    formdata.append("phoneno", phonenoref.current.value);
    formdata.append("profilepic", profilepicref.current.files[0] || "");

    try {
      const response = await axios.post("https://food-webapp-6n6a.onrender.com/user/register"||"http://localhost:5000/user/register", formdata, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });      



      setMessage({ text: response.data.message || "Registered successfully!", type: "success" });
                const role=response.data.userinfo.role;
    localStorage.setItem("userRole",role);

      // Inputs clear karna
      nameref.current.value = "";
      usernameref.current.value = "";
      emailref.current.value = "";
      passwordref.current.value = "";
      phonenoref.current.value = "";
      profilepicref.current.value = "";

      setTimeout(() => navigate("/user/home"), 1500);
    } catch (err) {
      console.log(err);
      const errorMsg = err.response?.data?.message || "Something went wrong";
      setMessage({ text: errorMsg, type: "error" });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-200 via-red-200 to-blue-200 p-3 font-sans">
        <div className="bg-[#1e293b] p-4 rounded-3xl shadow-2xl w-full max-w-lg border bg-gradient-to-br from-purple-200 via-red-200 to-blue-200">
          
          {/* Message Display (Error: Red, Success: Green) */}
          {message.text && (
            <div className={`mb-4 p-3 rounded-xl text-center font-bold text-sm border ${message.type === "success" ? "bg-green-500/20 text-green-500 border-green-500" : "bg-red-500/20 text-red-500 border-red-500"}`}>
              {message.text}
            </div>
          )}

          <div className="mb-8 text-center">
            <h2 className="text-3xl font-extrabold text-white">
              Create <span className="text-blue-500">Account</span>
            </h2>
            <p className="text-gray-400 mt-2 text-sm">Join us and start your journey</p>
          </div>

          <form onSubmit={handleonsubmit} className="grid grid-cols-1 md:grid-cols-2 mx-[1px] gap-3">
            <div className="md:col-span-1">
              <label className="text-black-300 text-xs font-semibold uppercase ml-1">Full Name</label>
              <input type="text" ref={nameref} placeholder="abc" className="w-full mt-1 px-3 py-3 border-2 border-amber-50 rounded-xl text-black focus:ring-2 focus:ring-blue-500 outline-none transition-all" required />
            </div>
            <div className="md:col-span-1">
              <label className="text-black-300 text-xs font-semibold uppercase ml-1">Username</label>
              <input type="text" ref={usernameref} placeholder="abc" className="w-full mt-1 px-3 py-3 border-2 border-amber-50 rounded-xl text-black focus:ring-2 focus:ring-blue-500 outline-none transition-all" required />
            </div>
            <div className="md:col-span-1">
              <label className="text-black-300 text-xs font-semibold uppercase ml-1">Phone No.</label>
              <input type="tel" ref={phonenoref} placeholder="1234567890" className="w-full mt-1 px-3 py-3 border-2 border-amber-50 rounded-xl text-black focus:ring-2 focus:ring-blue-500 outline-none transition-all" required />
            </div>
            <div className="md:col-span-1">
              <label className="text-black-300 text-xs font-semibold uppercase ml-1">Email</label>
              <input type="email" ref={emailref} placeholder="abc" className="w-full mt-1 px-3 py-3 border-2 border-amber-50 rounded-xl text-black focus:ring-2 focus:ring-blue-500 outline-none transition-all" required />
            </div>
            <div className="md:col-span-2">
              <label className="text-black-300 text-xs font-semibold uppercase ml-1">Profile Picture (Optional)</label>
              <input type="file" ref={profilepicref} className="w-full mt-1 px-2 py-2 border-2 border-amber-50 rounded-xl text-black file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-500 file:text-black hover:file:bg-blue-600 cursor-pointer" />
            </div>
            <div className="md:col-span-2 relative">
              <label className="textblack-300 text-xs font-semibold uppercase ml-1">Password</label>
              <input type={isPasswordVisible ? "text" : "password"} ref={passwordref} placeholder="••••••••" className="w-full mt-1 px-3 py-3 border-2 border-amber-50 rounded-xl text-black focus:ring-2 focus:ring-blue-500 outline-none transition-all" required />
              <span className="absolute right-3 top-2/3 -translate-y-1/2 cursor-pointer text-xl" onClick={() => setIsPasswordVisible(!isPasswordVisible)}>
                {isPasswordVisible ? " 🙈 " : "👁️"}
              </span>
            </div>
            <div className="md:col-span-2 flex flex-col gap-3 mt-2">
              <button type="submit" disabled={isSubmitting} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 !rounded-xl shadow-lg shadow-blue-500/30 transition-all active:scale-95 flex items-center justify-center disabled:opacity-70">
                {isSubmitting ? <span className="inline-block w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : "Sign Up"}
              </button>
              <button type="button" onClick={() => navigate(-1)} className="w-full bg-transparent border-2 border-amber-50 text-gray-700 font-semibold py-3 !rounded-xl hover:bg-gray-800 transition-all">Cancel</button>
            </div>
          </form>
          <p className="text-black-500 mt-3 text-s mb-0 text-center">
            Already have an account? <a href="/foodpartner/login" className="text-blue-500 font-bold cursor-pointer hover:underline">Log In</a>
          </p>
        </div>
      </div>
    </>
  );
}
