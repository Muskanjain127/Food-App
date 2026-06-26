import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import defaultpic from "../src/assets/profilepic.jpeg";
import { useState, useEffect } from "react";
import { Partnernavbar } from "./partnernavbar";

export function Partnerselfprofile() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [foodpartner, setfoodpartner] = useState([]);

  const handleLogout = async () => {
    const confirm = window.confirm("Are you sure you want to logout?");
    if (confirm) {
      try {
        await axios.get(`https://food-webapp-6n6a.onrender.com/foodpartner/logout`||"http://localhost:5000/foodpartner/logout", {
          withCredentials: true,
        });
        localStorage.removeItem("partnerRole"); 
        navigate("/foodpartner/login");
      } catch (err) {
        console.log("Logout failed", err);
      }
    }
  };

  useEffect(() => {
    const fetchfoodpartner = async () => {
      try {
        const partnerr = await axios.get(`https://food-webapp-6n6a.onrender.com/foodpartner/find`||`http://localhost:5000/foodpartner/find`, {
          withCredentials: true,
        });
        setfoodpartner(partnerr.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchfoodpartner();
  }, []);

  return (
    <>
      <div className="bg-gradient-to-br from-red-200 via-blue-200 to-green-200 w-full min-h-screen p-4 flex flex-col items-center justify-center pb-24">
        <div className="bg-white/40 backdrop-blur-lg rounded-3xl overflow-hidden w-full max-w-sm border border-white shadow-2xl">
          <div className="flex justify-center p-8 pb-2">
            <div className="relative w-32 h-32">
              <img
                src={foodpartner.profilepic && foodpartner.profilepic.trim() !== "" ? foodpartner.profilepic : defaultpic}
                alt="Profile"
                className="w-full h-full rounded-full bg-gray-300 border-4 border-white shadow-lg object-cover"
                onError={(e) => { e.target.src = defaultpic; }}
              />
            </div>
          </div>

          <div className="px-6 py-4 text-center">
            <h2 className="text-2xl font-bold text-gray-800">Username</h2>
            <p className="text-blue-600 font-medium mb-4">@{foodpartner.username}</p>

            <div className="space-y-3 text-left bg-white/50 p-4 rounded-xl">
              <div className="flex text-gray-700">
                <span className="font-semibold w-20">Name:</span>
                <span className="truncate">{foodpartner.name}</span>
              </div>
              <div className="flex text-gray-700">
                <span className="font-semibold w-20">Email:</span>
                <span className="truncate">{foodpartner.email}</span>
              </div>
              <div className="flex text-gray-700">
                <span className="font-semibold w-20">Phone:</span>
                <span className="truncate">{foodpartner.phoneno}</span>
              </div>
            </div>
          </div>

          <div className="flex gap-3 p-6 pt-0">
            <button
              className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-2 !rounded-xl font-medium transition-all active:scale-95 shadow-md"
              onClick={() => navigate(`/foodpartner/edit/profile/${foodpartner._id}`, { state: { foodpartner } })}
            >
              Edit Profile
            </button>
            <button
              className="flex-1 border bg-white text-red-600 hover:bg-red-50 py-2 !rounded-xl font-medium transition-all active:scale-95 shadow-md"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
      <Partnernavbar />
    </>
  );
}
