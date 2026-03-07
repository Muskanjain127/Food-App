import axios from "axios";
import { useEffect, useState } from "react";
import { Navbar } from "./footer";

export function Orderedfoodlist() {
  const [loading, setloading] = useState(true);
  const handledelete = async (id) => {
    const userconfirmed = window.confirm(
      "Are you confirm, to cancel this order?",
    );
    if (userconfirmed) {
      try {
        await axios.delete(`http://localhost:5000/fooditem/cancelorder/${id}`, {
          withCredentials: true,
        });
        setorders((orders) => orders.filter((item) => item._id !== id));
        alert("order canceelled successfuly");
        console.log("success");
      } catch (err) {
        console.log("error during deletion", err);
      }
    }
  };

  const [orders, setorders] = useState([]);

  useEffect(() => {
    const fetchorderedfood = async () => {
      try {
        const user = await axios.get("http://localhost:5000/user/find", {
          withCredentials: true,
        });
        const userid = user.data._id;
        const res = await axios.get(
          `http://localhost:5000/fooditem/orderedfood/${userid}`,
          {
            withCredentials: true,
          },
        );

        console.log("ordered item", res.data);
        setorders(res.data);
        setloading(!loading);
        console.log(orders);
      } catch (err) {
        setloading(!loading);
        console.log("err ordered food", err);
      }
    };
    fetchorderedfood();
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
            Fetching you ordered Food..
          </p>
        </div>{" "}
        <Navbar></Navbar>
      </>
    );
  }

  return (
    <>
      {" "}
      <div className="min-h-screen bg-gradient-to-b from-[#061612] to-[#020807] text-emerald-50 max-w-lg mx-auto mb-0">
        <div className="p-4 border-b border-gray-500">
          <div className="relative">
            <h2 className="text-center">Your Orders</h2>
          </div>
        </div>

        {orders && orders.length > 0 ? (
          orders.map((item) => (
            <div className="p-[15px]   border-2 border-gray-500 rounded-3xl mx-3  mt-3 mb-1   items-center">
              <div className="flex gap-3" key={item._id}>
                <div
                  style={{
                    width: "150px",
                    height: "120px",
                    aspectRatio: "1/1",
                    overflow: "hidden",
                    borderRadius: "8px",
                  }}
                >
                  <video
                    src={item.foodid.video}
                    style={{
                      width: "170px",
                      height: "120px",
                      objectFit: "cover",
                    }}
                    className="rounded-xl"
                  ></video>
                </div>
                <div>
                  <h5 className="m-0">{item.foodid.name}</h5>
                  <p className=" mb-0 text-green-500 font-[18px] pt-1 mx-[5px]">
                    {" "}
                    Price:₹{item.foodid.price}
                  </p>
                  <span className="text-blue-500  !font-[12px] pb-0 py-[1px]">
                    Status:pending
                  </span>
                  <p className="text-red-500  !font-sm  px-[2px] pt-[1px]">
                    Payment :Cash On Delievery
                  </p>
                </div>
              </div>
              <button
                className="flex-1 border bg-red-400 w-200%  text-white hover:bg-red-50  py-[3px] px-[56px] !rounded-2xl font-sm transition-all active:scale-95 shadow-md ml-1 "
                onClick={() => {
                  handledelete(item._id);
                }}
              >
                Cancel Order
              </button>
            </div>
          ))
        ) : (
          <div className="text-center mt-20 text-white-500 text-sm">
            you have not ordered anything yet
          </div>
        )}
      </div>
      <Navbar></Navbar>;
    </>
  );
}
