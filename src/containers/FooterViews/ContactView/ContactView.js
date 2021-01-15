import React from "react";

import {
  FaFacebookSquare,
  FaTwitterSquare,
  FaInstagramSquare,
} from "react-icons/fa";

import { IoIosMail } from "react-icons/io";

import classes from "./ContactView.module.scss";

const ContactView = () => {
  return (
    <div className={classes.contact}>
      <div className={classes.contact__header}>
        <h3 className={classes.header}> Contact Locus</h3>
      </div>

      <div className={classes.contact__content}>
        <p className={classes.content}>
          Currently, the best way to contact Locus is through our social media
          and our email address. We would love to hear any feedback, criticism,
          or ideas that you want to share to help improve the service. Links are
          down below.
        </p>
      </div>

      <div className={classes.contact__socials}>
        <a href="https://www.facebook.com/locusDiving/" target="_blank">
          <FaFacebookSquare className={classes.fbIcon} />
        </a>
        <a href="https://twitter.com/locus88596252" target="_blank">
          <FaTwitterSquare className={classes.twitterIcon} />
        </a>
        <a href="https://www.instagram.com/locusdiving/" target="_blank">
          <FaInstagramSquare className={classes.instaIcon} />
        </a>
      </div>

      <div className={classes.contact__email}>
        <a href="mailto:locusdiving@gmail.com">
          <IoIosMail className={classes.mailIcon} />
          <p className={classes.email}>support@locus.com</p>
        </a>
      </div>

      <div className={classes.contact__about}>
        <p className={classes.text}>
          Want to know more About Us? <a href="/about">Click here</a>
        </p>
      </div>

      <div className={classes.contact__signup}>
        <p className={classes.text}>
          Interested in signing up? <a href="/signup">Click here</a>
        </p>
      </div>

      <div className={classes.contact__explore}>
        <p className={classes.text}>
          <a href="/map">Click here</a> to start exploring dive sites
        </p>
      </div>
    </div>
  );
};

export default ContactView;
