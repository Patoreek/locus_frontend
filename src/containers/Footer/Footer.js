import React from 'react';

import { FaFacebookSquare,
         FaTwitterSquare,
         FaInstagramSquare,
        } from "react-icons/fa";

import { IoIosMail } from "react-icons/io";

import logoSVG from '../../images/locusLogo.svg';

import classes from './Footer.module.css';

const Footer = () => {
    return (
        <footer className={classes.footer}>

            <div className={classes.logoContainer}>
                <img src={logoSVG} className={classes.logo}/>
            </div>

            <div className={classes.socialContainer}>
                <h3 className={classes.socialHeader}>Find us on </h3>
                <FaFacebookSquare className={classes.fbIcon}/>
                <FaTwitterSquare className={classes.twitterIcon}/>
                <FaInstagramSquare className={classes.instaIcon}/>
            </div>

            <div className={classes.mailContainer}>
                <IoIosMail className={classes.mailIcon}/>
                <p className={classes.email}>support@locus.com</p>
            </div>

            <ul className={classes.footerList}>
                <li className={classes.listItem}>
                   <a href="/"> Home </a>
                </li>
                
                <li className={classes.listItem}>
                   <a href="/about"> About </a>
                </li>
                
                <li className={classes.listItem}>
                   <a href="/advertise"> Advertise </a>
                </li>
                
                <li className={classes.listItem}>
                   <a href="/news"> News </a>
                </li>
                
                <li className={classes.listItem}>
                   <a href="/contact"> Contact </a>
                </li>
                
                <li className={classes.listItem}>
                   <a href="/sitemap"> Sitemap </a>
                </li>
                
                <li className={classes.listItem}>
                   <a href="/terms"> Terms of Service </a>
                </li>
            </ul>

            <div className={classes.copyrightContainer}>
                <p>© Copyright 2020 Locus™</p>
            </div>
        </footer>
    );
};

export default Footer;