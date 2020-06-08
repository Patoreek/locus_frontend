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
                <a href="https://www.facebook.com/locusDiving/" target="_blank">
                    <FaFacebookSquare className={classes.fbIcon}/>
                </a>
                <a href="https://twitter.com/locus88596252" target="_blank">
                    <FaTwitterSquare className={classes.twitterIcon}/>
                </a>
                <a href="https://www.instagram.com/locusdiving/" target="_blank">
                    <FaInstagramSquare className={classes.instaIcon}/>
                </a>
            </div>

            <div className={classes.mailContainer}>
                <a href="mailto:locusdiving@gmail.com">
                    <IoIosMail className={classes.mailIcon}/>
                    <p className={classes.email}>support@locus.com</p>
                </a>
            </div>

            <ul className={classes.footerList}>
                <li className={classes.listItem}>
                   <a href="/"> Home </a>
                </li>
                
                <li className={classes.listItem}>
                   <a href="/about"> About </a>
                </li>
                
                {/* <li className={classes.listItem}>
                   <a href="/advertise"> Advertise </a>
                </li> */}
                
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
                   <a href="/policy"> Privacy Policy </a>
                </li>
                
                <li className={classes.listItem}>
                   <a href="/terms"> Terms of Service </a>
                </li>
            </ul>

            <div className={classes.copyrightContainer}>
                <p>© Copyright 2020 Locus™</p>
                {/* <p>Designed and developed by Patrick Minda</p> */}
            </div>
        </footer>
    );
};

export default Footer;