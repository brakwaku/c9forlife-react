import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import logo from "../assets/C9forlifeLogo.png";
import { logout } from "../actions/userActions";
import userprofileimage from "../assets/personPlaceholder.png";

const Header = () => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(logout());
    navigate("/");
  };

  useEffect(() => {
    if (userInfo) {
      console.log('Header user name: ', userInfo.firstName);
    }
  }, [userInfo]);

  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-info shadow sticky-top">
      <div className="container">
        <NavLink className="navbar-brand" to="/">
          <LogoImageWrapper
            src={logo}
            className="d-inline-block align-top"
            alt="Cloud 9 For Life Logo"
          />
        </NavLink>
        {userInfo && (
          <NavLink
            to="/profile"
            className="btn nav-link"
            style={{ color: "white" }}
          >
            HI, {userInfo.firstName.toUpperCase()}
            <span> &#128540;</span>
          </NavLink>
        )}
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav ml-auto">
            {!userInfo && (
              <>
                <NavLink className="nav-item nav-link" to="/contact">
                  Contact
                </NavLink>
                <NavLink className="nav-item nav-link" to="/login">
                  Login
                </NavLink>
                <NavLink className="nav-item nav-link" to="/register">
                  Sign Up
                </NavLink>
              </>
            )}

            {userInfo && (
              <>
                <NavLink className="nav-item nav-link" to="/dashboard">
                  Dashboard
                </NavLink>
                <NavLink className="nav-item nav-link" to="/activities">
                  Activities
                </NavLink>
                {userInfo.isAdmin && (
                  <NavLink className="nav-item nav-link" to="/admin">
                    Admin
                  </NavLink>
                )}
                <NavLink className="nav-item nav-link" to="/motivation">
                  Motivation
                </NavLink>
                <div className="nav-item dropdown">
                  <ImageIconWrapper
                    src={userInfo.photoURL !== 'sample' ? userInfo.photoURL : userprofileimage}
                    alt="Avatar"
                    className="nav-link dropdown-toggle rounded-circle"
                    id="navbarDropdown"
                    role="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  />
                  <div className="dropdown-menu dropdown-menu-sm-right" aria-labelledby="navbarDropdown">
                    <NavLink className="dropdown-item" to='/profile'>
                      Profile
                    </NavLink>
                    <button
                      type="button"
                      onClick={logoutHandler}
                      className="dropdown-item"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;

const LogoImageWrapper = styled.img`
  width: 50px;
  height: 50px;
`;

const ImageIconWrapper = styled.img`
  width: 48px;
  height: 48px;
  /* border-radius: 50%; */

  :hover {
    filter: contrast(150%);
  }
`;
