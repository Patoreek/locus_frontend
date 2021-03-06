import React, { useState, useContext } from "react";

import { Button } from "react-bootstrap";

import classes from "./DeleteContainer.module.scss";

import {
  SiteContext,
  DiveSitesContext,
  LoadDiveSiteContext,
} from "../../../../context/DiveSiteContext";

import {
  DeleteModalContext,
  EditModalContext,
  AddRequestContext,
  AddModalContext,
} from "../../../../context/UserContext";

import { useHistory } from "react-router-dom";

const DeleteContainer = (props) => {
  const [selectedSite, setSelectedSite] = useContext(SiteContext);
  const [diveSites, setDiveSites] = useContext(DiveSitesContext);
  const loadDiveSites = useContext(LoadDiveSiteContext);

  const [showEditModal, setShowEditModal] = useContext(EditModalContext);
  const [showAddModal, setShowAddModal] = useContext(AddModalContext);
  const [showDeleteModal, setShowDeleteModal] = useContext(DeleteModalContext);
  const [showAddRequestModal, setShowAddRequestModal] = useContext(
    AddRequestContext
  );

  let history = useHistory();

  const deleteSiteHandler = (event) => {
    event.preventDefault();
    // console.log("Deleting name " + selectedSite.name);
    // console.log("Deleting id " + selectedSite._id);
    const siteId = selectedSite._id;

    fetch(
      process.env.REACT_APP_BACKEND + "diveSites/deleteDiveSite/" + siteId,
      {
        method: "DELETE",
      }
    )
      .then((res) => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Deleting a site failed!");
        }
        return res.json();
      })
      .then((resData) => {
        //console.log("[resData] = " + resData.message);
        setShowEditModal(false);
        setShowAddModal(false);
        setShowDeleteModal(false);
        setShowAddRequestModal(false);
        loadDiveSites();
        setSelectedSite(null);
        history.push("/mySites");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const cancelDeleteHandler = (event) => {
    event.preventDefault();
    setShowDeleteModal(false);
  };

  return (
    <div className={classes.form}>
      <h1 className={classes.header}>
        Are you sure you want to delete {selectedSite.name},{" "}
        {selectedSite.suburb}, {selectedSite.city}?
      </h1>

      <div className={classes.buttonContainer}>
        <Button
          variant="danger"
          onClick={deleteSiteHandler}
          className={classes.yesButton}
        >
          Yes
        </Button>
        <Button
          variant="primary"
          onClick={cancelDeleteHandler}
          className={classes.noButton}
        >
          No
        </Button>
      </div>
    </div>
  );
};

export default DeleteContainer;
