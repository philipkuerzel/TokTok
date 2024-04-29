import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./tabBar.css";

const TabBar = () => {
  const [isVisible, setIsVisible] = useState(true);
  let lastScrollTop = 0;

  useEffect(() => {
    window.onscroll = function () {
      let st = window.pageYOffset || document.documentElement.scrollTop;
      if (st > lastScrollTop) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      lastScrollTop = st <= 0 ? 0 : st;
    };
  }, []);

  return (
    <div className={`tabBar ${isVisible ? "" : "hide"}`}>
      <NavLink
        to="/feed"
        isActive={(match, location) => location.pathname === "/feed"}
      >
        <button className="noStyleBtn">
          <img
            src={
              location.pathname === "/feed"
                ? "/img/ActiveHomeIcon.svg"
                : "/img/HomeIcon.svg"
            }
            alt=""
          />
        </button>
      </NavLink>
      <NavLink
        to="/search"
        isActive={(match, location) => location.pathname === "/search"}
      >
        <button className="noStyleBtn">
          <img
            src={
              location.pathname === "/search"
                ? "/img/ActiveSearchIcon.svg"
                : "/img/SearchIcon.svg"
            }
            alt=""
          />
        </button>
      </NavLink>
      <NavLink
        to="/upload"
        isActive={(match, location) => location.pathname === "/upload"}
      >
        <button className="noStyleBtn">
          <img
            src={
              location.pathname === "/upload"
                ? "/img/ActiveUploadIcon.svg"
                : "/img/UploadIcon.svg"
            }
            alt=""
          />
        </button>
      </NavLink>
      <NavLink
        to="/profile"
        isActive={(match, location) => location.pathname === "/profile"}
      >
        <button className="noStyleBtn">
          <img
            src={
              location.pathname === "/profile"
                ? "/img/ActiveProfileIcon.svg"
                : "/img/ProfileIcon.svg"
            }
            alt=""
          />
        </button>
      </NavLink>
    </div>
  );
};

export default TabBar;
