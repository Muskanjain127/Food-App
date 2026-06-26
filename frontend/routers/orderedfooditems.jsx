import axios from "axios";
import { useEffect, useState } from "react";
import { Navbar } from "./footer";

export function Orderedfoodlist() {
  const [loading, setloading] = useState(true);
  const [orders, setorders] = useState([]);

  const handledelete = async (id) => {
    const userconfirmed = window.confirm("Are you confirm, to cancel this order?");
    if (userconfirmed) {
      try {
        await axios.delete(`https://food-webapp-6n6a.onrender.com/fooditem/cancelorder/${id}`||`http://localhost:5000/fooditem/cancelorder/${id}`, {
          withCredentials: true,
        });
        setorders((orders) => orders.filter((item) => item._id !== id));
        alert("Order cancelled successfully");
      } catch (err) {
        console.log("error during deletion", err);
      }
    }
  };

  useEffect(() => {
    const fetchorderedfood = async () => {
      try {
        const user = await axios.get("http://localhost:5000/user/find", { withCredentials: true });
        const res = await axios.get(`http://localhost:5000/fooditem/orderedfood/${user.data._id}`, {
          withCredentials: true,
        });
        setorders(res.data);
      } catch (err) {
        console.log("err ordered food", err);
      } finally {
        setloading(false);
      }
    };
    fetchorderedfood();
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center bg-[#020617]">
        <div className="h-20 w-20 rounded-full border-4 border-indigo-500/10 border-t-indigo-500 animate-spin"></div>
        <p className="text-indigo-400 mt-3 tracking-[0.2em] text-xs uppercase animate-pulse">Fetching orders...</p>
        <Navbar/>
      </div>
      
    );
  }

  return (
    <div className="min-h-screen bg-[#020807] text-emerald-50 flex justify-center">
      <div className="w-full max-w-sm border-x border-gray-400 p-4">
        <h2 className="text-center text-xl font-bold pb-4 border-b border-gray-400">Your Orders</h2>

        {orders.length > 0 ? (
          <div className="mt-4 space-y-4">
            {orders.map((item) => (
              <div key={item._id} className="p-4 border border-gray-700 rounded-2xl bg-[#061612]">
                <div className="flex gap-4">
                  <div className="w-24 h-28 bg-gray-800 flex-shrink-0 overflow-hidden rounded-lg">
                    <video src={item.foodid.video} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex flex-col justify-between">
                    <h5 className="font-semibold">{item.foodid.name}</h5>
                    <p className="text-green-400 text-sm">Price: ₹{item.foodid.price}</p>
                    <span className="text-blue-400 text-xs">Status: Pending</span>
                    <p className="text-red-400 text-xs">Payment: COD</p>
                  </div>
                </div>
                <button
                  className="w-full mt-4 bg-red-600 hover:bg-red-700 text-white py-2 !rounded-xl text-sm font-medium transition-all active:scale-95"
                  onClick={() => handledelete(item._id)}
                >
                  Cancel Order
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center mt-20 text-gray-500">You have not ordered anything yet</div>
        )}
      </div>
      <Navbar />
    </div>
  );
}
