import React from "react";

import classes from "./SitemapView.module.scss";
import UnderConstruction from "../../../components/UnderConstruction/UnderConstruction";

const SiteMapView = () => {
  return (
    <div className={classes.sitemapPage}>
      <UnderConstruction />
      <div className={classes.sitemapPageContainer}>
        <div className={classes.siteMapContainer}>
          <div className={classes.siteMapHeaderContainer}>
            <h1 className={classes.siteMapHeader}> Sitemap </h1>
          </div>

          <div className={classes.siteMapParagraphContainer}>
            <p className={classes.siteMapParagraph}> Place Sitemap </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SiteMapView;
