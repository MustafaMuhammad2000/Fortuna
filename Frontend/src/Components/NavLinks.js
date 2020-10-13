import React, {useContext} from "react";
import { NavLink } from "react-router-dom";

import {AuthContext} from '../Context/auth-context'
export const NavLinks = () => {
  const auth = useContext(AuthContext);
  return (
    <ul>
        {auth.isLoggedIn && (
        <li>
          <NavLink to="/u1/transactions">My Transactions </NavLink>
        </li>
        )}
        {auth.isLoggedIn && (
        <li>
          <NavLink to="/u1/report">Generate Report </NavLink>
        </li>
        )}
        {!auth.isLoggedIn && (
        <li>
          <NavLink to="/login">Login</NavLink>
        </li>
        )}
        {!auth.isLoggedIn && (
        <li>
          <NavLink to="/register">Register</NavLink>
        </li>
        )}
        {auth.isLoggedIn && (
        <li>
          <button onClick={auth.logout}>logout</button>
        </li>
        )}
    </ul>
  );
};
