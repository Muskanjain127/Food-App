import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { React } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Userlogin } from "../routers/userlogin";
import ProtectedRoute from "../routers/protectedroute";
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
        <Route path="/" element={<Defaulthome></Defaulthome>} />
        <Route path="/foodpartner/orders" element={<ProtectedRoute role='partner'><Orders></Orders></ProtectedRoute>}/>/
        <Route path="/user/home" element={<ProtectedRoute role='user'><Homepage></Homepage></ProtectedRoute>} />
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
        <Route path="/search" element={<ProtectedRoute role='user'><Searching></Searching></ProtectedRoute>}/>
        <Route path="/add/fooditem" element={<ProtectedRoute role='partner'><Addfooditem></Addfooditem></ProtectedRoute>} />
        <Route path="/user/logout" element={<ProtectedRoute role='user'><Userlogout /></ProtectedRoute>} />
        <Route
          path="/foodpartner/logout"
          element={<ProtectedRoute role='partner'><Foodpartnerlogout></Foodpartnerlogout></ProtectedRoute>}
        />
        <Route
          path="/foodpartner/edit/profile/:id"
          element={<ProtectedRoute role='partner'><Editpartner/></ProtectedRoute>}
        />
        <Route
          path="/user/edit/profile/:id"
          element={<ProtectedRoute role='user'><Edituserprofile></Edituserprofile></ProtectedRoute>}
        />
        <Route
          path="/user/profile/:id"
          element={<ProtectedRoute role='user'><Userprofilepage></Userprofilepage></ProtectedRoute>}
        />
        <Route
          path="/foodpartner/profile/:id"
          element={<ProtectedRoute role='partner'><Partnerselfprofile /></ProtectedRoute>}
        />
        <Route
          path="/orderedfood"
          element={<ProtectedRoute role='user'><Orderedfoodlist></Orderedfoodlist></ProtectedRoute>}
        />
        <Route
          path="/foodpartner/:id"
          element={<ProtectedRoute role='user'><Partnerprofile></Partnerprofile></ProtectedRoute>}
        />
        <Route
          path="/item/order/:foodid"
          element={<ProtectedRoute role='user'><Itemorderpage></Itemorderpage></ProtectedRoute>}
        />
        <Route path="/foodpartner/search" element={<ProtectedRoute role='user'><Searching></Searching></ProtectedRoute>} />
        <Route
          path="/fooditem/edit/:foodid"
          element={<ProtectedRoute role='partner'><Updateitem></Updateitem></ProtectedRoute>}
        />
        <Route path="/foodpartner/home" element={<ProtectedRoute role='partner'><Partnerhome></Partnerhome></ProtectedRoute>}/>
      </Routes>
    </Router>
  );
}

export default App;
