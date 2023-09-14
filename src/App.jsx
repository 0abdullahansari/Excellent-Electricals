import { useEffect, useState } from "react";
import "./App.css";
import Topbar from "./Topbar";
import Home from "./Home";
import Cart from "./Cart";
import Signup from "./Signup";
import {  
  BrowserRouter as Router,  
  Routes,  
  Route,  
  Link  
}   
from 'react-router-dom';
import Login from "./Login";
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
        </Routes>
      </div>
    </Router>
  );
}

export default App;
