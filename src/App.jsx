import { useEffect, useState } from "react";
import "./App.css";
import Topbar from "./components/Topbar";
import Home from "./components/Home";
import Cart from "./components/Cart";
import Payment from "./components/Payment";
import Orders from "./components/Orders"
import {  
  BrowserRouter as Router,  
  Routes,  
  Route,  
  Link  
}   
from 'react-router-dom';
import Login from "./components/Login";
import { auth } from "./Firebase";
import { useStateValue } from "./StateProvider";

function App() {

  const [{basket, user}, dispatch] = useStateValue();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
  },[]);

  return (
    <Router>
      <div className="app">
        <Routes >
          <Route path="/" element={<><Topbar/><Home/></>}/>
          <Route path="/cart" element={<><Topbar/><Cart/></>}/>
          <Route path="/login" element={<><Login/></>}/>
          <Route path="/payment" element={<><Topbar/><Payment/></>}/>
          <Route path="/orders" element={<><Orders/></>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
