import React from "react";

import classes from "./UnderConstruction.module.scss";

import { ReactComponent as IconSVG } from "../../assets/images/under_construction.svg";

const UnderConstruction = () => {
  return (
    <div className={classes.underConstruction}>
      <IconSVG className={classes.underConstruction__svg} />
      <h1 className={classes.underConstruction__text}>Under Construction</h1>
      <p className={classes.underConstruction__later}>
        Please check again later.
      </p>
    </div>
  );
};

export default UnderConstruction;
