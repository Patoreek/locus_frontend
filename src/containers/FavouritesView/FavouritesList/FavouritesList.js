import React, { useContext, useEffect } from "react";

import classes from "./FavouritesList.module.scss";

import {
  RemoveFavContext,
  FavouritesContext,
  AccountContext,
  GetFavouritesContext,
} from "../../../context/AuthContext";

import { SiteContext } from "../../../context/DiveSiteContext";

import DivesiteListingPanel from "../../../components/Divesite/DivesiteListingPanel/DivesiteListingPanel";

import { MdFavoriteBorder } from "react-icons/md";

const FavouritesList = (props) => {
  const [selectedSite, setSelectedSite] = useContext(SiteContext);

  const [favourites, setFavourites] = useContext(FavouritesContext);

  const [account, setAccount] = useContext(AccountContext);

  const getFavourites = useContext(GetFavouritesContext);

  const removeFromFavourite = useContext(RemoveFavContext);

  return (
    <div className={classes.favouritesList}>
      <h1 className={classes.favouritesList__header}>
        Favourites · {favourites.length} Dive sites
      </h1>{" "}
      {favourites.length <= 0 && (
        <div className={classes.noFavourites}>
          <h3 className={classes.noFavourites__title}>No Favourites!</h3>
          <p className={classes.noFavourites__text}>
            Visit a dive site and press the{" "}
            <MdFavoriteBorder className={classes.noFavourites__icon} /> to add
            the site to your favourites
          </p>
          <a href="/map" className={classes.noFavourites__btn}>
            Explore now!
          </a>
        </div>
      )}
      {favourites.length > 0 && (
        <div className={classes.favourites}>
          {favourites.map((favourite, i) => (
            <DivesiteListingPanel site={favourite} key={i} />
          ))}
        </div>
      )}
    </div>
  );
};

export default FavouritesList;
