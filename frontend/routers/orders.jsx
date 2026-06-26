import axios from "axios";
import { useEffect, useState } from "react";
import { Partnernavbar } from "./partnernavbar";

export function Orders() {
  const [orders, setorders] = useState([]);
  const [loading, setloading] = useState([true]);
  const handleondelete = async (id) => {
    const userconfirmed = window.confirm(
      "Are you confirm, to delete this order?",
    );
    if (userconfirmed) {
      try {
        await axios.delete(`https://food-webapp-6n6a.onrender.com/fooditem/cancelorder/${id}`||`http://localhost:5000/fooditem/cancelorder/${id}`, {
          withCredentials: true,
        });
        setorders((orders) => orders.filter((item) => item._id !== id));
        alert("order deleted successfuly");
      } catch (err) {
        console.log("error during deletion", err);
      }
    }
  };

  useEffect(() => {
    const fetchorders = async () => {
      try {
        const foodpartner = await axios.get(`https://food-webapp-6n6a.onrender.com/foodpartner/find`||
          "http://localhost:5000/foodpartner/find",
          {
            withCredentials: true,
          },
        );
        const id = foodpartner.data._id;
        const res = await axios.get(`https://food-webapp-6n6a.onrender.com/fooditem/foodpartner/orders/${id}`||
          `http://localhost:5000/fooditem/foodpartner/orders/${id}`,
          {
            withCredentials: true,
          },
        );
        setorders(res.data);
        setloading(!loading);
      } catch (err) {
        setloading(!loading);

        console.log("err", err);
      }
    };
    fetchorders();
  }, []);

  if (loading == "true") {
    return (
      <>
        <div className=" min-h-screen fixed inset-0 flex flex-col items-center justify-center bg-[#020617] z-50">
          <div className="relative flex items-center justify-center">
            <div className="absolute h-32 w-32  bg-indigo-500/20 blur-[50px] rounded-full animate-pulse"></div>

            <div className="h-20 w-20 rounded-full border-4 border-indigo-500/10 border-t-indigo-500 border-b-indigo-500 animate-spin"></div>

            <div className="absolute h-12 w-12  rounded-full border-4 border-slate-800 border-l-indigo-400 border-r-indigo-400 animate-[spin_1.5s_linear_infinite_reverse]"></div>
          </div>

          <p className="!mt-3 text-indigo-400 font-medium tracking-[0.3em] text-xs uppercase animate-pulse">
            Loading Your Orders
          </p>
        </div>{" "}
        <Partnernavbar></Partnernavbar>
      </>
    );
  }
  return (
    <>
      <div className="min-h-screen bg-[#020617] text-indigo-500 flex flex-col">
        <header className=" pt-4 p-3 border-b border-white bg-[#020617]/50 backdrop-blur-md  sticky top-0 z-10">
          <div className="max-w-6xl mx-auto flex items-center justify-center">
            <div>
              <h1 className="text-3xl  font-black text-white tracking-tight">
                Your <span className="text-indigo-500">Orders</span>
              </h1>
            </div>
          </div>
        </header>

        <div className="flex min-h-[60vh] items-center justify-center  bg-[#020617] text-indigo-500">
          <div className="relative">
            {!orders || orders.length == 0 ? (
              <div className="text-center text-[30px] font-bold">
                No Orders!
              </div>
            ) : (
              <div className="min-h-[96vh] bg-[#020617] flex font-sans selecion:bg-indigo-500/30">
                <main className="flex-1  pt-2 px-2 md:p-10">
                  <div className="max-w-6xl mx-auto">
                    <div className="mb-1 flex flex-col md:flex-row md:items-cener justify-between gap-1  backdrop-blur-xl p-2 pt-0 rounded-[2rem]  shadow-2xl">
                      <div className="flex item-center border py-1 px-4 !rounded-xl border-slate-500 gap-4">
                        <div className="text-right">
                          <span className="text-medium text-slate-500 font-bold uppercase tracking-wider">
                            Orders Pending:
                          </span>
                        </div>
                        <div className="">
                          {" "}
                          <span className="block text-xl font-bold text-indigo-500 leading-none">
                            {orders.length}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className=" md:grid-cols-5 px-2 mb-2  text-xs font-black uppercase -tracking-widest text-slare-500 tracking-[0.1em]">
                      <div className="col-span-2 mt-3 mb-1">
                        customer and item details
                      </div>
                      <div className="space-y-4">
                        {orders.map((order, index) => (
                          <div
                            key={index}
                            className="group relative overflow-hidden bg-white/3 hover:bg-white/6 border border-white/5 rounded-3xl  pr-1 pb-1 p-6 transition-all duration-500 hover:shadow-[0_0_40px_-15px-rgba(99,102,241,0.3)]"
                          >
                            <div className="grid grid-cols-1 md:grid-cols-5 items-center gap-4">
                              <div className="col-span-2 flex items-center gap-3">
                                <div className="h-16 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-xl px-1 group-hover:scale-110 transitotion-transform">
                                  {" "}
                                  order
                                </div>
                                <div className="mt-2">
                                  <h3 className="!text-[16px] font-bold text-white">
                                    {order?.foodid?.name}
                                  </h3>
                                  <p className="text-sm text-slate-500 font-medium">
                                    #ordid-
                                    <span className="text-indigo-400">
                                      {index + 702}
                                    </span>
                                  </p>
                                </div>
                              </div>
                              <div className="flex flex-col gap-[2px]">
                                <span className="text-white font-bold text-lg">
                                  ₹{order?.foodid?.price}
                                </span>
                                <span className="text-[10px]  font-bold uppercase tracking-ighter">
                                  cash on delievery
                                </span>
                                <span className="text-sm  font-mono">
                                  order by:@{order?.userid?.username}
                                </span>
                                <span className="text-xsm  font-mono">
                                  customer name:{order?.userid?.name}
                                </span>

                                <span className="text-xsm font-mono">
                                  customer email:{order?.userid?.email}
                                </span>
                                <span className="text-xsm  font-mono">
                                  customer phoneno:{order?.userid?.phoneno}
                                </span>

                                <div className="flex  rounded-2xl gap-1 m-2 mb-3  justify-center">
                                  <button
                                    className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 px-1 !rounded-4xl font-medium transition-all active:scale-95 !text-[14px] ml-4 shadow-md mt-1"
                                    onClick={() => {
                                      handleondelete(order._id);
                                    }}
                                  >
                                    Delete Order
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </main>
              </div>
            )}
          </div>
        </div>
      </div>
      <Partnernavbar></Partnernavbar>
    </>
  );
}
