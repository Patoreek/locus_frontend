import React, { useState } from "react";
import { format } from "date-fns";

import classes from "./DisplayReport.module.scss";

import { ReactComponent as VisibilitySVG } from "../../../assets/icons/visibility.svg";
import { ReactComponent as DateSVG } from "../../../assets/icons/calendar.svg";
import { ReactComponent as LocationSVG } from "../../../assets/icons/location_default.svg";
import { ReactComponent as DurationSVG } from "../../../assets/icons/time.svg";

import DisplayImage from "../../DisplayImage/DisplayImage";

import avatarPlaceholder from "../../../assets/images/avatar_placeholder.jpeg";

const DisplayReport = (props) => {
  const [report, setReport] = useState(props.report);

  const [selectedImage, setSelectedImage] = useState();
  const [enlargeImage, setEnlargeImage] = useState(false);

  const dateHandler = (createdAt) => {
    let convertedDate = new Date(createdAt);
    convertedDate = format(convertedDate, "dd/MM/yyyy");

    return (
      <div className={classes.date}>
        <DateSVG className={classes.icon} />
        <span>{convertedDate}</span>
      </div>
    );
  };

  const imageHandler = (report, i) => {
    //console.log(report);
    const image = report.images[i];
    const userId = report.userId._id;
    const firstName = report.userId.firstName;
    const lastName = report.userId.lastName;
    const siteId = report.siteId._id;
    const siteName = report.siteId.name;
    const siteSuburb = report.siteId.suburb;
    const siteCountry = report.siteId.country;
    const date = report.createdAt;

    setSelectedImage({
      image: image,
      userId: userId,
      userFirstName: firstName,
      userLastName: lastName,
      siteId: siteId,
      siteName: siteName,
      siteSuburb: siteSuburb,
      siteCountry: siteCountry,
      reportDate: date,
    });
    setEnlargeImage(true);
  };

  return (
    <div className={classes.report}>
      <div className={classes.report__topContainer}>
        <div className={classes.profilePic}>
          <img
            src={
              report.userId.profilePic
                ? process.env.REACT_APP_BACKEND + report.userId.profilePic
                : avatarPlaceholder
            }
          />
        </div>
        <div className={classes.nameContainer}>
          <div className={classes.nameContainer__name}>
            <a href={"/userprofile/" + report.userId._id}>
              {report.userId.firstName} {report.userId.lastName}
            </a>
          </div>
          <div className={classes.nameContainer__date}>
            {dateHandler(report.createdAt)}
          </div>
        </div>
      </div>
      <div className={classes.report__infoContainer}>
        <div className={classes.location}>
          <LocationSVG className={classes.icon} />
          <a href={"/divesite/" + report.siteId._id} target="_blank">
            {report.siteId.name}, {report.siteId.suburb},{" "}
            {report.siteId.country}
          </a>
        </div>
        <div className={classes.visibility}>
          <VisibilitySVG className={classes.icon} />
          <span>~{report.visibility} meters</span>
        </div>
        <div className={classes.duration}>
          <DurationSVG className={classes.icon} />
          <span>~{report.duration} minutes</span>
        </div>
      </div>
      <div className={classes.report__reportContainer}>
        <div className={classes.reportContent}>
          <p>{report.report}</p>
        </div>
      </div>
      {report.images.length > 0 && (
        <div className={classes.report__imagesContainer}>
          <div className={classes.container}>
            <div className={classes.imageSlideshow}>
              {report.images.map((image, i) => (
                <div className={classes.imgContainer} key={i}>
                  <img
                    src={process.env.REACT_APP_BACKEND + image}
                    onClick={() => imageHandler(report, i)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {enlargeImage && (
        <DisplayImage image={selectedImage} setEnlargeImage={setEnlargeImage} />
      )}
    </div>
  );
};

export default DisplayReport;
