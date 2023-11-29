import React from "react";
import "./styls/navBar.css";
import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../context/auth.context";
import { useEffect, useState } from "react";
import { getUserById } from "../services/usersService";
import { useDarkMode } from "../context/darkMode.context";
import { useSearch } from "../context/searchContext";
import { useSearchBarRef } from "../context/useSearchBarRef";

const Navbar = () => {
  const { user } = useAuth();
  const searchInput = useSearchBarRef();

  const isRegularUser = user && !user.isBusiness && !user.isAdmin;

  const { darkMode, setDarkMode } = useDarkMode();

  const { setSearchTerm } = useSearch();
  const [userName, setUserName] = useState("");

  // const handleInputChange = (e) => {
  //   setSearchTerm(e.target.value);
  // };

  const handleInputChange = () => {
    setSearchTerm(searchInput.current.value);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [darkMode]);

  useEffect(() => {
    // אם יש לנו אובייקט משתמש ויש לו id, נבצע את השאילתה
    if (user && user._id) {
      getUserById(user._id).then((userData) => {
        // עדכן את המבנה לפי המבנה המדויק של האובייקט שלך
        setUserName(`${userData.data.name.first}`);
      });
    }
  }, [user]);
  return (
    <nav className="navbar navbar-expand-sm  navbar-light ">
      <div className="container-fluid">
        <span className="text-white fs-3 me-4 ">
          Click<i className="bi bi-hand-index-fill fs-4 ms-1 me-1"></i>event
        </span>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink to="/" className="nav-link" aria-current="page">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/about" className="nav-link">
                About
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/contact-Us" className="nav-link">
                Contact us
              </NavLink>
            </li>
            {isRegularUser && (
              <>
                <li className="nav-item">
                  <NavLink to="/my-favorites" className="nav-link">
                    My favorites
                  </NavLink>
                </li>
              </>
            )}

            <li className="nav-item dropdown">
              {user ? (
                <NavLink to="/sign-out" className="nav-link dropdown-item">
                  <i className="bi bi-box-arrow-left me-2"></i>
                  Log Out
                </NavLink>
              ) : (
                <>
                  {/* Signed out drop down (with button) */}
                  <span
                    className="nav-link dropdown-toggle"
                    href="#"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <span>
                      <i className="bi bi-box-arrow-in-right me-2"></i>
                    </span>
                    Login / Sign Up
                  </span>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdown"
                  >
                    <>
                      <li>
                        <NavLink to="/sign-up" className="dropdown-item">
                          Sign Up
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="/sign-in" className="dropdown-item">
                          Login
                        </NavLink>
                      </li>
                    </>
                  </ul>
                </>
              )}
            </li>
            {user ? (
              <li>
                <Link to="/user-edit">
                  <img
                    className="ms-2 mt-1"
                    src="/DefaultImg.svg.png"
                    alt="Default profile"
                    width="30"
                    height="30"
                  />
                </Link>
                <span
                  className="navbar-text ms-3 text-white "
                  style={{ color: "#e5b55c" }}
                >
                  Hello, {userName}
                </span>
              </li>
            ) : (
              <li></li>
            )}
          </ul>
          <form
            className="d-flex"
            onSubmit={(e) => {
              e.preventDefault();
              handleInputChange();
            }}
          >
            <input
              ref={searchInput}
              className="form-control me-2"
              type="search"
              placeholder="Search"
              onInput={(e) => {
                if (!e.target.value) setSearchTerm("");
              }}
              aria-label="Search"
              name="search"
              // onChange={handleInputChange}
            />
            <button
              className="btn btn-outline-light me-4 btn-search"
              type="submit"
            >
              Search
            </button>
            <span>
              <NavLink onClick={toggleDarkMode}>
                <i
                  className={`bi bi-moon-stars-fill me-3  ${
                    darkMode ? "dark-mode-icon" : "light-mode-icon"
                  }`}
                ></i>
              </NavLink>
            </span>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
