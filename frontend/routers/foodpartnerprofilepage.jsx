import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Navbar } from "./footer";
import defaultpic from "../src/assets/profilepic.jpeg";
import { IoArrowBack } from "react-icons/io5";

export function Partnerprofile() {
  const { id } = useParams();
  const [data, setdata] = useState([]);
  const [selectedvideo, setselectedvideo] = useState(null);

  useEffect(() => {
    const fetchvideos = async () => {
      try {
        const res = await axios.get(`https://food-webapp-6n6a.onrender.com/foodpartner/${id}`||`http://localhost:5000/foodpartner/${id}`, {
          withCredentials: true,
        });
        setdata(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchvideos();
  }, [id]);

  const partner = data[0]?.foodpartner;

  return (
    <div className="flex justify-center min-h-screen bg-black">
      <div className="w-full max-w-sm min-h-screen bg-black text-white border-x border-gray-800">
        {partner && (
          <div className="flex items-center border-b border-gray-700 gap-4 mb-1 p-4">
            <img
              src={partner.profilepic || defaultpic}
              className="w-20 h-20 rounded-full object-cover border-2 border-gray-600"
              alt={partner.name}
            />
            <div>
              <div className="text-lg font-semibold">{partner.username}</div>
              <div className="text-gray-400">{partner.name}</div>
              <div className="text-sm mt-1">{data.length} posts</div>
            </div>
          </div>
        )}
        <div className="grid grid-cols-3 gap-1 ">
          {data.map((item) => (
            <div
              key={item._id}
              className="relative bg-gray-900 aspect-square cursor-pointer overflow-hidden"
              onClick={() => setselectedvideo(item.video)}
            >
              <video
                src={item.video}
                className="w-full h-full object-cover hover:opacity-80 transition-opacity duration-300"
              />
            </div>
          ))}
        </div>
        {selectedvideo && (
          <div
            className="fixed inset-0 bg-black bg-opacity-95 flex items-center justify-center z-50 p-4"
            onClick={() => setselectedvideo(null)}
          >
            <IoArrowBack
              className="absolute top-5 left-5 text-white text-3xl cursor-pointer z-50"
              onClick={() => setselectedvideo(null)}
            />
            <video
              src={selectedvideo}
              className="max-h-[80vh] w-full object-contain rounded-lg"
              autoPlay
              controls
            />
          </div>
        )}
        <div className="h-16"></div> 
        <Navbar />
      </div>
    </div>
  );
}
