import React, { useContext } from "react";

import classes from "./Navbar.module.scss";

import NavbarHome from "./NavbarHome/NavbarHome";
import NavbarMain from "./NavbarMain/NavbarMain";

import { NavbarContext } from "../../context/AuthContext";

const Navbar = () => {
  const [navbar, setNavbar] = useContext(NavbarContext);

  return (
    <div>
      {navbar === "home" ? <NavbarHome /> : null}
      {navbar === "main" ? <NavbarMain /> : null}
    </div>
  );
};

export default Navbar;
