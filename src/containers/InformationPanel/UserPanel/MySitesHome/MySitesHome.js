import React, { useContext, useEffect, useState } from "react";

import classes from "./MySitesHome.module.scss";

import { AccountContext } from "../../../../context/AuthContext";
import {
  AddModalContext,
  EditModalContext,
  DeleteModalContext,
  AddRequestContext,
  SiteListContext,
  DiveShopAdminContext,
} from "../../../../context/UserContext";

import DiveShopsView from "../DiveShopsView/DiveShopsView";
import DiveSitesView from "../DiveSitesView/DiveSitesView";

import { ReactComponent as ClickSVG } from "../../../../assets/icons/click.svg";
import { ReactComponent as FillFormSVG } from "../../../../assets/icons/fill_form.svg";
import { ReactComponent as SubmitTickSVG } from "../../../../assets/icons/submit_tick.svg";

import { ReactComponent as BgSVG } from "../../../../assets/images/AddDiveSiteBG.svg";

import { ReactComponent as DiverSVG } from "../../../../assets/images/add_diver.svg";
import { ReactComponent as GlobeSVG } from "../../../../assets/images/globe_connections.svg";
import { ReactComponent as AustraliaSVG } from "../../../../assets/images/Australia.svg";

const UserSiteList = () => {
  const [account, setAccount] = useContext(AccountContext);

  const [sites, setSites] = useState(null);
  const [shops, setShops] = useState(null);

  const [showEditModal, setShowEditModal] = useContext(EditModalContext);
  const [showAddModal, setShowAddModal] = useContext(AddModalContext);
  const [showDeleteModal, setShowDeleteModal] = useContext(DeleteModalContext);
  const [showAddRequestModal, setShowAddRequestModal] = useContext(
    AddRequestContext
  );
  const [showSiteList, setShowSiteList] = useContext(SiteListContext);

  const [diveShopAdmin, setDiveShopAdmin] = useContext(DiveShopAdminContext);
  const [diveSitesLoaded, setDiveSitesLoaded] = useState(false);
  const [diveShopsLoaded, setDiveShopsLoaded] = useState(false);
  const [listLoading, setListLoading] = useState(true);

  useEffect(() => {
    async function loadMyDiveSites() {
      // console.log('[UserSiteList] Account = ' + account.id);
      // You can await here
      try {
        const response = await fetch(
          "http://localhost:8080/diveSites/mySites/" + account.id,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        //const sites = data.sites;
        setSites(data.sites);
        setDiveSitesLoaded(true);
      } catch (err) {}
    }

    loadMyDiveSites();
    //console.log('[UserSiteList]' + sites);
  }, [showAddModal, showDeleteModal, showEditModal]);

  useEffect(() => {
    async function loadMyDiveShops() {
      // console.log('[UserSiteList] Account = ' + account.id);
      // You can await here
      try {
        const response = await fetch(
          "http://localhost:8080/diveShops/myShops/" + account.id,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        console.log(data.shops);
        setShops(data.shops);
        setDiveShopsLoaded(true);
      } catch (err) {}
    }

    loadMyDiveShops();
  }, []);

  useEffect(() => {
    if (diveShopsLoaded && diveSitesLoaded) {
      setListLoading(false);
    }
  }, [diveShopsLoaded, diveSitesLoaded]);

  return (
    <div>
      {/* //* WHAT IS DISPLAYED INITIALLY TO ADMIN */}
      {!listLoading &&
        !showAddRequestModal &&
        !diveShopAdmin &&
        account.email != "patrick.minda@hotmail.com" && (
          <div className={classes.mySitesHome}>
            {/* <BgSVG className={classes.mySitesHome__background} /> */}
            <h3 className={classes.mySitesHome__header}>
              Add a Dive Site, simply:
            </h3>
            <div className={classes.mySitesHome__stepsContainer}>
              <div className={`${classes.step} ${classes.step__1}`}>
                <span className={classes.step__number}>1</span>
                <ClickSVG className={classes.step__icon} />
                <span className={classes.step__text}>
                  Click location on the map
                </span>
              </div>
              <div className={`${classes.step} ${classes.step__2}`}>
                <span className={classes.step__number}>2</span>
                <FillFormSVG className={classes.step__icon} />
                <span className={classes.step__text}>Fill in the form</span>
              </div>
              <div className={`${classes.step} ${classes.step__3}`}>
                <span className={classes.step__number}>3</span>
                <SubmitTickSVG className={classes.step__icon} />
                <span className={classes.step__text}>Submit, you're done!</span>
              </div>
            </div>
            <div className={classes.mySitesHome__duplicate}>
              <DiverSVG className={classes.image} />
              <p className={classes.text}>
                To avoid duplicates dive sites being added, we will review the
                dive site you wish to add and check whether the dive site is
                already in the system and check if the dive site a valid dive
                location.
              </p>
            </div>
            <div className={classes.mySitesHome__gather}>
              <p className={classes.text}>
                We are continously adding new dive sites across the world.
                Currently working on gathering dive sites and shops in
                Australia, we hope to expand throughout oceania and the rest of
                the world.
              </p>
              <GlobeSVG className={classes.image} />
            </div>

            <div className={classes.mySitesHome__contact}>
              <AustraliaSVG className={classes.image} />
              <p className={classes.text}>
                If you have information of dive sites and shops you're willing
                to share, please contact us via email and social media.
              </p>
            </div>
          </div>
        )}

      {/* //* WHAT IS DISPLAYED INITIALLY TO ADMIN */}
      {!listLoading &&
        !showAddRequestModal &&
        !diveShopAdmin &&
        account.email === "patrick.minda@hotmail.com" && (
          <div className={classes.addRequestContainer}>
            <h3 className={classes.addRequestContainer__header}>
              My Sites · Add & Edit Sites
            </h3>
            <p className={classes.addRequestContainer__instructions}>
              To add a dive site, simply press on the map at the location. A
              form will appear and fill out the details.
            </p>
            <div className={classes.diveShopBtnContainer}>
              <button
                onClick={() => setDiveShopAdmin(true)}
                className={classes.diveShopBtn}
              >
                {" "}
                See Dive shops
              </button>
            </div>
          </div>
        )}

      {!listLoading &&
        !diveShopAdmin &&
        account.email === "patrick.minda@hotmail.com" && (
          <DiveSitesView sites={sites} />
        )}

      {diveShopAdmin && <DiveShopsView shops={shops} />}
    </div>
  );
};

export default UserSiteList;
