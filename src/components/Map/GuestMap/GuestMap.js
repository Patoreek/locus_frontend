import React, { useState, useEffect, useContext } from "react";

import { Marker, InfoWindow } from "react-google-maps";

import {
  AuthContext,
  FavButtonContext,
  MapRefContext,
} from "../../../context/AuthContext";

import {
  DiveSitesContext,
  SiteContext,
  LoadDiveSiteInBoundsContext,
  ShopContext,
  DiveShopsContext,
} from "../../../context/DiveSiteContext";

import markerSVG from "../../../assets/icons/location_blue.svg";
import markerBoatSVG from "../../../assets/icons/location_blue_boat.svg";

import markerShopSVG from "../../../assets/icons/location_orange.svg";

import StarRating from "../../StarRating/StarRating";
import FavouriteButton from "../../Buttons/FavouriteButton/FavouriteButton";

import { ReactComponent as PhoneSVG } from "../../../assets/icons/phone.svg";
import { ReactComponent as EmailSVG } from "../../../assets/icons/email.svg";
import { ReactComponent as LocationSVG } from "../../../assets/icons/location_default.svg";
import { ReactComponent as WebsiteSVG } from "../../../assets/icons/global.svg";
import { ReactComponent as FacebookSVG } from "../../../assets/icons/facebook.svg";
import { ReactComponent as InstagramSVG } from "../../../assets/icons/instagram.svg";
import { ReactComponent as TwitterSVG } from "../../../assets/icons/twitter.svg";

import placeholderImage from "../../../assets/images/placeholder_image.png";

import { MarkerClusterer } from "react-google-maps/lib/components/addons/MarkerClusterer";

import classes from "./GuestMap.module.scss";
import "./GuestMap.css";

