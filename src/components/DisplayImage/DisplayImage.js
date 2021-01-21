import React, { useEffect } from "react";
import classes from "./DisplayImage.module.scss";

import { ReactComponent as CloseSVG } from "../../assets/icons/close.svg";

import { format } from "date-fns";

const DisplayImage = (props) => {
  const image = props.image;
  const site = props.site;
  const suburb = props.suburb;
  const banner = props.banner;
  const logo = props.logo;
  const shop = props.shop;

  const dateHandler = (reportDate) => {
    let convertedDate = new Date(reportDate);
    convertedDate = format(convertedDate, "dd/MM/yyyy");

    return <span className={classes.date}>{convertedDate}</span>;
  };

  return (
    <div className={classes.displayImage}>
      <div
        className={classes.displayImageOverlay}
        onClick={() => props.setEnlargeImage(false)}
      ></div>
      {!shop && (
        <div className={classes.imageContainer}>
          <CloseSVG
            className={classes.closeSVG}
            onClick={() => props.setEnlargeImage(false)}
          />
          <img
            src={
              image.image
                ? process.env.REACT_APP_BACKEND + image.image
                : process.env.REACT_APP_BACKEND + image
            }
          />
          <div className={classes.textContainer}>
            {image.userId && (
              <div className={classes.textContainer__nameContainer}>
                <span>Uploaded by </span>
                <a
                  href={"/viewprofile/" + image.userId}
                  className={classes.name}
                >
                  {image.userFirstName} {image.userLastName}
                </a>
              </div>
            )}
            <div className={classes.textContainer__locationContainer}>
              <a
                href={"/divesite/" + image.siteId}
                className={classes.location}
              >
                {image.siteName ? image.siteName : site.name},{" "}
                {image.siteSuburb ? image.siteSuburb : site.siteSuburb}{" "}
                {suburb ? suburb : null},{" "}
                {image.siteCountry ? image.siteCountry : site.country}
              </a>
            </div>
            <div className={classes.textContainer__dateContainer}>
              {image.reportDate ? dateHandler(image.reportDate) : null}
            </div>
          </div>
        </div>
      )}
      {shop && (
        <div className={classes.imageContainer}>
          <CloseSVG
            className={classes.closeSVG}
            onClick={() => props.setEnlargeImage(false)}
          />
          {banner ? <img src={process.env.REACT_APP_BACKEND + banner} /> : null}
          {logo ? <img src={process.env.REACT_APP_BACKEND + logo} /> : null}

          <div className={classes.textContainer}>
            <div className={classes.textContainer__locationContainer}>
              <a href={"/diveshop/" + shop._id} className={classes.location}>
                {shop.name}
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DisplayImage;
