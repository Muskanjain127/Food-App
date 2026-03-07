import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { React } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Userlogin } from "../routers/userlogin";
import { Foodpartnerlogin } from "../routers/foodpartnerlogin";
import { Useregister } from "../routers/userregister";
import { Foodpartneregister } from "../routers/foodpartnerregister";
import { Userlogout } from "../routers/userlogout";
import { Foodpartnerlogout } from "../routers/foodpartnerlogout";
import { Homepage } from "../routers/homepage";
import { Addfooditem } from "../routers/addfooditem";
import { Partnerprofile } from "../routers/foodpartnerprofilepage";
import { Orderedfoodlist } from "../routers/orderedfooditems";
import { Searching } from "../routers/searching";
import { Userprofilepage } from "../routers/userprofilepage";
import { Partnerhome } from "../routers/foodpartnerhome";
import { Editpartner } from "../routers/editpartner";
import { Edituserprofile } from "../routers/edituserprofile";
import { Partnerselfprofile } from "../routers/partnerselfprofile";
import { Orders } from "../routers/orders";
import { Itemorderpage } from "../routers/itemorderpage";
import { Updateitem } from "../routers/updateitem";
import { Defaulthome } from "../routers/defaulthome";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Defaulthome></Defaulthome>} />/
        <Route path="/foodpartner/orders" element={<Orders></Orders>} />/
        <Route path="/user/home" element={<Homepage></Homepage>} />
        <Route path="/user/register" element={<Useregister></Useregister>} />
        <Route path="/user/login" element={<Userlogin />} />
        <Route
          path="/foodpartner/register"
          element={<Foodpartneregister></Foodpartneregister>}
        />
        <Route
          path="/foodpartner/login"
          element={<Foodpartnerlogin></Foodpartnerlogin>}
        />
        <Route path="/search" element={<Searching></Searching>} />
        <Route path="/add/fooditem" element={<Addfooditem></Addfooditem>} />
        <Route path="/user/logout" element={<Userlogout />} />
        <Route
          path="/foodpartner/logout"
          element={<Foodpartnerlogout></Foodpartnerlogout>}
        />
        <Route
          path="/foodpartner/edit/profile/:id"
          element={<Editpartner></Editpartner>}
        />
        <Route
          path="/user/edit/profile/:id"
          element={<Edituserprofile></Edituserprofile>}
        />
        <Route
          path="/user/profile/:id"
          element={<Userprofilepage></Userprofilepage>}
        />
        <Route
          path="/foodpartner/profile/:id"
          element={<Partnerselfprofile />}
        />
        <Route
          path="/orderedfood"
          element={<Orderedfoodlist></Orderedfoodlist>}
        />
        <Route
          path="/foodpartner/:id"
          element={<Partnerprofile></Partnerprofile>}
        />
        <Route
          path="/item/order/:foodid"
          element={<Itemorderpage></Itemorderpage>}
        />
        <Route path="/foodpartner/search" element={<Searching></Searching>} />
        <Route
          path="/fooditem/edit/:foodid"
          element={<Updateitem></Updateitem>}
        />
        <Route path="/foodpartner/home" element={<Partnerhome></Partnerhome>} />
      </Routes>
    </Router>
  );
}

export default App;
