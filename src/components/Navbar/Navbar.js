import React, { useContext } from "react";
import { isMobile } from "react-device-detect";

import classes from "./Navbar.module.scss";

import NavbarHome from "./NavbarHome/NavbarHome";
import NavbarMain from "./NavbarMain/NavbarMain";
import NavbarMobile from "./NavbarMobile/NavbarMobile";

import { NavbarContext } from "../../context/AuthContext";

const Navbar = () => {
  const [navbar, setNavbar] = useContext(NavbarContext);

  return (
    <div>
      {!isMobile && navbar === "home" ? <NavbarHome /> : null}
      {!isMobile && navbar === "main" ? <NavbarMain /> : null}
      {isMobile ? <NavbarMobile /> : null}
    </div>
  );
};

export default Navbar;
