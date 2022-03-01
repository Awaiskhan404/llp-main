import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Information from "./components/Information";
import Section9 from "./screen/Section9";
import Section2 from "./screen/Section2";
import Section1 from "./screen/Section1";
import Section4 from "./screen/Section4";
import Section3 from "./screen/Section3";
import Section5 from "./screen/Section5";
import Section6 from "./screen/Section6";
import Section8 from "./screen/Section8";
import LLP from "./API/LLP";
import * as firebase from "firebase";
import Section7 from "./screen/Section7";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Menu from "./components/Menu";
import Thankyou from './components/Thankyou'
if (firebase.default.apps.length === 0) {
  firebase.default.initializeApp(LLP);
}

function App() {
  return (
    <Router>
      <div style={{ flex: 1 }}>
        <Information />
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/signup" exact component={SignUp} />
          <Route path="/payment-information" exact component={Section2} />
          <Route path="/payment" exact component={Section1} />
          {/* <Route path="/credentials" exact component={Section9} />
          <Route path="/business_description" exact component={Section4} />
          <Route path="/categories" exact component={Section3} />
          <Route path="/cover" exact component={Section5} />
          <Route path="/keywords" exact component={Section6} />
          <Route path="/daily" exact component={Section8} />
          <Route path="/additional" exact component={Section7} /> */}
          <Route path="/menu" exact component={Menu} />
          <Route path="/payment-done" exact component={Thankyou} />
        </Switch>
      </div>
      <ToastContainer />
    </Router>
  );
}

export default App;
