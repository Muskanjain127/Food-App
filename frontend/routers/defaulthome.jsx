import { useNavigate } from "react-router-dom";
import { FaUser, FaUtensils } from "react-icons/fa";

export function Defaulthome() {
  const navigate = useNavigate();
  return (
    <>
      <div className="min-h-screen  bg-[#020617] text-white ">
        <h2 className="text-4xl font-extrabold tracking-wider text-center pt-10">
          Login
        </h2>
        <div className="flex items-center justify-center mt-30">
          <div className=" p-4 rounded-xl w-80 text-center shadow-lg">
            <button
              onClick={() => navigate("/user/login")}
              className=" flex gap-2   w-full justify-center items-center  mb-3 py-2 bg-blue-500 !rounded-4xl hover:bg-blue-600 transition"
            >
              {" "}
              <FaUser />
              Login as User
            </button>

            <button
              onClick={() => navigate("/foodpartner/login")}
              className=" flex  gap-2 justify-center items-center w-full py-2 bg-green-500 !rounded-4xl hover:bg-green-600 transition"
            >
              {" "}
              <FaUtensils />
              Login as Food Partner
            </button>
          </div>
        </div>
      </div>
      );
    </>
  );
}