const GuestMap = (props) => {
  const [selectedSite, setSelectedSite] = useContext(SiteContext);
  const [selectedShop, setSelectedShop] = useContext(ShopContext);
  const [diveSites, setDiveSites] = useContext(DiveSitesContext);
  const [diveShops, setDiveShops] = useContext(DiveShopsContext);
  const [isAuth, setIsAuth] = useContext(AuthContext);
  const [favButton, setFavButton] = useContext(FavButtonContext);
  const loadDiveSitesInBounds = useContext(LoadDiveSiteInBoundsContext);
  const [isLoading, setIsLoading] = useState(true);

  const onMarkerClustererClick = (markerClusterer) => {
    const clickedMarkers = markerClusterer.getMarkers();
  };

  return (
    <div>
      <div>
        <MarkerClusterer
          onClick={onMarkerClustererClick}
          averageCenter
          gridSize={20}
          maxZoom={10}
          defaultZoomOnClick
        >
          {diveSites.map((site) => (
            <Marker
              key={site._id}
              position={{
                lat: site.latitude,
                lng: site.longitude,
              }}
              onClick={() => {
                setSelectedSite(site);
              }}
              icon={{
                url: site.access == "Boat" ? markerBoatSVG : markerSVG,
                scaledSize: new window.google.maps.Size(42, 42),
              }}
            />
          ))}
        </MarkerClusterer>

        <MarkerClusterer
          onClick={onMarkerClustererClick}
          averageCenter
          gridSize={20}
          maxZoom={10}
          defaultZoomOnClick
        >
          {diveShops.map((shop) => (
            <Marker
              key={shop._id}
              position={{
                lat: parseFloat(shop.latitude),
                lng: parseFloat(shop.longitude),
              }}
              onClick={() => {
                setSelectedShop(shop);
              }}
              icon={{
                url: markerShopSVG,
                scaledSize: new window.google.maps.Size(42, 42),
              }}
            />
          ))}
        </MarkerClusterer>

        {selectedSite && (
          <InfoWindow
            position={{
              lat: parseFloat(selectedSite.latitude),
              lng: parseFloat(selectedSite.longitude),
            }}
            onCloseClick={() => {
              setSelectedSite(null);
            }}
          >
            <div className={classes.site}>
              <div className={classes.site__imageContainer}>
                <a
                  href={"/divesite/" + selectedSite._id}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={
                      selectedSite.images[0]
                        ? process.env.REACT_APP_BACKEND + selectedSite.images[0]
                        : placeholderImage
                    }
                    className={classes.image}
                  />
                </a>
              </div>

              <div className={classes.site__diveTypeContainer}>
                <p className={classes.diveType}>
                  {" "}
                  {selectedSite.siteType} Dive · {selectedSite.suitable}{" "}
                </p>
              </div>

              {isAuth && (
                <div className={classes.site__favButtonContainer}>
                  <FavouriteButton site={selectedSite} />
                </div>
              )}

              <div className={classes.site__nameContainer}>
                <h5 className={classes.name}>
                  <a
                    href={"/divesite/" + selectedSite._id}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span>
                      {selectedSite.name} ·{" "}
                      {selectedSite.suburb == "(Open Water)" || "N/A"
                        ? selectedSite.city
                        : selectedSite.suburb}
                    </span>
                  </a>
                </h5>
              </div>

              <div className={classes.site__descriptionContainer}>
                <p className={classes.description}>
                  {selectedSite.description
                    ? selectedSite.description
                    : "There is currently no description on this site. If you have any information, images or videos you wish to share with us, please contact us via email or social media."}
                </p>
              </div>

              <div className={classes.site__ratingsContainer}>
                {/* <StarRating siteRatings = {selectedSite.ratings}/> */}
              </div>
            </div>
          </InfoWindow>
        )}

        {selectedShop && (
          <InfoWindow
            position={{
              lat: parseFloat(selectedShop.latitude),
              lng: parseFloat(selectedShop.longitude),
            }}
            onCloseClick={() => {
              setSelectedShop(null);
              setSelectedSite(null);
            }}
          >
            <div className={classes.shop}>
              <div className={classes.shop__imageContainer}>
                <a
                  href={"/diveshop/" + selectedShop._id}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={process.env.REACT_APP_BACKEND + selectedShop.logo}
                    className={classes.image}
                  />
                </a>
              </div>

              <div className={classes.shop__nameContainer}>
                <a
                  href={"/diveshop/" + selectedShop._id}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={classes.name}
                >
                  <span>{selectedShop.name}</span>
                  <br />
                </a>
              </div>

              <div className={classes.shop__addressContainer}>
                {/* Marker Icon */}
                <LocationSVG
                  className={`${classes.icon} ${classes.icon__location}`}
                />
                <a
                  href={
                    "https://www.google.com/search?q=" + selectedShop.address
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {selectedShop.address ? selectedShop.address : "N/A"}
                </a>
              </div>

              <div className={classes.shop__phoneContainer}>
                {/* Phone Icon */}
                <PhoneSVG
                  className={`${classes.icon} ${classes.icon__phone}`}
                />
                <a href={"tel:" + selectedShop.phone}>
                  {selectedShop.phone ? selectedShop.phone : "N/A"}
                </a>
              </div>

              <div className={classes.shop__emailContainer}>
                {/* Email Icon */}
                <EmailSVG
                  className={`${classes.icon} ${classes.icon__email}`}
                />
                <a href={"mailto:" + selectedShop.email}>
                  {selectedShop.email ? selectedShop.email : "N/A"}
                </a>
              </div>

              <div className={classes.shop__websiteContainer}>
                {/* Global Icon */}
                <WebsiteSVG
                  className={`${classes.icon} ${classes.icon__website}`}
                />
                <a
                  href={selectedShop.website}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {selectedShop.website
                    ? selectedShop.website.replace(/^https?\:\/\//i, "")
                    : null}

                  {!selectedShop.website ? "N/A" : null}
                </a>
              </div>
            </div>
          </InfoWindow>
        )}
      </div>
    </div>
  );
};

export default GuestMap;

///
