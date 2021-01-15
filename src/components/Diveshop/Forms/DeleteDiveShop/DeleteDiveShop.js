import React, { useState, useContext } from "react";
import classes from "./DeleteDiveShop.module.scss";

import { useHistory } from "react-router-dom";

import { DeleteDiveShopModalContext } from "../../../../context/UserContext";

import { ShopContext } from "../../../../context/DiveSiteContext";

const DeleteDiveShop = () => {
  const [deleteDiveShopModal, setDeleteDiveShopModal] = useContext(
    DeleteDiveShopModalContext
  );
  const [selectedShop, setSelectedShop] = useContext(ShopContext);

  let history = useHistory();

  const deleteHandler = () => {
    fetch("http://localhost:8080/diveShops/deleteShop/" + selectedShop._id, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Deleting a site failed!");
        }
        return res.json();
      })
      .then((resData) => {
        setDeleteDiveShopModal(false);
        history.push("/mySites");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const cancelHandler = () => {
    setDeleteDiveShopModal(false);
  };

  return (
    <div>
      <span
        onClick={() => setDeleteDiveShopModal(false)}
        className={classes.backBtn}
      >
        Back
      </span>
      {selectedShop ? (
        <h2>Are you sure you want to delete {selectedShop.name}?</h2>
      ) : null}
      <div className={classes.btnContainer}>
        <button
          onClick={cancelHandler}
          className={`${classes.btn} ${classes.btn__cancel}`}
        >
          Cancel
        </button>

        <button
          onClick={deleteHandler}
          className={`${classes.btn} ${classes.btn__delete}`}
        >
          Delete
        </button>
      </div>
      Delete a dive shop modal...
    </div>
  );
};

export default DeleteDiveShop;
