import React, { useState, useCallback, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import "./App.css";
import { SnackbarProvider } from 'notistack';

import { NavBar } from "./Components/NavBar";
import { Landing } from "./Pages/Landing";
import { Transactions } from "./Pages/Transactions";
import { LoginPage } from "./Pages/LoginPage"
import { ReportPage } from "./Pages/ReportPage"
import { MonthPage } from "./Pages/MonthPage"
import { RegisterPage} from "./Pages/RegisterPage"
import {AuthContext} from './Context/auth-context'
import { TransactionProvider } from "./Context/TransactionState";

let logoutTimer;
const App = () => {
  const [userId, setUserId] = useState(false);
  const [token, setToken] = useState(false);
  const [monthlylimit, setMonthlyLimit] = useState(false);
  const [expirationDate, setExpirationDate] = useState(false);
  const [name, setName] = useState(false);


  const login = useCallback((uid, token,  monthlylimit, name, texpirationDate,) => {
    setUserId(uid);
    setToken(token);
    setMonthlyLimit(monthlylimit);
    setName(name);
    const tokenExpiration = texpirationDate || new Date(new Date().getTime()+ 1000*60*60) //1000*60*60 converts to one hour after current time
    setExpirationDate(tokenExpiration);
    localStorage.setItem('userData', 
    JSON.stringify({userId: uid, token: token, monthlylimit: monthlylimit, name:name, expiration: tokenExpiration.toISOString()}))
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setExpirationDate(null);
    setUserId(null);
    setMonthlyLimit(null);
    setName(null);
    localStorage.removeItem('userData');
  }, []);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('userData'));
    if(storedData && storedData.token && new Date(storedData.expiration) > new Date()){
      login(storedData.userId, storedData.token, storedData.monthlylimit, storedData.name, new Date(storedData.expiration));
    }
  }, [login]);

  useEffect(() => {
    if(token && expirationDate){
      const remainingTime = expirationDate.getTime() - new Date().getTime();
      console.log("Remaning Time: "+remainingTime);
      logoutTimer = setTimeout(logout, remainingTime)
    } else{
      clearTimeout(logoutTimer);
    }
  }, [token, logout, expirationDate]);


  let routes; 

  if(token){
    routes = (
    <React.Fragment>
      <Route path="/transactions" exact>
          <Transactions />
      </Route>
      <Route path="/report" exact>
          <ReportPage />
      </Route>
      <Route path="/month" exact>
          <MonthPage />
      </Route>
      <Redirect to="/transactions" />
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
  // Double ! on token converts it to boolean, return's token truthy value
  return (
    <AuthContext.Provider value={{isLoggedIn: !!token, token: token, userId: userId, monthlylimit: monthlylimit, name:name, login:login, logout: logout}}>
      <SnackbarProvider maxSnack={3} preventDuplicate>
      <TransactionProvider>
      <Router>
        <NavBar />
        <Switch>
          {routes}
        </Switch> 
      </Router>
     </TransactionProvider>
     </SnackbarProvider>
    </AuthContext.Provider>
  );
}

export default App;
