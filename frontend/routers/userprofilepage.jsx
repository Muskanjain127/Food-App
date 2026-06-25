import { useParams } from "react-router-dom";

import axios from "axios";

import { useNavigate } from "react-router-dom";

import defaultpic from "../src/assets/profilepic.jpeg";

import { Navbar } from "./footer";

import { Userlogout } from "./userlogout";

import { useEffect, useState } from "react";

export function Userprofilepage() {
  const navigate = useNavigate();

  const { id } = useParams();

  const isconfirm = async (id) => {
    const confirm = window.confirm("are you sure you want to logout");

    if (confirm) {
      const performlogout = async () => {
        try {
          await axios.get("http://localhost:5000/user/logout", {
            withCredentials: true,
          });
          localStorage.removeItem("userRole");

          console.log("logout successfull");

          setTimeout(() => {
            navigate("/user/login");
          }, 1500);
        } catch (err) {
          console.log(err);
        }
      };

      performlogout();
    }
  };

  const [user, setuser] = useState([]);

  useEffect(() => {
    const fetchuser = async () => {
      const userr = await axios.get(
        `http://localhost:5000/user/profile/${id}`,

        {
          withCredentials: true,
        },
      );

      console.log("user", userr.data);

      setuser(userr.data.user);
    };

    fetchuser();
  }, []);

  return (
    <div className="flex justify-center min-h-screen bg-gradient-to-br from-red-200 via-blue-200 to-green-200">
      <div className="w-full max-w-sm bg-gradient-to-br from-red-200 via-blue-200 to-green-200 overflow-hidden border-x border-black min-h-screen">
        <div className="flex justify-center p-8 pt-8 pb-2  ">
          <div className="relative w-32 h-32">
            <img
              src={
                user.profilepic && user.profilepic.trim() !== ""
                  ? user.profilepic
                  : defaultpic
              }
              alt="Profile Picture"
              className="w-full h-full rounded-full bg-gray-300 border-4 border-white shadow-lg object-cover"
              onError={(e) => {
                e.target.src = defaultpic;
              }}
            />
          </div>
        </div>

        <div className="px-3 pt-2 mt-1 pb-2 text-center text-sm">
          <h2 className="text-2xl font-bold text-gray-800 mb-1 capitalize">
            Username:
          </h2>
          <p className="text-blue-500 font-medium mb-4">@{user.username}</p>

          <div className="space-y-3 mt-4 text-left bg-gray-200 p-4 rounded-xl mx-2">
            <div className="flex items-center text-gray-600">
              <span className="font-semibold w-20">Name:</span>
              <span className="truncate">{user.name}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <span className="font-semibold w-20">Email:</span>
              <span className="truncate">{user.email}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <span className="font-semibold w-20">Phoneno:</span>
              <span className="truncate">{user.phoneno}</span>
            </div>
          </div>
        </div>

        <div className="flex rounded-2xl gap-2 m-2 mb-3 justify-center">
          <button
            className="flex-1 !rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 rounded-full font-medium transition-all active:scale-95 text-sm !ml-3 shadow-md mt-1"
            onClick={() =>
              navigate(`/user/edit/profile/${user._id}`, { state: { user } })
            }
          >
            Edit Profile
          </button>
          <button
            className="flex-1 border !rounded-2xl bg-amber-100 text-red-600 hover:bg-red-50 py-2.5 rounded-full font-medium transition-all active:scale-95 shadow-md !mr-3 mt-1"
            onClick={() => isconfirm(id)}
          >
            Logout
          </button>
        </div>

        <Navbar />
      </div>
    </div>
  );
}
