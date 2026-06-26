import { useNavigate } from "react-router";

import { IoBagCheckOutline } from "react-icons/io5";

import { IoIosHome } from "react-icons/io";

import { useLocation } from "react-router";

import { IoBagCheck } from "react-icons/io5";

import { FaRegUserCircle } from "react-icons/fa";

import { FaUser } from "react-icons/fa";

import { CiCirclePlus } from "react-icons/ci";

import { BsBox2 } from "react-icons/bs";

import { BsBox2Fill } from "react-icons/bs";

import { useState } from "react";

import { IoAddCircle } from "react-icons/io5";



import { IoHomeOutline } from "react-icons/io5";

import { useEffect } from "react";

import { IoMdAddCircleOutline } from "react-icons/io";



import { CgProfile } from "react-icons/cg";

import axios from "axios";

export function Partnernavbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [partner, setpartner] = useState([]);

  useEffect(() => {
    const fetchpartnerid = async () => {
      try {
        const partnerid = await axios.get(`https://food-webapp-6n6a.onrender.com/foodpartner/find`||`http://localhost:5000/foodpartner/find`, {
          withCredentials: true,
        });
        setpartner(partnerid.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchpartnerid();
  }, []);

  return (
    
    <nav className="fixed bottom-0 left-0 right-0 mx-auto w-full max-w-sm h-10 bg-white backdrop-blur-md border-t border-zinc-200 flex items-center justify-between px-6 py-2 z-[100] shadow-[0_-5px_20px_rgba(0,0,0,0.1)] ">
      
      <div className="text-xl cursor-pointer">
        {location.pathname === "/foodpartner/home" ? (
          <IoIosHome className="text-indigo-600" />
        ) : (
          <IoHomeOutline onClick={() => navigate("/foodpartner/home")} />
        )}
      </div>

      <div className="text-xl cursor-pointer">
        {location.pathname === "/add/fooditem" ? (
          <IoAddCircle className="text-indigo-600" />
        ) : (
          <IoMdAddCircleOutline onClick={() => navigate("/add/fooditem")} />
        )}
      </div>

      <div className="text-xl cursor-pointer">
        {location.pathname === "/foodpartner/orders" ? (
          <BsBox2Fill className="text-indigo-600" />
        ) : (
          <BsBox2 onClick={() => navigate("/foodpartner/orders")} />
        )}
      </div>

      <div className="text-xl cursor-pointer">
        {location.pathname === `/foodpartner/profile/${partner._id}` ? (
          <FaUser className="text-indigo-600" />
        ) : (
          <FaRegUserCircle onClick={() => navigate(`/foodpartner/profile/${partner._id}`)} />
        )}
      </div>
    </nav>
  );
}
