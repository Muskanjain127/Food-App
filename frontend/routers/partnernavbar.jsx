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
        const partnerid = await axios.get(
          `http://localhost:5000/foodpartner/find`,
          {
            withCredentials: true,
          },
        );
        console.log(partnerid.data);
        setpartner(partnerid.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchpartnerid();
  }, []);

  return (
    <>
      <nav className="fixed bottom-0 left-0 w-full h-6 bg-white backdrop-blur-md  border-t border-zinc-800 flex items-center justify-between px-[16px] z-[100]   shadow-[0_-12px_30px_rgba(110,142,251,0.15)]">
        {" "}
        {location.pathname === "/foodpartner/home" ? (
          <IoIosHome></IoIosHome>
        ) : (
          <IoHomeOutline
            onClick={() => {
              navigate("/foodpartner/home");
            }}
          ></IoHomeOutline>
        )}
        {location.pathname === "/add/fooditem" ? (
          <IoAddCircle />
        ) : (
          <IoMdAddCircleOutline
            onClick={() => {
              navigate("/add/fooditem");
            }}
          ></IoMdAddCircleOutline>
        )}
        {location.pathname === "/foodpartner/orders" ? (
          <BsBox2Fill />
        ) : (
          <BsBox2
            onClick={() => {
              navigate("/foodpartner/orders");
            }}
          ></BsBox2>
        )}
        {location.pathname === `/foodpartner/profile/${partner._id}` ? (
          <FaUser />
        ) : (
          <FaRegUserCircle
            onClick={() => {
              navigate(`/foodpartner/profile/${partner._id}`);
            }}
          ></FaRegUserCircle>
        )}
      </nav>
    </>
  );
}
