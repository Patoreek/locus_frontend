import React, { useContext, useEffect, useState, useRef } from "react";

import { Button } from "react-bootstrap";

import { MdFavorite, MdFavoriteBorder } from "react-icons/md";

import {
  FavouritesContext,
  GetFavouritesContext,
  AccountContext,
} from "../../../context/AuthContext";

import { SiteContext } from "../../../context/DiveSiteContext";

import classes from "./FavouriteButton.module.scss";

const FavouriteButton = (props) => {
  const [favButton, setFavButton] = useState(true);

  const [selectedSite, setSelectedSite] = useContext(SiteContext);

  const [account, setAccount] = useContext(AccountContext);

  const [favourites, setFavourites] = useContext(FavouritesContext);

  const [site, setSite] = useState(null);

  const getFavourites = useContext(GetFavouritesContext);

  const isChecked = useRef(true);

  useEffect(() => {
    setSite(props.site);
    if (isChecked) {
      checkUserRelation();
    }
    return () => (isChecked.current = false);
  }, []);

  async function removeFromFavourite(selectedSite, setIsLoading) {
    const response = await fetch(
      "http://localhost:8080/user/removeFromFavourite",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          selectedSiteId: props.site._id,
          userId: account.id,
        }),
      }
    );
    const data = await response.json();
    if (data.removedFav) {
      setFavourites(data.updatedFav);
      setFavButton(false);
      if (setIsLoading !== null) {
        getFavourites(setIsLoading);
      } else {
        getFavourites();
      }
    } else {
      setFavButton(true);
    }
  }

  async function checkUserRelation() {
    const response = await fetch("http://localhost:8080/user/checkFavourites", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        selectedSiteId: props.site._id,
      }),
    });
    const data = await response.json();
    const isFav = data.isFav;
    if (isFav) {
      setFavButton(true);
    } else {
      setFavButton(false);
    }
  }

  async function addToFavourite() {
    const response = await fetch("http://localhost:8080/user/addToFavourite", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        selectedSiteId: props.site._id,
        userId: account.id,
      }),
    });
    const data = await response.json();

    setFavButton(true);
  }

  let favouriteButton;
  if (favButton) {
    favouriteButton = (
      <MdFavorite
        size={20}
        className={classes.favouriteIcon}
        onClick={() => removeFromFavourite(selectedSite)}
        style={props.style}
      />
    );
  } else {
    favouriteButton = (
      <MdFavoriteBorder
        size={20}
        className={classes.favouriteIcon}
        onClick={() => addToFavourite(selectedSite)}
        style={props.style}
      />
    );
  }

  return <div>{favouriteButton}</div>;
};

export default FavouriteButton;
