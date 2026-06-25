import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { Partnernavbar } from "./partnernavbar";
export function Partnerhome() {
  const navigate = useNavigate();
  const [partneritems, setpartneritems] = useState([]);
  const [loading, setloading] = useState(true);
  const [partnerdata, setpartnerdata] = useState([]);

  const handleondeletepartnerhome = async (foodid, partnerid) => {
    console.log("clicked");

    const confirm = window.confirm(
      "are you sure you want to delete this food item?",
    );
    if (confirm) {
      try {
        await axios.delete(
          `http://localhost:5000/fooditem/delete/${partnerid}/${foodid}`,
          { withCredentials: true },
        );
        setpartneritems((previtems) =>
          previtems.filter((item) => item._id !== foodid),
        );
        alert("iem deleted successfully");
      } catch (err) {
        console.log("errrrrrrr", err);
      }
    }
  };

  useEffect(() => {
    const fetchpartnerid = async () => {
      try {
        const partnerid = await axios.get(
          `http://localhost:5000/foodpartner/find`,
          {
            withCredentials: true,
          },
        );

        setpartnerdata(partnerid.data);
        console.log("before fetchitem");
        const fetchitem = await axios.get(
          `http://localhost:5000/foodpartner/${partnerid.data._id}`,
          {
            withCredentials: true,
          },
        );
        setpartneritems(fetchitem.data);
        console.log(fetchitem.data, "dataaaaaaaaaaaaaaaaaaaaaaa");

        setloading(false);
      } catch (err) {
        setloading(false);

        console.log("not fetched item", err);
      }
    };
    fetchpartnerid();
  }, []);

  if (loading) {
    return (
      <>
        <div className="fixed inset-0 flex flex-col items-center justify-center bg-[#020617] z-50">
          <div className="relative flex items-center justify-center">
            <div className="absolute h-32 w-32 bg-indigo-500/20 blur-[50px] rounded-full animate-pulse"></div>

            <div className="h-20 w-20 rounded-full border-4 border-indigo-500/10 border-t-indigo-500 border-b-indigo-500 animate-spin"></div>

            <div className="absolute h-12 w-12 rounded-full border-4 border-slate-800 border-l-indigo-400 border-r-indigo-400 animate-[spin_1.5s_linear_infinite_reverse]"></div>
          </div>

          <p className=" text-indigo-400 font-medium mt-3 tracking-[0.3em] text-xs uppercase animate-pulse text-center">
            Loading Your Listed Food Items
          </p>
        </div>{" "}
        <Partnernavbar></Partnernavbar>
      </>
    );
  }
  return (
    <>
      {partneritems && partneritems.length > 0 ? (
        <div className="min-h-screen bg-[#0f172a] p-8 text-slate-200">
          <div className="mx-auto max-w-5xl">
            <header className="mb-7 flex flex-col text-center items-center justify-center border-b border-slate-700 pb-6">
              <div>
                <h1 className="text-3xl font-extrabold tracking-tight text-white">
                  Your Lised Items..
                </h1>
                <p className="mt-1 text-slate-400">Manage Your Menu...</p>
              </div>{" "}
              <div className="rounded-full bg-indigo-500/10 px-4 py-2 tex-indigo-400 border border-indigo-500/20">
                Total Items: {partneritems.length}
              </div>
            </header>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 mb-3  lg:grid-cols-3">
              {partneritems.map((items, index) => (
                <div
                  key={index}
                  className="group relaive overflow-hidden rounded-2xl bg-[#1e293b] border border-slae-700 shadow-xl transiion-all hover:border-indigo-500/50"
                >
                  <div className="relative h-44 w-full !rounded-b-2xl border-b border-slate-700 overflow-hidden">
                    <video
                      src={items.video}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="  absolute top-3   right-1 rounded-lg bg-[#0f172a]/80 px-3 py-1 ex-sm font-bold text-green-400 backdrop-blur-sm border border-slate-700">
                      ₹ {items.price}
                    </div>
                  </div>
                  <div classnamr="p-5 ">
                    <h3 className="text-xl  font-bold  text-white ml-4 mt-2 mb-1">
                      {items.name}
                    </h3>
                    <p className="text-sm  ml-4  text-slate-400 line-clamp-2 my-1">
                      {items.description}
                    </p>
                    <div className="flex gap-2 p-2">
                      <button
                        onClick={() => {
                          navigate(`/fooditem/edit/${items._id}`, {
                            state: { items },
                          });
                        }}
                        className="flex-1 !rounded-4xl bg-slate-700 px-1 py-2.5 text-sm font-bold text-green-400 transition-all hover:bg-red-500/10 hover:text-red-500 border border-transparent hover:border-red-500/50"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          handleondeletepartnerhome(items._id, partnerdata._id);
                        }}
                        className="flex-1 !rounded-4xl bg-slate-700 px-1 py-2.5 text-sm font-bold text-red-400 transition-all hover:bg-red-500/10 hover:text-red-500 border border-transparent hover:border-red-500/50"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="min-h-screen bg-[#0f172a]  text-slate-200">
          <div className="mx-auto max-w-5xl">
            <header className="mb-35 flex flex-col text-center items-center justify-center border-b border-white pb-6 p-4 ">
              <div>
                <h1 className="text-3xl font-extrabold tracking-tight text-white">
                  Your Lised Items..
                </h1>
                <p className="mt-1 text-slate-400">Manage Your Menu...</p>
              </div>{" "}
              <div className="rounded-full bg-indigo-500/10 px-4 py-2 tex-indigo-400 border border-indigo-500/20">
                Total Items: {partneritems.length}
              </div>
            </header>

            <div className="flex items-center justify-center text-center text-indigo-500">
              <div className="relative">
                <div className="text-center   text-[16px] font-bold">
                  You had not listed any item yet!
                </div>
              </div>
            </div>
          </div>
        </div>
      )}{" "}
      <Partnernavbar></Partnernavbar>
    </>
  );
}
