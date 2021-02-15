import React from "react";
import { NavLink } from "react-router-dom";
import "../scss/Components/Navbar.scss";

const Navbar = () => {
  return (
    <div className="Navbar">
      <div>
        <NavLink to="/" className="Navbar__brand">
          Recipe App
        </NavLink>
      </div>
      <div>
        <NavLink to="/create-recipe" className="Navbar__title">
          Create
        </NavLink>
        <NavLink to="/" className="Navbar__title">
          Search
        </NavLink>
      </div>
    </div>
  );
};

export default Navbar;
