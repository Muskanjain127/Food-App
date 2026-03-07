import { useRef } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { Partnernavbar } from "./partnernavbar";

export function Addfooditem() {
  const nameref = useRef();
  const videoref = useRef();
  const priceref = useRef();
  const descriptionref = useRef();
  const nevigate = useNavigate();
  async function handleonsubmit(e) {
    e.preventDefault();
    const formdata = new FormData();

    const name = nameref.current.value;
    const price = priceref.current.value;
    const description = descriptionref.current.value;
    const video = videoref.current.files[0];
    formdata.append("name", name);
    formdata.append("price", price);
    formdata.append("description", description);
    formdata.append("video", video);

    const fooditem = await axios.post(
      "http://localhost:5000/fooditem/foodpartner/cretaefood",
      formdata,
      {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      },
    );
    console.log("foodsent");
    nameref.current.value = "";
    descriptionref.current.value = "";
    priceref.current.value = "";
    videoref.current.value = "";
    nevigate("/foodpartner/home");
  }

  return (
    <>
      <div
        className=" bg-gradient-to-br from-red-200 via-green-200 to-blue-200 flex items-center justify-center p-3 mb-6  "
        style={{ height: "100%" }}
      >
        <div className="bg-red px-4 pt-8 pb-4   rounded-2xl border-2 border-purple-300 shadow-xl w-full max-w-md">
          <h2 className="text-3xl font-bold text-gray-800 mb-6  text-center">
            <span className="text-green-500">Add Food Item</span>
          </h2>

          <form
            onSubmit={(e) => {
              handleonsubmit(e);
            }}
            className="space-y-5"
          >
            {/* Food Name */}
            <div>
              <label className="block text-[16px] font-medium  text-grey-600 mt-4 mb-1">
                Food Name
              </label>
              <input
                type="text"
                name="foodName"
                ref={nameref}
                placeholder="e.g. Cheese Pizza"
                className="w-full px-3 py-2 border-2 border-purple-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
                required
              />
            </div>

            {/* Price */}
            <div>
              <label className="block text-[16px] font-medium text-grey-600 mb-1">
                Price (₹)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2 text-gray-500">₹</span>
                <input
                  type="number"
                  name="price"
                  ref={priceref}
                  placeholder="0.00"
                  className="w-full pl-8 pr-4 py-2 border-2 border-purple-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
                  required
                />
              </div>
            </div>
            {/* Description */}
            <div>
              <label className="block text-[16px] font-medium text-grey-600 mb-1">
                Description
              </label>
              <textarea
                name="description"
                ref={descriptionref}
                placeholder="Tell us about the ingredients..."
                className="w-full px-4 py-2 border-2 border-purple-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all h-24 resize-none"
                required
              />
            </div>
            {/*food video*/}
            <div>
              <label className="block text-[16px] font-medium text-grey-600 mb-1">
                Food Video
              </label>
              <div className="relative">
                <input
                  type="file"
                  name="video"
                  ref={videoref}
                  className="w-full pl-3 pr-4 py-2  border-2 border-purple-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 !rounded-2xl hover:bg-green-600 text-white font-semibold py-3 mb-1  transition-colors shadow-md active:transform active:scale-95"
            >
              Add Item
            </button>
            <button
              type="button"
              onClick={() => nevigate(-1)}
              className=" w-full mt-1 !rounded-2xl flex-1 bg-gray-400 hover:bg-gray-300 text-gray-700 font-semibold py-3  transition-all active:scale-95"
            >
              Cancel
            </button>
          </form>
        </div>{" "}
      </div>
      <Partnernavbar />
    </>
  );
}
