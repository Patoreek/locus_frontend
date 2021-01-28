import React, { useState, useContext, useEffect, useRef } from "react";

import { useHistory } from "react-router-dom";
import { isMobile } from "react-device-detect";

import Spinner from "../../../components/Spinner/Spinner";
import { SpinnerCircular } from "spinners-react";

import InfiniteScroll from "react-infinite-scroll-component";

import {
  DiveSitesContext,
  SiteContext,
  DiveShopsContext,
  ShopContext,
  GeoAreaContext,
  ScubaFilterContext,
  SnorkelFilterContext,
  PanelDiveSitesContext,
  LoadDiveSiteInBoundsContext,
  LoadDiveSitesInBoundsInfiniteContext,
  ScrollCounterContext,
  HasMoreDataContext,
} from "../../../context/DiveSiteContext";

import {
  AuthContext,
  LocationNameContext,
  GlobalLoaderContext,
  MapRefContext,
  SearchCoordsContext,
} from "../../../context/AuthContext";
import ToggleButtons from "../ToggleButtons/ToggleButtons";

import DivesiteListingPanel from "../../../components/Divesite/DivesiteListingPanel/DivesiteListingPanel";

import DiveshopListingPanel from "../../../components/Diveshop/DiveshopListingPanel/DiveshopListingPanel";

import { ReactComponent as OrangeMarkerSVG } from "../../../assets/icons/location_orange.svg";
import { ReactComponent as BlueMarkerSVG } from "../../../assets/icons/location_blue.svg";

import classes from "./GuestPanel.module.scss";
import { callbackPromise } from "nodemailer/lib/shared";

