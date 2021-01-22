import React, { useState, useEffect, useContext } from "react";

import { Marker, InfoWindow } from "react-google-maps";

import { Modal, Button, Tabs, Tab } from "react-bootstrap";

import {
  EditModalContext,
  DeleteModalContext,
  AddModalContext,
  EditDiveShopModalContext,
  DiveShopAdminContext,
} from "../../../context/UserContext";

import {
  DiveSitesContext,
  DiveShopsContext,
  SiteContext,
  CoordsContext,
  ShopContext,
  LoadDiveSiteContext,
} from "../../../context/DiveSiteContext";

import {
  AuthContext,
  MapSizeContext,
  PanelSizeContext,
  LocateButtonContext,
  AccountContext,
} from "../../../context/AuthContext";

import { MarkerClusterer } from "react-google-maps/lib/components/addons/MarkerClusterer";

import FavouriteButton from "../../Buttons/FavouriteButton/FavouriteButton";
import StarRating from "../../StarRating/StarRating";

import { ReactComponent as EditSVG } from "../../../assets/icons/edit.svg";

import markerSVG from "../../../assets/icons/location_blue.svg";
import markerShopSVG from "../../../assets/icons/location_orange.svg";
import markerBlackSVG from "../../../assets/icons/location_darkgrey.svg";

import { ReactComponent as PhoneSVG } from "../../../assets/icons/phone.svg";
import { ReactComponent as EmailSVG } from "../../../assets/icons/email.svg";
import { ReactComponent as LocationSVG } from "../../../assets/icons/location_default.svg";
import { ReactComponent as WebsiteSVG } from "../../../assets/icons/global.svg";
import { ReactComponent as FacebookSVG } from "../../../assets/icons/facebook.svg";
import { ReactComponent as InstagramSVG } from "../../../assets/icons/instagram.svg";
import { ReactComponent as TwitterSVG } from "../../../assets/icons/twitter.svg";

import placeholderImage from "../../../assets/images/placeholder_image.png";

import classes from "./MySitesMap.module.scss";
import "../GuestMap/GuestMap.css";

const MySitesMap = () => {
  const [selectedSite, setSelectedSite] = useContext(SiteContext);
  const [diveSites, setDiveSites] = useContext(DiveSitesContext);
  const [coords, setCoords] = useContext(CoordsContext);

  const [mapSize, setMapSize] = useContext(MapSizeContext);

  const [panelSize, setPanelSize] = useContext(PanelSizeContext);

  const [locateButtonStyle, setLocateButtonStyle] = useContext(
    LocateButtonContext
  );

  const loadDiveSites = useContext(LoadDiveSiteContext);

  const [isAuth, setIsAuth] = useContext(AuthContext);

  const [showEditModal, setShowEditModal] = useContext(EditModalContext);
  const [showAddModal, setShowAddModal] = useContext(AddModalContext);

  const [account, setAccount] = useContext(AccountContext);

  const [showDeleteModal, setShowDeleteModal] = useContext(DeleteModalContext);
  const handleDeleteClose = () => setShowDeleteModal(false);
  const handleDeleteShow = () => setShowDeleteModal(true);

  const [diveShops, setDiveShops] = useContext(DiveShopsContext);
  const [selectedShop, setSelectedShop] = useContext(ShopContext);
  const [editDiveShopModal, setEditDiveShopModal] = useContext(
    EditDiveShopModalContext
  );
  const [diveShopAdmin, setDiveShopAdmin] = useContext(DiveShopAdminContext);

  const editSiteHandler = () => {
    if (account.email == "patrick.minda@hotmail.com") {
      setShowDeleteModal(false);
      setShowEditModal(true);
    }
  };

  const onMarkerClustererClick = (markerClusterer) => {
    const clickedMarkers = markerClusterer.getMarkers();
  };

  return (
    <div>
      <MarkerClusterer
        onClick={onMarkerClustererClick}
        averageCenter
        gridSize={20}
        maxZoom={11}
        defaultZoomOnClick
      >
        {diveSites.map((site) => (
          <Marker
            key={site._id}
            position={{
              lat: parseFloat(site.latitude),
              lng: parseFloat(site.longitude),
            }}
            onClick={() => {
              setSelectedSite(site);
            }}
            icon={{
              url: markerSVG,
              scaledSize: new window.google.maps.Size(42, 42),
            }}
          />
        ))}
      </MarkerClusterer>

      <MarkerClusterer
        onClick={onMarkerClustererClick}
        averageCenter
        gridSize={20}
        maxZoom={11}
        defaultZoomOnClick
        styles={[
          { textColor: "white", height: 53, url: markerShopSVG, width: 53 },
        ]}
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
              if (account.email == "patrick.minda@hotmail.com") {
                setDiveShopAdmin(true);
                setEditDiveShopModal(true);
              }
            }}
            icon={{
              url: markerShopSVG,
              scaledSize: new window.google.maps.Size(42, 42),
            }}
          />
        ))}

        {coords && (
          <Marker
            key={"pressed coords"}
            position={{
              lat: parseFloat(coords.lat),
              lng: parseFloat(coords.lng),
            }}
            icon={{
              url: markerBlackSVG,
              scaledSize: new window.google.maps.Size(42, 42),
            }}
          />
        )}
      </MarkerClusterer>

      {selectedSite && (
        <InfoWindow
          position={{
            lat: parseFloat(selectedSite.latitude),
            lng: parseFloat(selectedSite.longitude),
          }}
          onCloseClick={() => {
            setShowEditModal(false);
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
                {selectedSite.siteType} · {selectedSite.suitable}
              </p>
            </div>

            <div className={classes.site__editContainer}>
              {account.email == "patrick.minda@hotmail.com" && (
                <EditSVG
                  className={classes.edit}
                  onClick={() => {
                    setShowAddModal(false);
                    editSiteHandler();
                  }}
                />
              )}
            </div>

            <div className={classes.site__nameContainer}>
              <h5 className={classes.name}>
                <a
                  href={"/divesite/" + selectedSite._id}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {selectedSite.name}, {selectedSite.suburb}
                </a>
              </h5>
            </div>

            <div className={classes.site__descriptionContainer}>
              <p className={classes.description}>
                {" "}
                {selectedSite.siteDescription
                  ? selectedSite.siteDescription
                  : "There is currently no description on this site. If you have any information, images or videos you wish to share with us, please contact us via email or social media."}
              </p>
            </div>

            {/* <div className={classes.site__ratingsContainer}>
                                <StarRating siteRatings = {selectedSite.ratings}/>
                            </div>             */}
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
            setShowEditModal(false);
            setEditDiveShopModal(false);
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
                className={classes.name}
                target="_blank"
                rel="noopener noreferrer"
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
                href={"https://www.google.com/search?q=" + selectedShop.address}
                target="_blank"
                rel="noopener noreferrer"
              >
                {selectedShop.address ? selectedShop.address : "N/A"}
              </a>
            </div>

            <div className={classes.shop__phoneContainer}>
              {/* Phone Icon */}
              <PhoneSVG className={`${classes.icon} ${classes.icon__phone}`} />
              <a href={"tel:" + selectedShop.phone}>
                {selectedShop.phone ? selectedShop.phone : "N/A"}
              </a>
            </div>

            <div className={classes.shop__emailContainer}>
              {/* Email Icon */}
              <EmailSVG className={`${classes.icon} ${classes.icon__email}`} />
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
                  : "N/A"}
              </a>
            </div>
          </div>
        </InfoWindow>
      )}
    </div>
  );
};

export default MySitesMap;

///
