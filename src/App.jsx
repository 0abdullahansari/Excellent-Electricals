import { useEffect, useState } from "react";
import "./App.css";
import Topbar from "./components/Topbar";
import Home from "./components/Home";
import Cart from "./components/Cart";
import Signup from "./components/Signup";
import Payment from "./components/Payment";
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
    // will only run once when the app component loads...

    auth.onAuthStateChanged((authUser) => {
      console.log("THE USER IS >>> ", authUser);

      if (authUser) {
        // the user just logged in / the user was logged in

        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        // the user is logged out
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
          <Route path="/signup" element={<><Signup/></>}/>
          <Route path="/payment" element={<><Topbar/><Payment/></>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
