import axios from "axios";
import { useState } from "react";
import { Navbar } from "./footer";
import { useNavigate } from "react-router";
import defaultpic from "../src/assets/profilepic.jpeg";

export function Searching() {
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const partnerprofilepage = (id) => {
    navigate(`/foodpartner/${id}`);
  };

  const [foodpartner, setfoodpartner] = useState([]);
  const search = async (e) => {
    try {
      const currvalue = e.target.value;
      const res = await axios.post(
        "http://localhost:5000/user/searching",
        {
          searchingvalue: currvalue,
        },
        {
          withCredentials: true,
        },
      );
      setfoodpartner(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-black text-white max-w-lg mx-auto">
        {/* Search Bar Section */}
        <div className="p-4 border-b border-gray-400">
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              onChange={(e) => {
                setInput(e.target.value);

                search(e);
              }}
              className="w-full bg-[#262626] border-none rounded-lg py-2 pl-10 pr-4 text-white focus:ring-0 placeholder-gray-500"
            />
            <span className="absolute left-3 top-2.5 text-gray-500">🔍</span>
          </div>
        </div>
        {!input ? (
          <div className="text-center mt-20 text-white-500 text-lg">
            Search FoodPartner
          </div>
        ) : (
          <div className="mt-2">
            {foodpartner.length > 0 ? (
              foodpartner.map((partner) => (
                <div
                  key={partner._id}
                  onClick={() => partnerprofilepage(partner._id)}
                  className="flex items-center justify-between px-3 py-2 active:bg-zinc-900 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <img
                      src={partner.profilepic ? partner.profilepic : defaultpic}
                      alt={partner.name}
                      className=" w-10 h-10 rounded-full object-cover border border-zinc-800"
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
              <div className="text-center mt-20 text-white-500 text-sm">
                No results found for your search.
              </div>
            )}
          </div>
        )}
      </div>
      <Navbar></Navbar>
    </>
  );
}
