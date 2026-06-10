import axios from "axios";
import { useEffect, useState } from "react";
import defaultpic from "../src/assets/profilepic.jpeg";

import { IoBagCheckSharp } from "react-icons/io5";
import { useNavigate } from "react-router";
import { IoIosHome } from "react-icons/io";
import { Link } from "react-router-dom";
import { Navbar } from "./footer";
export function Homepage() {
  const navigate = useNavigate();

  const [videos, setvideos] = useState([]);
  const [loading, setloading] = useState(true);
  useEffect(() => {
    const fooditems = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/fooditem/user/showfooditem",
          { withCredentials: true },
        );
        console.log("daata", res.data);
        setvideos(res.data);
        setloading(!loading);
      } catch (err) {
        setloading(!loading);

        console.log("failed to fatch food item", err);
      }
    };
    fooditems();
  }, []);
  if (loading) {
    return (
      <>
        <div className="fixed inset-0 flex flex-col items-center justify-center bg-[#020617] ">
          <div className="relative flex items-center justify-center">
            <div className="absolute h-32 w-32 bg-indigo-500/20 blur-[50px] rounded-full animate-pulse"></div>

            <div className="h-20 w-20 rounded-full border-4 border-indigo-500/10 border-t-indigo-500 border-b-indigo-500 animate-spin"></div>

            <div className="absolute h-12 w-12 rounded-full border-4 border-slate-800 border-l-indigo-400 border-r-indigo-400 animate-[spin_1.5s_linear_infinite_reverse]"></div>
          </div>

          <p className=" text-indigo-400 font-medium mt-3 tracking-[0.3em] text-xs uppercase animate-pulse text-center">
            Loading Reels
          </p>
        </div>{" "}
        <Navbar></Navbar>
      </>
    );
  }

  return (
    <>
      <div
        className="reelcontainer"
        style={{
          height: "96vh",
          overflow: "scroll",
          scrollSnapType: "y mandatory",
        }}
      >
        {videos && videos.length > 0 ? (
          videos.map((video, index) => (
            <div
              className="reel"
              key={index}
              style={{ height: "100vh", scrollSnapAlign: "start" }}
            >
              <div
                style={{
                  position: "absolute",
                  top: "20px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  color: "white",
                  fontSize: "18px",
                  fontWeight: "bold",
                  letterSpacing: "2px",
                  zIndex: 100,
                  textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
                }}
              >
                REELS
              </div>
              <video
                src={video.video}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                autoPlay
                loop
              />
              <div
                style={{
                  position: "absolute",
                  bottom: "35px",
                  left: "12px",
                  color: "white",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0px",

                  zIndex: 100,
                }}
              >
                <div 
                  style={{fontSize: "13px", textShadow: "1px 1px 2px black" }}
                >
                  <Link to={`/foodpartner/${video?.foodpartner?._id}`}>
                    {" "}
                    <div className="flex text-white mb-0 gap-2">
                      <img
                        src={
                          video.foodpartner.profilepic
                            ? video.foodpartner.profilepic
                            : defaultpic
                        }
                        className="h-8 w-9 mb-0 rounded-full object-fit "
                      />
                      <div className="mt-2 text-white mb-0">
                        {" "}
                        {video.foodpartner.username}
                      </div>
                    </div>
                    <div className="text-white"> Name:{video.foodpartner.name}</div>
                    <div className="text-white"> Price:{video.price}</div>
                    <div className="text-white"
                      onClick={(e) => {
                        const target = e.currentTarget;
                        if (target.style.whiteSpace === "nowwrap") {
                          target.style.whiteSpace === "normal";
                          target.style.maxHeight = "none";
                        } else {
                          target.style.maxHeight === "nowwrap";
                          target.style.maxHeight = "20px";
                        }
                      }}
                      style={{
                        opacity: "0.8",
                        maxHeight: "20px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        cursor: "pointer",
                        transition: "max-height 0.3s ease",
                      }}
                    >
                      {" "}
                      description:{video.description}
                    </div>
                  </Link>
                </div>

                <div className="flex gap-1 my-1">
                  <Link to={`/foodpartner/${video?.foodpartner?._id}`}>
                  
                    <button className="flex-1 border bg-blue-500  text-white hover:bg-red-50  py-1 px-4 !rounded-2xl font-medium transition-all active:scale-95 shadow-md ml-1 mt-1">
                      See Profile
                    </button>
                  </Link>
                  <Link to={`/item/order/${video._id}`}>
                    <button className="flex-1 border bg-green-700  text-white hover:bg-red-50  py-1 px-4 !rounded-2xl font-medium transition-all active:scale-95 shadow-md ml-1 mt-1">
                      Order Item
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="min-h-[96vh] bg-gradient-to-b from-[#061612] to-[#020807] text-emerald-50 max-w-lg mx-auto">
            <div className="p-4 border-b border-white">
              <div className="relative">
                <h2 className="text-center">Reels</h2>
              </div>
            </div>
            <div className="text-center mt-20 text-white-500 text-sm">
              No Reels to watch
            </div>
          </div>
        )}
        <Navbar></Navbar>
      </div>
    </>
  );
}
