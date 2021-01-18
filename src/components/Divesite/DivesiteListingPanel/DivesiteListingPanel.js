import React, { useState, useContext, useEffect } from "react";

import classes from "./DivesiteListingPanel.module.scss";

import { AuthContext } from "../../../context/AuthContext";

import StarRating from "../../../components/StarRating/StarRating";
import FavouriteButton from "../../../components/Buttons/FavouriteButton/FavouriteButton";

import {
  EditModalContext,
  DeleteModalContext,
} from "../../../context/UserContext";
import { SiteContext } from "../../../context/DiveSiteContext";

import { ReactComponent as EditSVG } from "../../../assets/icons/edit.svg";
import { ReactComponent as SnorkelSVG } from "../../../assets/icons/diver.svg";
import { ReactComponent as AnchorSVG } from "../../../assets/icons/anchor.svg";

import placeholderImage from "../../../assets/images/placeholder_image.png";

const DivesiteListingPanel = (props) => {
  const [isAuth, setIsAuth] = useContext(AuthContext);

  const [selectedSite, setSelectedSite] = useContext(SiteContext);
  const [showDeleteModal, setShowDeleteModal] = useContext(DeleteModalContext);
  const [showEditModal, setShowEditModal] = useContext(EditModalContext);

  const [edit, setEdit] = useState(false);

  const site = props.site;

  useEffect(() => {
    if (props.edit) {
      setEdit(props.edit);
    } else {
      setEdit(false);
    }
  }, []);

  const editSiteHandler = () => {
    setShowDeleteModal(false);
    setShowEditModal(true);
  };

  return (
    <div
      className={classes.site}
      onClick={() => setSelectedSite(site)}
      key={site._id}
    >
      <div className={classes.site__imageContainer}>
        <a
          href={"/divesite/" + site._id}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={
              site.images[0]
                ? "http://localhost:8080/" + site.images[0]
                : placeholderImage
            }
            className={classes.image}
          />
        </a>
        {site.experience == "Snorkel Friendly" ? (
          <div className={classes.snorkelIconBg}>
            <SnorkelSVG className={classes.snorkelIcon} />
          </div>
        ) : null}
        {site.access == "Boat" ? (
          <div className={classes.anchorIconBg}>
            <AnchorSVG className={classes.anchorIcon} />
          </div>
        ) : null}
      </div>

      <div className={classes.site__diveTypeContainer}>
        <span>
          {" "}
          {site.siteType} Dive · {site.suitable}
        </span>
      </div>

      <div className={classes.site__nameContainer}>
        <h5 className={classes.siteName}>
          <a
            href={"/divesite/" + site._id}
            target="_blank"
            rel="noopener noreferrer"
          >
            {site.name},{" "}
            {site.suburb == "(Open Water)" || "N/A" ? site.city : site.suburb}
          </a>
        </h5>
      </div>

      {isAuth && !edit && (
        <div className={classes.site__favButtonContainer}>
          <FavouriteButton site={site} />
        </div>
      )}

      {isAuth && edit && (
        <div className={classes.site__editContainer}>
          <EditSVG
            className={classes.edit}
            onClick={() => {
              setSelectedSite(site);
              editSiteHandler();
            }}
          />
        </div>
      )}

      <div className={classes.site__descriptionContainer}>
        <p className={classes.siteDescription}>
          {" "}
          {site.description
            ? site.description
            : "There is currently no description on this site. If you have any information, images or videos you wish to share with us, please contact us via email or social media."}{" "}
        </p>
      </div>

      <div className={classes.site__ratingsContainer}>
        {/* <StarRating site={site}/> */}
      </div>
    </div>
  );
};

export default DivesiteListingPanel;
