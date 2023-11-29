import React from "react";
import "./styls/footer.css";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/auth.context";

const Footer = () => {
  const { user } = useAuth();
  return (
    <footer className="py-3  footer">
      <ul className="nav justify-content-center mb-3">
        <li className="nav-item">
          <NavLink to="/" className="nav-link px-2">
            Home
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/about" className="nav-link px-2">
            About
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/contact-Us" className="nav-link px-2">
            Contact us
          </NavLink>
        </li>
        {user && (
          <li className="nav-item">
            <NavLink to="/my-favorites" className="nav-link px-2">
              My Favorite
            </NavLink>
          </li>
        )}
        {user && user.isBusiness && !user.isAdmin && (
          <li className="nav-item">
            <NavLink to="/my-cards" className="nav-link px-2">
              My Cards
            </NavLink>
          </li>
        )}

        {user && user.isAdmin && (
          <li className="nav-item">
            <NavLink to="/sand-box" className="nav-link px-2">
              Sand Box
            </NavLink>
          </li>
        )}
      </ul>
      <p className="text-center">
        © {new Date().getFullYear()} Moran Habooba, Inc
      </p>
    </footer>
  );
};

export default Footer;
