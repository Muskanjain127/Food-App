import { useNavigate } from "react-router";
import { IoBagCheckOutline } from "react-icons/io5";
import { IoIosHome } from "react-icons/io";
import { useLocation } from "react-router";
import { IoBagCheck } from "react-icons/io5";
import { FaRegUserCircle } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { IoSearchOutline } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";
import axios from "axios";
import { IoHomeOutline } from "react-icons/io5";
import { useEffect, useState } from "react";
import { CgProfile } from "react-icons/cg";

export function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setuser] = useState([]);

  useEffect(() => {
    const fetchuser = async () => {
      try {
        const userr = await axios.get(`https://food-webapp-6n6a.onrender.com/user/find`||"http://localhost:5000/user/find", {
          withCredentials: true,
        });
        setuser(userr.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchuser();
  }, []);
  return (
    <>
      <nav
        style={{
          position: "fixed",
          bottom: 2,
          zIndex: 100,
          height: "5%",
          padding: "0px 15px",
          cursor: "pointer",
        }}
        className="navbar text-black bg-white backdrop-blur-md fixed w-full max-w-sm   border-bottom border-body"
      >
        {location.pathname === "/user/home" ? (
          <IoIosHome></IoIosHome>
        ) : (
          <IoHomeOutline
            onClick={() => {
              navigate("/user/home");
            }}
          ></IoHomeOutline>
        )}
        {location.pathname === "/foodpartner/search" ? (
          <FaSearch></FaSearch>
        ) : (
          <IoSearchOutline
            onClick={() => {
              navigate("/foodpartner/search");
            }}
          ></IoSearchOutline>
        )}

        {location.pathname === "/orderedfood" ? (
          <IoBagCheck />
        ) : (
          <IoBagCheckOutline
            onClick={() => {
              navigate("/orderedfood");
            }}
          ></IoBagCheckOutline>
        )}
        {location.pathname === `/user/profile/${user?._id}` ? (
          <FaUser />
        ) : (
          <FaRegUserCircle
            onClick={() => {
              navigate(`/user/profile/${user?._id}`);
            }}
          ></FaRegUserCircle>
        )}
      </nav>
    </>
  );
}
