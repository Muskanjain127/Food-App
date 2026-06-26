import axios from "axios";
import { useEffect, useState, useRef } from "react";
import defaultpic from "../src/assets/profilepic.jpeg";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { Navbar } from "./footer";

export function Homepage() {
  const navigate = useNavigate();
  const [videos, setvideos] = useState([]);
  const [loading, setloading] = useState(true);

  useEffect(() => {
    const fooditems = async () => {
      try {
        const res = await axios.get(`https://food-webapp-6n6a.onrender.com/fooditem/user/showfooditem`||
          "http://localhost:5000/fooditem/user/showfooditem",
          { withCredentials: true }
        );
        console.log("daata", res.data);
        setvideos(res.data);
        setloading(false);
      } catch (err) {
        setloading(false);
        console.log("failed to fatch food item", err);
      }
    };
    fooditems();
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center bg-[#020617]">
        <div className="relative flex items-center justify-center">
          <div className="absolute h-32 w-32 bg-indigo-500/20 blur-[50px] rounded-full animate-pulse"></div>
          <div className="h-20 w-20 rounded-full border-4 border-indigo-500/10 border-t-indigo-500 border-b-indigo-500 animate-spin"></div>
        </div>
        <p className="text-indigo-400 font-medium mt-3 tracking-[0.3em] text-xs uppercase animate-pulse text-center">
          Loading Reels
        </p>
        <Navbar />
      </div>
    );
  }

  return (
    <div className="flex justify-center min-h-screen bg-black">
      {/* Fixed REELS label */}
      <div
        style={{
          position: "fixed",
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

      <div
        className="reelcontainer w-full max-w-sm"
        style={{
          height: "100dvh",           
          overflowY: "scroll",        
          scrollSnapType: "y mandatory",
          scrollBehavior: "smooth",
          msOverflowStyle: "none",    
          scrollbarWidth: "none",     
        }}
      >
        {videos && videos.length > 0 ? (
          videos.map((video, index) => (
            <div
              className="reel relative w-full"
              key={index}
              style={{
                height: "100dvh",         
                scrollSnapAlign: "start",
                scrollSnapStop: "always",
                flexShrink: 0,
              }}
            >
              <video
                src={video.video}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                autoPlay
                loop
                muted
              />
              <div
                style={{
                  position: "absolute",
                  bottom: "40px", 
                  left: "12px",
                  color: "white",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0px",
                  zIndex: 100,
                }}
              >
                <div style={{ fontSize: "13px", textShadow: "1px 1px 2px black" }}>
                  <Link to={`/foodpartner/${video?.foodpartner?._id}`}>
                    <div className="flex text-white mb-0 gap-2">
                      <img
                        src={video.foodpartner?.profilepic ? video.foodpartner.profilepic : defaultpic}
                        className="h-8 w-9 mb-0 rounded-full object-fit"
                      />
                      <div className="mt-2 text-white mb-1">{video.foodpartner?.username}</div>
                    </div>
                    <div className="text-white"> Name: {video.foodpartner?.name}</div>
                    <div className="text-white"> Price: {video.price}</div>
                    <div className="text-white" style={{ opacity: "0.8", maxHeight: "20px", overflow: "hidden" }}>
                      description: {video.description}
                    </div>
                  </Link>
                </div>
                <div className="flex gap-3 mb-0">
                  <Link to={`/foodpartner/${video?.foodpartner?._id}`}>
                    <button className="flex-1 border bg-blue-500 text-white hover:bg-red-50 py-1 px-4 !rounded-2xl font-medium transition-all active:scale-95 shadow-md ml-1 mt-1">
                      See Profile
                    </button>
                  </Link>
                  <Link to={`/item/order/${video._id}`}>
                    <button className="flex-1 border bg-green-700 text-white hover:bg-red-50 py-1 px-4 !rounded-2xl font-medium transition-all active:scale-95 shadow-md ml-1 mt-1">
                      Order Item
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center border-t border-gray-800 mt-20 pt-10 text-white">
            No Reels to watch
          </div>
        )}

        <Navbar />
      </div>

      <style>{`
        .reelcontainer::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
