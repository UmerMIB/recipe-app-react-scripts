import React from 'react';
import { NavLink } from 'react-router-dom';
import '../scss/Components/Navbar.scss';

const Navbar = () => {
	return (
		<div className="Navbar">
			<NavLink to="/create-recipe" className="Navbar-title">
				Create Recipe
			</NavLink>
			<NavLink to="/" className="Navbar-title">
				Recipe Search
			</NavLink>
		</div>
	);
};

export default Navbar;
