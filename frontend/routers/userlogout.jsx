import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router";

export function Userlogout() {
  const navigate = useNavigate();
  useEffect(() => {
    const performlogout = async () => {
      try {
        await axios.get("http://localhost:5000/user/logout", {
          withCredentials: true,
        });
        console.log("logout successfull");
        setTimeout(() => {
          navigate("/user/login");
        }, 2000);
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