const GuestPanel = () => {
  let history = useHistory();

  const [diveSites, setDiveSites] = useContext(DiveSitesContext);

  const [panelDiveSites, setPanelDiveSites] = useContext(PanelDiveSitesContext);

  const [diveShops, setDiveShops] = useContext(DiveShopsContext);

  const [selectedSite, setSelectedSite] = useContext(SiteContext);

  const [selectedShop, setSelectedShop] = useContext(ShopContext);

  const [locationName, setLocationName] = useContext(LocationNameContext);

  const [isAuth, setIsAuth] = useContext(AuthContext);

  const [list, setList] = useState("DiveSites");

  const [globalLoader, setGlobalLoader] = useContext(GlobalLoaderContext);

  const [geoArea, setGeoArea] = useContext(GeoAreaContext);

  const [scubaFilter, setScubaFilter] = useContext(ScubaFilterContext);
  const [snorkelFilter, setSnorkelFilter] = useContext(SnorkelFilterContext);

  const mapRef = useContext(MapRefContext);

  const loadDiveSitesInBoundsInfinite = useContext(
    LoadDiveSitesInBoundsInfiniteContext
  );

  const [scrollCounter, setScrollCounter] = useContext(ScrollCounterContext);

  const [hasMoreData, setHasMoreData] = useContext(HasMoreDataContext);

  const loadDiveSiteInBounds = useContext(LoadDiveSiteInBoundsContext);

  const [hightlightFilter, setHighlightFilter] = useState(false);

  const [initalLoad, setInitalLoad] = useState(false);

  const [filterPressed, setFilterPressed] = useState(false);

  const [searchCoordinates, setSearchCoordinates] = useContext(
    SearchCoordsContext
  );

  useEffect(() => {
    setInitalLoad(true);
    return () => {
      setScrollCounter(0);
    };
  }, []);

  useEffect(() => {
    if (isMobile) {
      getNearbyDiveSites(searchCoordinates.lat, searchCoordinates.lng);
      getNearbyDiveShops(searchCoordinates.lat, searchCoordinates.lng);
    }
  }, [searchCoordinates]);

  useEffect(() => {
    if (diveSites.length >= 1) {
      setList("DiveSites");
    } else if (diveShops.length >= 1) {
      setList("DiveShops");
    } else {
      setList(null);
    }
  }, [diveSites, diveShops]);

  useEffect(() => {
    if (initalLoad) {
      setHighlightFilter(true);
    }
  }, [scubaFilter, snorkelFilter]);

  let timer;

  const fetchData = () => {
    clearTimeout(timer);
    timer = setTimeout(function () {
      const lat = mapRef.current.getCenter().lat();
      const lng = mapRef.current.getCenter().lng();
      const mapBounds = mapRef.current.getBounds();
      loadDiveSitesInBoundsInfinite(mapBounds, scrollCounter);
    }, 1000);
  };

  const filterHandler = () => {
    setHighlightFilter(false);
    if (!isMobile) {
      const mapBounds = mapRef.current.getBounds();
      loadDiveSiteInBounds(mapBounds, setGlobalLoader);
      loadDiveSitesInBoundsInfinite(mapBounds, "TRUE");
    } else {
      // FILTER CURRENTLY NOT WORKING ON MOBILE (TO BE ADDED!)
    }
  };

  async function getNearbyDiveSites(lat, lng) {
    if (lat && lng) {
      return fetch(
        process.env.REACT_APP_ENV == "production"
          ? process.env.REACT_APP_BACKEND + "diveSites/findNearbyDiveSites"
          : process.env.REACT_APP_LOCAL_BACKEND +
              "diveSites/findNearbyDiveSites",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            lat: lat,
            lng: lng,
            //siteId: siteId,
          }),
        }
      )
        .then((res) => {
          return res.json();
        })
        .then((result) => {
          //console.log(result.sites);
          setDiveSites(result.sites);
          setPanelDiveSites(result.sites);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  async function getNearbyDiveShops(lat, lng) {
    //console.log("getting nearby dive shops");
    if (lat && lng) {
      return fetch(
        process.env.REACT_APP_ENV == "production"
          ? process.env.REACT_APP_BACKEND + "diveShops/findNearbyDiveShops"
          : process.env.REACT_APP_LOCAL_BACKEND +
              "diveShops/findNearbyDiveShops",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            lat: lat,
            lng: lng,
            //siteId: siteId,
          }),
        }
      )
        .then((res) => {
          return res.json();
        })
        .then((result) => {
          //console.log(result.shops);
          setDiveShops(result.shops);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  return (
    <div className={classes.guestPanel}>
      <div className={classes.topSection}>
        <div className={classes.topSection__legend}>
          <span>Dive Site</span>
          <BlueMarkerSVG className={classes.marker} />
          <span>Dive Shop</span>
          <OrangeMarkerSVG className={classes.marker} />
        </div>
        <p className={classes.topSection__totalSites}>
          {diveSites && diveSites.length < 100 ? diveSites.length : null}
          {diveSites && diveSites.length > 100 ? "100+" : null}
          {!diveSites ? "0" : null} sites · {locationName ? locationName : null}
          {!locationName && !globalLoader.diveshops && !globalLoader.divesites
            ? geoArea.area + " · " + geoArea.state
            : null}
        </p>
        <h3 className={classes.topSection__mapAreaText}>
          Dive sites {locationName ? locationName : null}
          {!locationName && !globalLoader.diveshops && !globalLoader.divesites
            ? "near " + geoArea.area + ", " + geoArea.state
            : null}
        </h3>

        <div className={classes.optionsContainer}>
          <div className={classes.optionsContainer__listType}>
            <span
              className={`${classes.link} ${
                list == "DiveSites" ? classes.linkActive : null
              }`}
              onClick={() => setList("DiveSites")}
            >
              ({diveSites.length}) Dive Sites
            </span>
            <span className={classes.linkSpacer}>·</span>
            <span
              className={`${classes.link} ${
                list == "DiveShops" ? classes.linkActive : null
              }`}
              onClick={() => setList("DiveShops")}
            >
              ({diveShops.length}) See Dive Shops
            </span>
          </div>

          <div className={classes.optionsContainer__filter}>
            <div className={classes.filter}>
              <div className={classes.filter__scubaFilter}>
                <input
                  type="checkbox"
                  checked={scubaFilter}
                  onChange={() => setScubaFilter(!scubaFilter)}
                  className={classes.filter__checkbox}
                />
                <span className={classes.filter__label}> Scuba </span>
              </div>
              <div className={classes.filter__snorkelFilter}>
                <input
                  type="checkbox"
                  checked={snorkelFilter}
                  onChange={() => setSnorkelFilter(!snorkelFilter)}
                  className={classes.filter__checkbox}
                />
                <span className={classes.filter__label}> Snorkel </span>
              </div>

              <div className={classes.filterBtn}>
                <button
                  className={`${classes.btn}  ${
                    hightlightFilter ? classes.highlight : null
                  }`}
                  onClick={filterHandler}
                >
                  Filter
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {list == "DiveSites" && (
        <div id="scrollableDiv" className={classes.scrollableDiv}>
          {!isMobile && (
            <InfiniteScroll
              className={classes.listings}
              dataLength={panelDiveSites.length}
              next={() => fetchData()}
              hasMore={hasMoreData}
              endMessage={
                <div className={classes.loadingData}>
                  <p className={classes.loadingData__end}>
                    No more Dive Sites in this area
                  </p>
                  <span className={classes.loadingData__instructions}>
                    Move the map or zoom in or out to load again.
                  </span>
                </div>
              }
              loader={
                <div className={classes.loadingData}>
                  <SpinnerCircular size={40} color={"#1263fa"} />
                </div>
              }
              scrollableTarget="scrollableDiv"
            >
              <div>
                {panelDiveSites.map((site, i) => (
                  <DivesiteListingPanel site={site} key={i} />
                ))}
              </div>
            </InfiniteScroll>
          )}
          {isMobile && (
            <div>
              {panelDiveSites.map((site, i) => (
                <DivesiteListingPanel site={site} key={i} />
              ))}
            </div>
          )}
        </div>
      )}
      {list == "DiveShops" && (
        <div id="scrollableDiv" className={classes.scrollableDiv}>
          <InfiniteScroll
            className={classes.listings}
            dataLength={diveShops.length}
            //next={() => fetchData()}
            //hasMore={true}
            endMessage={
              <div className={classes.loadingData}>
                <p className={classes.loadingData__end}>
                  No more Dive Shops in this area
                </p>
                <span className={classes.loadingData__instructions}>
                  Move the map or zoom in or out to load again.
                </span>
              </div>
            }
            loader={
              <div className={classes.loadingData}>
                <SpinnerCircular size={40} color={"#1263fa"} />
              </div>
            }
            scrollableTarget="scrollableDiv"
          >
            {list == "DiveShops" && (
              <div>
                {diveShops.map((shop, i) => (
                  <DiveshopListingPanel shop={shop} key={i} />
                ))}
              </div>
            )}
          </InfiniteScroll>
        </div>
      )}

      {diveSites.length == 0 && diveShops.length == 0 && (
        <div className={classes.noData}>
          <p className={classes.noData__end}>
            There are no dive sites or dive shops in this area
          </p>
          <span className={classes.noData__instructions}>
            Move the map or zoom in or out to load again.
          </span>
        </div>
      )}

      {globalLoader.divesites && globalLoader.diveshops && (
        <div className={classes.loadingContainer}>
          <p className={classes.loadingContainer__text}>Searching...</p>
          <Spinner />
        </div>
      )}
    </div>
  );
};

export default GuestPanel;
