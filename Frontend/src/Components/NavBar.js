import React from "react";
import { Link } from "react-router-dom";
import { NavLinks } from "./NavLinks";

export const NavBar = () => {
  return (
    <React.Fragment>
      <nav className="NavBar">
        <Link to="/">Fortuna</Link>
        <nav>
          <NavLinks />
        </nav>
      </nav>
    </React.Fragment>
  );
};
