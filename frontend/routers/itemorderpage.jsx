import { BsChevronLeft } from "react-icons/bs";
import { useNavigate, useParams } from "react-router";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { Navbar } from "./footer";
export function Itemorderpage() {
  const navigate = useNavigate();
  const { foodid } = useParams();

  const orderconfirm = async (foodid) => {
    try {
      const user = await axios.get("http://localhost:5000/user/find", {
        withCredentials: true,
      });
      const partner = await axios.get(
        "http://localhost:5000/foodpartner/find",
        { withCredentials: true },
      );
      const item = await axios.post(
        `http://localhost:5000/fooditem/ordered/${foodid}`,
        { user: user.data._id, partner: partner.data._id },
        { withCredentials: true },
      );
      alert("order confirmed!");
      navigate("/orderedfood");
    } catch (err) {
      console.log("failed to load item", err);
    }
  };

  const [fooditem, setfooditem] = useState([]);
  useEffect(() => {
    const fetchdata = async () => {
      try {
        const item = await axios.get(
          `http://localhost:5000/fooditem/order/${foodid}`,
          { withCredentials: true },
        );
        setfooditem(item.data);
      } catch (err) {
        console.log("failed to load item", err);
      }
    };
    fetchdata();
  }, []);

  return (
    <>
      <div className="min-h-screen bg-gray-900 text-white font-sans flex flex-col">
        <div className="py-3 flex items-center text-center justify-center border-b border-white">
          <h1 className="text-lg text-center font-semibold">Order details</h1>
        </div>
        <div className="w-full h-62 p-4 pt-3 pb-1  overflow-hidden bg-gray-900">
          <video
            src={fooditem.video}
            loop
            autoPlay
            muted
            className="w-full  border-2 border-gray-100 rounded-3xl h-full object-cover"
          ></video>
        </div>
        <div className=" bg-gray-900 mt-2 ml-4 !mb-1 rounded-t-2xl p-2  pt-2 shadow-2xl">
          <div className="flex gap-16 ">
            <p className="text-green-500 mb-2  font-semibold">Item Name:</p>
            <p className="mb-2">{fooditem.name}</p>
          </div>

          <div className="flex gap-33 ">
            <p className="text-green-500 text-xl mb-1 font-semibold">Price:</p>
            <p>₹{fooditem.price}</p>
          </div>
          <p className="  text-gray-400 leading-relaxed mb-6">
            {fooditem.description}
          </p>
          <div className="flex flex-col gap-3 pr-3 mt auto">
            <button
              onClick={() => {
                orderconfirm(fooditem._id);
              }}
              className="w-full bg-[#76d75d] hover:bg-[#65c24d] text-black font-bold py-3 !rounded-3xl transition-all"
            >
              Confirm Order
            </button>
            <button
              onClick={() => {
                navigate(-1);
              }}
              className="w-full bg-transparnt border border-red-500 text-red-500 font-bold py-3 !rounded-3xl hover:bg-red-500/10 transition all mb-5"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
      <Navbar></Navbar>
    </>
  );
}
