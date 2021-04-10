import React, { useState, useContext, useEffect } from "react";

import InformationPanel from "../../components/InformationPanel/InformationPanel";
import { isMobile } from "react-device-detect";

import { SiteContext, CoordsContext } from "../../context/DiveSiteContext";
import {
  AuthContext,
  LoadingContext,
  MapSizeContext,
  AccountContext,
} from "../../context/AuthContext";

import {
  AddModalContext,
  EditModalContext,
  DeleteModalContext,
  DiveShopAdminContext,
  AddDiveShopModalContext,
  EditDiveShopModalContext,
  DeleteDiveShopModalContext,
} from "../../context/UserContext";

import { useHistory } from "react-router-dom";

import Map from "../../components/Map/Map";
import classes from "./UserView.module.scss";

const UserView = (props) => {
  const [coords, setCoords] = useContext(CoordsContext);
  const [selectedSite, setSelectedSite] = useContext(SiteContext);
  const [mapSize, setMapSize] = useContext(MapSizeContext);
  const [account, setAccount] = useContext(AccountContext);

  const [isAuth, setIsAuth] = useContext(AuthContext);
  const [isLoading, setIsLoading] = useContext(LoadingContext);

  const [userViewLoaded, setUserViewLoaded] = useState(false);

  const [showAddModal, setShowAddModal] = useContext(AddModalContext);

  const [showEditModal, setShowEditModal] = useContext(EditModalContext);
  const [showDeleteModal, setShowDeleteModal] = useContext(DeleteModalContext);

  const [diveShopAdmin, setDiveShopAdmin] = useContext(DiveShopAdminContext);

  const [addDiveShopModal, setAddDiveShopModal] = useContext(
    AddDiveShopModalContext
  );
  const [editDiveShopModal, setEditDiveShopModal] = useContext(
    EditDiveShopModalContext
  );
  const [deleteDiveShopModal, setDeleteDiveShopModal] = useContext(
    DeleteDiveShopModalContext
  );

  const handleClose = () => setShowAddModal(false);
  const handleShow = () => setShowAddModal(true);

  let history = useHistory();

  useEffect(() => {
    console.log("[UserView] isBusy in IF = " + isLoading);
    console.log("[UserView] isAuth in IF = " + isAuth);
    if (!isAuth) {
      history.replace("/login");
    }
    setUserViewLoaded(true);

    return () => {
      setUserViewLoaded(false);
    };
  }, []);

  const onMapClick = (event) => {
    if (diveShopAdmin) {
      setCoords({
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
      });
      setAddDiveShopModal(true);
    } else {
      if (showEditModal) {
        setShowEditModal(false);
      } else if (showDeleteModal) {
        setShowDeleteModal(false);
      } else if (selectedSite !== null) {
        setSelectedSite(null);
      } else {
        setCoords({
          lat: event.latLng.lat(),
          lng: event.latLng.lng(),
        });
        handleShow();
      }
      if (showAddModal) {
        setShowAddModal(true);
        setSelectedSite(null);
      }
    }
  };

  return (
    <div className={classes.userView}>
      {userViewLoaded && <InformationPanel />}
      {userViewLoaded && (
        <Map
          googleMapURL={process.env.REACT_APP_GOOGLE_MAPS_KEY}
          loadingElement={
            <div
              className={`${classes.loadingElement} ${
                isMobile ? classes.mobile : null
              }`}
            />
          }
          containerElement={
            <div
              className={`${classes.containerElement} ${
                isMobile ? classes.mobile : null
              }`}
            />
          }
          mapElement={
            <div
              className={`${classes.mapElement} ${
                isMobile ? classes.mobile : null
              }`}
            />
          }
          onMapClick={onMapClick}
          coords={coords}
        />
      )}
    </div>
  );
};

export default UserView;
