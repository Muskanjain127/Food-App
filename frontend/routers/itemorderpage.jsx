import { useNavigate, useParams } from "react-router";
import { useState, useEffect } from "react";
import axios from "axios";
import { Navbar } from "./footer";

export function Itemorderpage() {
  const navigate = useNavigate();
  const { foodid } = useParams();
  const [fooditem, setfooditem] = useState({});
  const [loading, setLoading] = useState(false); 

  const orderconfirm = async (foodid) => {
    setLoading(true); 
    try {
      const user = await axios.get(`https://food-webapp-6n6a.onrender.com/user/find`||"http://localhost:5000/user/find", { withCredentials: true });
      
      await axios.post(`https://food-webapp-6n6a.onrender.com/fooditem/ordered//${foodid}`||
        `http://localhost:5000/fooditem/ordered/${foodid}`,
        { user: user.data._id },
        { withCredentials: true }
      );
      
      alert("Order confirmed!");
      navigate("/orderedfood");
    } catch (err) {
      console.log("failed to order item", err);
    } finally {
      setLoading(false); 
    }
  };

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const item = await axios.get( `https://food-webapp-6n6a.onrender.com/fooditem/order/${foodid}`||`http://localhost:5000/fooditem/order/${foodid}`, { withCredentials: true });
        setfooditem(item.data);
      } catch (err) {
        console.log("failed to load item", err);
      }
    };
    fetchdata();
  }, [foodid]);

  return (
    <div className="flex justify-center min-h-screen bg-gray-950">
      <div className="w-full max-w-sm bg-gray-900 text-white min-h-screen flex flex-col border-x border-gray-800">
        
        {/* Header */}
        <div className="py-4 border-b border-gray-700 text-center">
          <h1 className="text-lg font-semibold">Order details</h1>
        </div>

        {/* Video */}
        <div className="w-full aspect-[4/3] p-4">
          <video
            src={fooditem.video}
            loop
            autoPlay
            muted
            className="w-full h-full object-cover rounded-3xl border border-gray-700"
          ></video>
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col flex-grow">
          <div className="flex justify-between items-center mb-2">
            <p className="text-green-500 font-semibold">Item Name:</p>
            <p>{fooditem.name}</p>
          </div>

          <div className="flex justify-between items-center mb-1">
            <p className="text-green-500 text-xl font-semibold">Price:</p>
            <p className="text-xl">₹{fooditem.price}</p>
          </div>
            <p className="text-green-500 text-xl font-semibold">Desrciption</p>

          <p className="text-gray-400 leading-relaxed mb-6 flex-grow">
            {fooditem.description}
          </p>

          {/* Buttons */}
          <div className="flex flex-col gap-3">
            <button
              onClick={() => orderconfirm(fooditem._id)}
              disabled={loading}
              className="w-full bg-[#76d75d] hover:bg-[#65c24d] text-black font-bold py-3 !rounded-2xl transition-all flex justify-center items-center"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
              ) : (
                "Confirm Order"
              )}
            </button>
            
            <button
              onClick={() => navigate(-1)}
              className="w-full border border-red-500 text-red-500 font-bold py-3 !rounded-2xl hover:bg-red-500/10 transition-all"
            >
              Cancel
            </button>
          </div>
        </div>
        
        <div className="pb-4"></div> 
        <Navbar />
      </div>
    </div>
  );
}
