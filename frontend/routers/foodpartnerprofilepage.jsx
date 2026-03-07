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
        const res = await axios.get(`http://localhost:5000/foodpartner/${id}`, {
          withCredentials: true,
        });

        console.log(res.data);

        setdata(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchvideos();
  }, [id]);

  const partner = data[0]?.foodpartner;

  return (
    <>
      <div className="min-h-screen bg-black text-white max-w-lg  mx-auto  pt-2">
        {partner && (
          <div className="flex items-center  border-b border-white gap-4 mb-1 p-3  ">
            <img
              src={partner.profilepic || defaultpic}
              className="w-20 h-20 rounded-full object-cover border-2"
            />

            <div>
              <div className="text-lg font-semibold">{partner.username}</div>
              <div className="text-gray-400">{partner.name}</div>
              <div className="text-sm mt-1">{data.length} posts</div>
            </div>
          </div>
        )}
        <div className="grid grid-cols-3 h-50">
          {data.map((item) => (
            <div
              key={item._id}
              className="relative overflow-hidden  bg-zinc-900 aspect-square pl-1"
              onClick={() => setselectedvideo(item.video)}
            >
              <video
                src={item.video}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          ))}
          {selectedvideo && (
            <div
              className="fixed inset-0 bg-black bg-opacity-90 flex items-center min-h-[80vh] justify-center z-50 "
              onClick={() => setselectedvideo(null)}
            >
              <IoArrowBack
                className="absolute top-5 left-5 text-white text-3xl cursor-pointer"
                onClick={() => setselectedvideo(null)}
              />

              <video
                src={selectedvideo}
                className="max-h-[70vh] object-contain max-w-[90vw] rounded-lg"
                autoPlay
              />
            </div>
          )}
        </div>
      </div>{" "}
      <Navbar></Navbar>{" "}
    </>
  );
}
