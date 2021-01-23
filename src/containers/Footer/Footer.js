import React, { useContext } from "react";

import {
  FaFacebookSquare,
  FaTwitterSquare,
  FaInstagramSquare,
} from "react-icons/fa";

import { IoIosMail } from "react-icons/io";

import { ReactComponent as LogoSVG } from "../../assets/logo/LocusLogo_white.svg";

import { ReactComponent as FacebookSVG } from "../../assets/icons/facebook.svg";
import { ReactComponent as TwitterSVG } from "../../assets/icons/twitter.svg";
import { ReactComponent as InstagramSVG } from "../../assets/icons/instagram.svg";

import classes from "./Footer.module.scss";

import { AuthDrawerContext } from "../../context/AuthContext";

const Footer = () => {
  const [authDrawer, setAuthDrawer] = useContext(AuthDrawerContext);

  return (
    <footer
      className={`${classes.footer} ${authDrawer.open ? classes.hide : null}`}
    >
      <div className={classes.logoContainer}>
        <LogoSVG className={classes.logo} />
      </div>

      <div className={classes.footerList}>
        <div className={classes.listItem}>
          <a href="/"> Home </a>
        </div>

        <div className={classes.listItem}>
          <a href="/about"> About </a>
        </div>

        {/* <div className={classes.listItem}>
                   <a href="/advertise"> Advertise </a>
                </div> */}

        <div className={classes.listItem}>
          <a href="/news"> News </a>
        </div>

        <div className={classes.listItem}>
          <a href="/contact"> Contact </a>
        </div>

        <div className={classes.listItem}>
          <a href="/sitemap"> Sitemap </a>
        </div>

        <div className={classes.listItem}>
          <a href="/policy"> Privacy Policy </a>
        </div>

        <div className={classes.listItem}>
          <a href="/terms"> Terms of Service </a>
        </div>
      </div>

      <div className={classes.mailContainer}>
        <a href="mailto:admin@locus.com">
          <IoIosMail className={classes.mailIcon} />
          <p className={classes.email}>admin@locus.com</p>
        </a>
      </div>

      <div className={classes.socialContainer}>
        <a href="https://www.facebook.com/locusDiving/" target="_blank">
          <FacebookSVG className={classes.socialContainer__logo} />
        </a>
        <a href="https://twitter.com/locus88596252" target="_blank">
          <TwitterSVG className={classes.socialContainer__logo} />
        </a>
        <a href="https://www.instagram.com/locusdiving/" target="_blank">
          <InstagramSVG className={classes.socialContainer__logo} />
        </a>
      </div>

      <div className={classes.copyrightContainer}>
        <p>© Copyright 2020 Locus™</p>
        {/* <p>Designed and developed by Patrick Minda</p> */}
      </div>
    </footer>
  );
};

export default Footer;
