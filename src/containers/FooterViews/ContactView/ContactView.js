import React from 'react';

import { FaFacebookSquare,
    FaTwitterSquare,
    FaInstagramSquare,
   } from "react-icons/fa";

import { IoIosMail } from "react-icons/io";

import classes from './ContactView.module.css';

const ContactView = () => {
    return (
        <div className={classes.contactPage}>

            <div className={classes.contactContainer}>

                <div className={classes.headerContainer}>
                    <h3 className={classes.contactHeader}> Contact Locus</h3>
                </div>

                <div className={classes.descriptionContainer}>
                    <p className={classes.contactDescription}>Currently, the best way to contact Locus is through our social media and our email address.
                        We would love to hear any feedback, criticism, or ideas that you want to share to help improve the service.
                        Links are down below.
                    </p>
                </div>

                <div className={classes.socialContainer}>
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

                <div className={classes.aboutUsContainer}>
                    <p className={classes.aboutUsMsg}>Want to know more About Us? <a href="/about">Click here</a></p>
                </div>

                <div className={classes.signUpContainer}>
                    <p className={classes.signUpMsg}>Want to Sign Up and start using the site? <a href="/signup">Click here</a></p>
                </div>

            </div>
        </div>
    );
};

export default ContactView;