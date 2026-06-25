import axios from "axios";
import { useState } from "react";
import { useRef } from "react";
import { useLocation } from "react-router";
import { useNavigate } from "react-router";
export function Editpartner() {
  const nameref = useRef();
  const emailref = useRef();
  const passwordref = useRef();
  const phonenoref = useRef();
  const usernameref = useRef();
  const profilepicref = useRef();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  console.log(location.state?.foodpartner);
  const olddata = location.state?.foodpartner;

  const navigate = useNavigate();
  async function handleonsubmit(e) {
    e.preventDefault();
    setLoading(true);
    console.log("clicked");
    const formdata = new FormData();
    const name = nameref.current.value;
    const username = usernameref.current.value;

    const email = emailref.current.value;
    const profilepic = profilepicref.current.files[0];

    const phoneno = phonenoref.current.value;
    formdata.append("name", name);
    formdata.append("email", email);
    formdata.append("phoneno", phoneno);
    if (profilepic) {
      formdata.append("profilepic", profilepic);
    }
    formdata.append("username", username);
    const id = olddata._id;
    const foodpartner = await axios.post(
      `http://localhost:5000/foodpartner/edit/profile/${id}`,

      formdata,
      {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      },
    );
    nameref.current.value = "";
    usernameref.current.value = "";
    emailref.current.value = "";
    profilepicref.current.value = "";

    phonenoref.current.value = "";
    setLoading(false);
    navigate(`/foodpartner/profile/${olddata._id}`);
  }
  const [partner, setpartner] = useState({
    name: olddata?.name || "",

    username: olddata?.username || "",
    phoneno: olddata?.phoneno || "",

    email: olddata?.email || "",
    profilepic: olddata?.profilepic || "",
  });

  return (
    <>
      {" "}
      <div className="min-h-screen flex items-center justify-center  bg-gradient-to-br from-black-200 via-blue-200 to-black-200 p-6 font-sans">
        <div className="bg-[#1e293b] p-4 rounded-3xl shadow-2xl w-full max-w-lg border bg-gradient-to-br from-black-200 via-blue-200 to-black-200">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-extrabold text-white">
              Edit <span className="text-blue-500">Your User Account</span>
            </h2>
          </div>

          <form
            onSubmit={(e) => {
              handleonsubmit(e);
            }}
            className="grid grid-cols-1 md:grid-cols-2 gap-3"
          >
            {/* Full Name */}
            <div className="md:col-span-1">
              <label className="text-gray-300 text-xs font-semibold uppercase ml-1">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                ref={nameref}
                defaultValue={partner.name}
                placeholder="John Doe"
                className="w-full mt-1 px-3 py-3 bg-[#0f172a] border border-gray-600 rounded-xl text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                required
              />
            </div>

            {/* Username */}
            <div className="md:col-span-1">
              <label className="text-gray-300 text-xs font-semibold uppercase ml-1">
                Username
              </label>
              <input
                type="text"
                name="username"
                ref={usernameref}
                defaultValue={partner.username}
                placeholder="john_123"
                className="w-full mt-1 px-3 py-3 bg-[#0f172a] border border-gray-600 rounded-xl text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                required
              />
            </div>

            {/* Phone Number */}
            <div className="md:col-span-1">
              <label className="text-gray-300 text-xs font-semibold uppercase ml-1">
                Phone No.
              </label>
              <input
                type="tel"
                name="phone"
                defaultValue={partner.phoneno}
                ref={phonenoref}
                placeholder="+91 0000000000"
                className="w-full mt-1 px-3 py-3 bg-[#0f172a] border border-gray-600 rounded-xl text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                required
              />
            </div>

            {/* Email */}
            <div className="md:col-span-1">
              <label className="text-gray-200 text-xs font-semibold uppercase ml-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                ref={emailref}
                defaultValue={partner.email}
                placeholder="john@example.com"
                className="w-full mt-1 px-3 py-3  bg-[#0f172a] border border-gray-600 rounded-xl text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                required
              />
            </div>

            {/* Profile Pic (Optional) */}
            <div className="md:col-span-2">
              <label className="text-gray-100 text-xs font-semibold uppercase ml-1">
                Profile Picture (Optional)
              </label>
              <input
                type="file"
                name="profilePic"
                ref={profilepicref}
                className="  file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-500 file:text-black hover:file:bg-blue-600 cursor-pointer   w-full mt-1 px-2 py-2 bg-[#0f172a] border border-dashed border-gray-600 rounded-xl text-gray-400"
              />
            </div>

            {/* Buttons */}
            <div className="md:col-span-2 flex flex-col gap-3 mt-2">
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 !rounded-xl border-radius-0
               shadow-lg shadow-blue-500/30 transition-all active:scale-95"
              >
                {loading ? (
                  <span className="inline-block w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  "Save Changes"
                )}
              </button>
              <button
                type="button"
                onClick={() => {
                  navigate(-1);
                }}
                className="w-full bg-transparent border border-gray-600 text-gray-800 font-semibold py-3 !rounded-xl hover:bg-gray-800 transition-all active:scale-95"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
