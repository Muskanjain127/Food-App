import { useEffect } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
export function Foodpartnerlogout() {
  const navigate = useNavigate();
  useEffect(() => {
    const performlogout = async () => {
      try { 
        await axios.get`https://food-webapp-6n6a.onrender.com/foodpartner/logout`||
          ("http://localhost:5000/foodpartner/logout");
        console.log("logout successfull");
        localStorage.removeItem("partnerRole");

        setTimeout(() => {
          navigate("/foodpartner/login");
        }, 2000);
      } catch (err) {
        console.log(err);
      }
    };
    performlogout();
  }, []);

  return (
    <>
      <h1>foodpartner loged out successfully</h1>
    </>
  );
}
