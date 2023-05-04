import React from "react";
import Auth from "../../utils/auth";
import { Link } from "react-router-dom";



function Nav() {

  function showNavigation() {
    if (Auth.loggedIn()) {
      return (
        <div>
          <ul className="flex-row navBar">
          <li className="mx-1 navLink">
              <Link to="/savedCars">SavedCars</Link>
            </li>
            <li className="mx-1 navLink">
              <Link to="/carInfo">CarInfo</Link>
            </li>
            <li className="mx-1 navLink">
              {/* this is not using the Link component to logout or user and then refresh the application to the start */}
              <a href="/" onClick={() => Auth.logout()}>
                Logout
              </a>
            </li>
          </ul>
        </div>
      );
      } else {
        return (
    <div >
        <ul className="flex-row navBar">
          <li className="mx-2 navLink">
            <Link to="/signup">
              Signup
            </Link>
          </li>
          <li className="mx-2 navLink">
            <Link to="/login">
              Login
            </Link>
          </li>
        </ul>
      </div>
      );
      }
  }

  

  return (
    <header className="flex-row px-2">
      <h1>
        {/* <Link to="/">
          <span role="img" aria-label="shopping bag">🛍️</span>
          -Shop-Shop
        </Link> */}
      </h1>

      <nav>
        {showNavigation()}
      </nav>
    </header>
  );
}

export default Nav;
