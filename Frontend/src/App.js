import React, { useState, useCallback } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

import "./App.css";
import { NavBar } from "./Components/NavBar";
import { Landing } from "./Pages/Landing";
import { Transactions } from "./Pages/Transactions";
import { LoginPage } from "./Pages/LoginPage"
import {RegisterPage} from "./Pages/RegisterPage"
import {AuthContext} from './Context/auth-context'
const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = useCallback(() => {
    setIsLoggedIn(true);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
  }, []);

  let routes; 

  if(isLoggedIn){
    routes = (
    <React.Fragment>
      <Route path="/" exact>
        <Landing />
      </Route>
      <Route path="/:userID/transactions" exact>
          <Transactions />
      </Route>
      <Redirect to="/" />
    </React.Fragment>
    );
  } else {
    routes = (
    <React.Fragment>
      <Route path="/" exact>
        <Landing />
      </Route>
      <Route path ="/login" exact>
        <LoginPage />
      </Route>
      <Route path ="/register" exact>
        <RegisterPage />
      </Route>
      <Redirect to="/login" exact/>
    </React.Fragment>
    );
  }

  return (
    <AuthContext.Provider value={{isLoggedIn: isLoggedIn, login:login, logout: logout}}>
      <Router>
        <NavBar />
        <Switch>
          {routes}
        </Switch> 
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
