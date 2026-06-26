import axios from "axios";
import { useState } from "react";
import { Navbar } from "./footer";
import { useNavigate } from "react-router";
import defaultpic from "../src/assets/profilepic.jpeg";

export function Searching() {
  const [input, setInput] = useState("");
  const [foodpartner, setfoodpartner] = useState([]);
  const navigate = useNavigate();

  const search = async (value) => {
    try {
      const res = await axios.post(`https://food-webapp-6n6a.onrender.com/user/searching`||
        "http://localhost:5000/user/searching",
        { searchingvalue: value },
        { withCredentials: true }
      );
      setfoodpartner(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex justify-center min-h-screen bg-black">
      <div className="w-full max-w-sm min-h-screen bg-black text-white border-x border-gray-400">
        
        {/* Search Bar */}
        <div className="p-4 border-b border-gray-400">
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                search(e.target.value); 
              }}
              className="w-full bg-[#262626] border-none rounded-lg py-2 pl-10 pr-4 text-white focus:ring-0 placeholder-gray-500"
            />
            <span className="absolute left-3 top-2.5 text-gray-500">🔍</span>
          </div>
        </div>

        {/* Results */}
        <div className="mt-2">
          {!input ? (
            <div className="text-center mt-20 text-gray-500 text-lg">
              Search FoodPartner
            </div>
          ) : foodpartner.length > 0 ? (
            foodpartner.map((partner) => (
              <div
                key={partner._id}
                onClick={() => navigate(`/foodpartner/${partner._id}`)}
                className="flex items-center justify-between px-3 py-2 active:bg-zinc-900 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <img
                    src={partner.profilepic ? partner.profilepic : defaultpic}
                    alt={partner.name}
                    className="w-10 h-10 rounded-full object-cover border border-zinc-800"
                  />
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold leading-none">
                      {partner.username}
                    </span>
                    <span className="text-sm text-gray-500 mt-1">
                      {partner.name}
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center mt-20 text-gray-500 text-sm">
              No results found.
            </div>
          )}
        </div>
        
        <Navbar />
      </div>
    </div>
  );
}
