import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth, backendUrl } from "../../auth/AuthContext";

import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import "../styles.css";

import { IoMenu } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { LuUserCircle2 } from "react-icons/lu";

const Menu = () => {
  const { isAuthenticated, setAuthenticated, user, setUser } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };
  const handleProfileClick = (route) => {
    navigate(route);
    toggleDrawer();
  };
  const handleClick = async () => {
    try {
      await fetch(`${backendUrl}/auth/logout`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      setAuthenticated(false);
      setUser({});
      if (isOpen) {
        toggleDrawer();
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <ul className="nav-links">
        <li>
          <Link to="/">HOME</Link>
        </li>
        <li>
          <Link to="/about">ABOUT</Link>
        </li>
        <li>
          <Link to="/contact">CONTACT</Link>
        </li>
        <li>
          <Link
            to={isAuthenticated ? "/blogs/create-blog-post" : "/auth/login"}
          >
            BlOG
          </Link>
        </li>
        {isAuthenticated ? (
          <li>
            <Link onClick={handleClick}>LOGOUT</Link>
          </li>
        ) : (
          <li>
            <Link to="/auth/login">LOGIN</Link>
          </li>
        )}
        {isAuthenticated && (
          <div className="user" onClick={() => navigate(`/users/${user._id}`)}>
            {user && user.profilePhoto ? (
              <img
                src={
                  user?.profilePhoto ? `${backendUrl}${user.profilePhoto}` : ""
                }
                className="profile"
                alt="img"
              />
            ) : (
              <LuUserCircle2 />
            )}
            &nbsp;
            {user && user.email}
          </div>
        )}
      </ul>
      <IoMenu size="2em" className="icon" onClick={toggleDrawer} />
      {
        <Drawer
          open={isOpen}
          onClose={toggleDrawer}
          direction="right"
          className="drawer"
        >
          <div>
            <RxCross2 size="1.5em" onClick={toggleDrawer} />
            <ul className="drawer-navlinks">
              <li>
                <Link to="/" onClick={toggleDrawer}>
                  HOME
                </Link>
              </li>
              <li>
                <Link to="/about" onClick={toggleDrawer}>
                  ABOUT
                </Link>
              </li>

              <li>
                <Link to="/contact" onClick={toggleDrawer}>
                  CONTACT
                </Link>
              </li>
              <li>
                <Link
                  to={
                    isAuthenticated ? "/blogs/create-blog-post" : "/auth/login"
                  }
                  onClick={toggleDrawer}
                >
                  BlOG
                </Link>
              </li>
              {isAuthenticated ? (
                <li>
                  <Link onClick={handleClick}>LOGOUT</Link>
                </li>
              ) : (
                <li>
                  <Link to="/auth/login" onClick={toggleDrawer}>
                    LOGIN
                  </Link>
                </li>
              )}
              {isAuthenticated && (
                <div
                  className="user"
                  onClick={() => handleProfileClick(`/users/${user._id}`)}
                >
                  {user && user.profilePhoto ? (
                    <img
                      src={
                        user?.profilePhoto
                          ? `${backendUrl}${user.profilePhoto}`
                          : ""
                      }
                      className="profile"
                      alt="img"
                    />
                  ) : (
                    <LuUserCircle2 />
                  )}
                  &nbsp;
                  {user && user.email}
                </div>
              )}
            </ul>
          </div>
        </Drawer>
      }
    </>
  );
};

export default Menu;
