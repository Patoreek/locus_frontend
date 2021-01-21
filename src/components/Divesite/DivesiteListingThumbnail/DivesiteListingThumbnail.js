import React from "react";

import classes from "./DivesiteListingThumbnail.module.scss";

// import StarRating from '../../StarRating/StarRating';

const DivesiteListingThumbnail = (props) => {
  const site = props.site;

  return (
    <div className={classes.thumbnail}>
      <div className={classes.thumbnail__name}>
        <a href={"/divesite/" + site._id}>{site.name}</a>
      </div>
      <div className={classes.thumbnail__image}>
        <a href={"/divesite/" + site._id}>
          <img
            src={process.env.REACT_APP_BACKEND + site.images[0]}
            className={classes.image}
          />
        </a>
      </div>
      {/* <StarRating site={site}/> */}
    </div>
  );
};

export default DivesiteListingThumbnail;
