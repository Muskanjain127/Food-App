import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router";

export function Userlogout() {
  const navigate = useNavigate();
  useEffect(() => {
    const performlogout = async () => {
      try {
        await axios.get(`https://food-webapp-6n6a.onrender.com/user/logout`||"http://localhost:5000/user/logout", {
          withCredentials: true,
        });
            console.log("after removal:", localStorage.getItem("userRole")); 

        setTimeout(() => {
          navigate("/user/login");
        }, 2000);


        console.log("logout successfull");

      } catch (err) {
        console.log(err);
      }
    };
    performlogout();
  }, []);

  return (
    <>
      <h1>user loged out successfully</h1>
    </>
  );
}
