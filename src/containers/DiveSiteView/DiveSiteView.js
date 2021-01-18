import React, { useState, useContext, useEffect } from "react";

import { SiteContext } from "../../context/DiveSiteContext";

import { AuthContext, AuthDrawerContext } from "../../context/AuthContext";

import DisplayReport from "../../components/DiveReport/DisplayReport/DisplayReport";
import StarRating from "../../components/StarRating/StarRating";
import Comments from "../../components/Comments/Comments";
import FavouriteButton from "../../components/Buttons/FavouriteButton/FavouriteButton";

//* ACCESS ICONS
import { ReactComponent as BeachSVG } from "../../assets/icons/shore.svg";
import { ReactComponent as DockSVG } from "../../assets/icons/dock.svg";
import { ReactComponent as BoatSVG } from "../../assets/icons/boat.svg";
import { ReactComponent as RocksSVG } from "../../assets/icons/rocks.svg";
import { ReactComponent as RampSVG } from "../../assets/icons/ramp.svg";

//* SITE TYPE ICONS
import { ReactComponent as ReefSVG } from "../../assets/icons/reef.svg";
import { ReactComponent as BridgeSVG } from "../../assets/icons/bridge.svg";
import { ReactComponent as CaveSVG } from "../../assets/icons/cave.svg";
import { ReactComponent as DeepSVG } from "../../assets/icons/deep.svg";
import { ReactComponent as DriftSVG } from "../../assets/icons/drift.svg";
import { ReactComponent as IceSVG } from "../../assets/icons/ice.svg";
import { ReactComponent as WreckSVG } from "../../assets/icons/wreck.svg";

import { ReactComponent as DepthSVG } from "../../assets/icons/depth.svg";
import { ReactComponent as XpSVG } from "../../assets/icons/experience.svg";
import { ReactComponent as TemperatureSVG } from "../../assets/icons/temperature.svg";
import { ReactComponent as GoogleMapSVG } from "../../assets/icons/google-map-icon.svg";
import { ReactComponent as VisibilitySVG } from "../../assets/icons/visibility.svg";

import DivesiteListingPanel from "../../components/Divesite/DivesiteListingPanel/DivesiteListingPanel";
import DiveshopListingPanel from "../../components/Diveshop/DiveshopListingPanel/DiveshopListingPanel";

import DisplayImage from "../../components/DisplayImage/DisplayImage";

import GoogleMapLocation from "../../components/LocationMap/GoogleMapLocation";

import WeatherContainer from "../../components/WeatherContainer/WeatherContainer";
import CommPhotoPreview from "../../components/CommPhotoPreview/CommPhotoPreview";

import Spinner from "../../components/Spinner/Spinner";

import placeholderImage from "../../assets/images/placeholder_image.png";

import classes from "./DiveSiteView.module.scss";

const DiveSiteView = (props) => {
  const siteId = props.match.params.id;

  const [selectedSite, setSelectedSite] = useContext(SiteContext);
  const [isAuth, setIsAuth] = useContext(AuthContext);
  const [authDrawer, setAuthDrawer] = useContext(AuthDrawerContext);

  const [site, setSite] = useState(null);
  const [siteName, setSiteName] = useState();
  const [siteSuburb, setSiteSuburb] = useState();
  const [linkSuburb, setLinkSuburb] = useState();
  const [siteCity, setSiteCity] = useState();
  const [siteState, setSiteState] = useState();
  const [siteCountry, setSiteCountry] = useState();
  const [siteImages, setSiteImages] = useState([]);
  const [siteType, setSiteType] = useState();
  const [siteAccess, setSiteAccess] = useState();
  const [siteDescription, setSiteDescription] = useState();
  const [siteAvgDepth, setSiteAvgDepth] = useState();
  const [siteMaxDepth, setSiteMaxDepth] = useState();
  const [siteMinTemp, setSiteMinTemp] = useState();
  const [siteMaxTemp, setSiteMaxTemp] = useState();
  const [siteMinVis, setSiteMinVis] = useState();
  const [siteMaxVis, setSiteMaxVis] = useState();
  const [siteSuitable, setSiteSuitable] = useState();
  const [siteExperience, setSiteExperience] = useState();

  const [siteLatitude, setSiteLatitude] = useState();
  const [siteLongitude, setSiteLongitude] = useState();

  const [reports, setReports] = useState([]);

  const [mainImage, setMainImage] = useState();

  const [shops, setShops] = useState([]);

  const [nearbySites, setNearbySites] = useState([]);

  const [enlargeImage, setEnlargeImage] = useState(false);

  const [placeholders, setPlaceholders] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  const [key, setKey] = useState("features");

  const weekday = new Array(7);
  weekday[0] = "Sun";
  weekday[1] = "Mon";
  weekday[2] = "Tues";
  weekday[3] = "Wed";
  weekday[4] = "Thur";
  weekday[5] = "Fri";
  weekday[6] = "Sat";

  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  useEffect(() => {
    async function getSite() {
      try {
        const response = await fetch(
          "http://localhost:8080/diveSites/findSite/" + siteId,
          {
            method: "GET",
            credentials: "include",
          }
        );
        const results = await response.json();
        const site = results.site;
        setSite(site);
        setSiteName(site.name);
        setSiteSuburb(site.suburb);
        setSiteCity(site.city);
        setSiteState(site.state);
        setSiteCountry(site.country);
        setSiteImages(site.images);
        setSiteType(site.siteType);
        setSiteAccess(site.access);
        setSiteDescription(site.description.replace("/n", "<br/>"));
        setSiteAvgDepth(site.avgDepth);
        setSiteMaxDepth(site.maxDepth);
        setSiteMinTemp(site.minTemp);
        setSiteMaxTemp(site.maxTemp);
        setSiteMinVis(site.minVis);
        setSiteMaxVis(site.maxVis);
        setSiteSuitable(site.suitable);
        setSiteExperience(site.experience);

        setSiteLongitude(site.longitude);
        setSiteLatitude(site.latitude);

        setSiteLatitude(site.latitude);
        setSiteLongitude(site.longitude);
        getNearbyDiveSites(site.latitude, site.longitude);
        setSelectedSite(site);

        if (site.suburb == "(Open Water)" || site.suburb == "N/A") {
          setLinkSuburb("Dive Site");
        } else {
          setLinkSuburb(site.suburb);
        }

        setIsLoading(false);

        if (site.images.length < 5) {
          const totalPlaceholders = 5 - site.images.length;
          let array = [];
          for (let i = 0; i < totalPlaceholders; i++) {
            array.push("");
          }
          setPlaceholders(array);
        }

        setMainImage(site.images[0]);
      } catch (error) {
        console.log(error);
      }
    }

    async function getReportsForSite() {
      try {
        const response = await fetch(
          "http://localhost:8080/user/diveReports/getReportsForSite/" + siteId,
          {
            method: "GET",
            credentials: "include",
          }
        );
        const results = await response.json();
        setReports(results.reportsData);
      } catch (error) {
        console.log(error);
      }
    }

    async function getAssociatedShops() {
      try {
        const response = await fetch(
          "http://localhost:8080/diveSites/getAssociatedShops/" + siteId,
          {
            method: "GET",
            credentials: "include",
          }
        );
        const shops = await response.json();
        setShops(shops.shops);
      } catch (error) {
        console.log(error);
      }
    }

    async function getNearbyDiveSites(lat, lng) {
      return fetch("http://localhost:8080/diveSites/findNearbyDiveSites", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          lat: lat,
          lng,
          lng,
          siteId: siteId,
        }),
      })
        .then((res) => {
          return res.json();
        })
        .then((result) => {
          setNearbySites(result.sites);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    getAssociatedShops();
    getReportsForSite();
    getSite();
  }, []);

  useEffect(() => {
    if (!siteName || !siteSuburb) {
      document.title = "Locus - Divesite";
    } else {
      document.title = "Locus - " + siteName + " · " + siteSuburb;
    }
  }, [isLoading]);

  const imageHandler = (image) => {
    setMainImage(image);
  };

  return (
    <div className={classes.container}>
      {!isLoading && (
        <div className={classes.divesite}>
          {enlargeImage && (
            <DisplayImage
              image={mainImage}
              site={site}
              suburb={site.suburb}
              setEnlargeImage={setEnlargeImage}
            />
          )}

          <div className={classes.divesite__locationTop}>
            <a
              target="_blank"
              href={
                "http://www.google.com/search?q=" +
                siteName +
                "%2C+" +
                linkSuburb +
                "%2C+" +
                siteCountry
              }
            >
              {siteName} · {linkSuburb} · {siteCity} · {siteCountry}
            </a>
          </div>

          {/* //TODO: IMAGE GRID CONTAINER ////////////////// */}
          <div className={classes.divesite__imageGridContainer}>
            <div
              className={`${classes.image} ${classes.image__1}`}
              onClick={() => setEnlargeImage(true)}
            >
              <img
                className={classes.image}
                src={
                  mainImage
                    ? "http://localhost:8080/" + mainImage
                    : placeholderImage
                }
              />
            </div>

            <div className={classes.rightContainer}>
              {siteImages.map((image, i) => (
                <div
                  className={classes.imageContainer}
                  key={i}
                  onClick={() => {
                    imageHandler(image);
                  }}
                >
                  <img
                    className={classes.image}
                    src={"http://localhost:8080/" + image}
                  />
                </div>
              ))}
              {placeholders.map((placeholder, i) => (
                <div className={classes.imageContainer} key={i}>
                  <img className={classes.image} src={placeholderImage} />
                </div>
              ))}
            </div>
          </div>

          {/* //TODO: END IMAGE GRID CONTAINER ////////////////// */}
          <div className={classes.nameContainer}>
            <h3 className={classes.name}>
              {siteName} · {siteSuburb == "N/A" ? null : siteSuburb + " · "}{" "}
              {siteCity} · {siteCountry}
            </h3>
            <a
              target="_blank"
              href={
                "http://www.google.com/search?q=" +
                siteName +
                "%2C+" +
                linkSuburb +
                "%2C+" +
                siteCity +
                "%2C+" +
                siteCountry
              }
            >
              {siteName}, {linkSuburb}, {siteCity}, {siteCountry}
            </a>
            <a
              target="_blank"
              href={
                "https://maps.google.com/?q=" +
                siteLatitude +
                "," +
                siteLongitude
              }
            >
              <GoogleMapSVG className={classes.googleMapSVG} />
            </a>
            <div className={classes.ratingsContainer}>
              <div className={classes.ratingsContainer__rating}>
                {/* <StarRating site={selectedSite}/> */}
              </div>
              <div className={classes.ratingsContainer__favBtn}>
                {isAuth ? <FavouriteButton site={selectedSite} /> : null}
              </div>
            </div>
          </div>

          <div className={classes.leftContainer}>
            <div className={classes.leftContainer__points}>
              <div className={classes.point}>
                {siteAccess == "Beach" ? (
                  <BeachSVG className={classes.point__icon} />
                ) : null}
                {siteAccess == "Boat" ? (
                  <BoatSVG className={classes.point__icon} />
                ) : null}
                {siteAccess == "Rocks" ? (
                  <RocksSVG className={classes.point__icon} />
                ) : null}
                {siteAccess == "Ramp" ? (
                  <RampSVG className={classes.point__icon} />
                ) : null}
                {siteAccess == "Dock" ? (
                  <DockSVG className={classes.point__icon} />
                ) : null}

                <div className={classes.point__text}>
                  <span>Access from {siteAccess}</span>
                </div>
              </div>
              <div className={classes.point}>
                {siteType == "Reef" ? (
                  <ReefSVG className={classes.point__icon} />
                ) : null}
                {siteType == "Wall" ? (
                  <ReefSVG className={classes.point__icon} />
                ) : null}
                {siteType == "Bridge" ? (
                  <BridgeSVG className={classes.point__icon} />
                ) : null}
                {siteType == "Cave" ? (
                  <CaveSVG className={classes.point__icon} />
                ) : null}
                {siteType == "Deep" ? (
                  <DeepSVG className={classes.point__icon} />
                ) : null}
                {siteType == "Drift" ? (
                  <DriftSVG className={classes.point__icon} />
                ) : null}
                {siteType == "Ice" ? (
                  <IceSVG className={classes.point__icon} />
                ) : null}
                {siteType == "Wreck" ? (
                  <WreckSVG className={classes.point__icon} />
                ) : null}

                <div className={classes.point__text}>
                  <span>{siteType} Dive</span>
                </div>
              </div>
              <div className={classes.point}>
                <DepthSVG className={classes.point__icon} />
                <div className={classes.point__text}>
                  <span>Max Depth: {siteMaxDepth ? siteMaxDepth : "?"}m</span>
                  <span>
                    Average Depth: {siteAvgDepth ? siteAvgDepth : "?"}m
                  </span>
                </div>
              </div>
              <div className={classes.point}>
                <XpSVG className={classes.point__icon} />
                <div className={classes.point__text}>
                  <span>{siteExperience}</span>
                  <span>{siteSuitable}</span>
                </div>
              </div>
              <div className={classes.point}>
                <TemperatureSVG className={classes.point__icon} />
                <div className={classes.point__text}>
                  <span>
                    {siteMinTemp ? siteMinTemp : "?"}°C -{" "}
                    {siteMaxTemp ? siteMaxTemp : "?"}°C
                  </span>
                </div>
              </div>
              <div className={classes.point}>
                <VisibilitySVG className={classes.point__icon} />
                <div className={classes.point__text}>
                  <span>
                    {siteMinVis ? siteMinVis : "?"}m -{" "}
                    {siteMaxVis ? siteMaxVis : "?"}m
                  </span>
                </div>
              </div>
            </div>

            <div className={classes.leftContainer__descriptionHeaderContainer}>
              <h3>Description</h3>
            </div>
            <div className={classes.leftContainer__descriptionContainer}>
              <p className={classes.description}>
                {siteDescription
                  ? siteDescription
                  : "There is currently no description on this site. If you have any information, images or videos you wish to share with us, please contact us via email or social media."}
              </p>
              <p className={classes.contribute}>
                *If you wish to contribute to adding information, images or
                videos for this dive site, please contact us via email or social
                media
              </p>
            </div>

            {reports != [] && (
              <div className={classes.leftContainer__reportsContainer}>
                <h4>Dive Reports ({reports.length})</h4>
                {reports.map((report, i) => (
                  <DisplayReport report={report} key={i} />
                ))}
              </div>
            )}
            <div className={classes.leftContainer__mapHeaderContainer}>
              <h3>Location</h3>
            </div>
            <div className={classes.leftContainer__mapContainer}>
              <GoogleMapLocation location={site} />
            </div>

            {reports.length == 0 && (
              <div className={classes.leftContainer__reportsContainer}>
                <h4>Dive Reports (0)</h4>
                <div className={classes.noReports}>
                  <h3>
                    There are currently no dive reports for this location.
                  </h3>
                  {isAuth ? (
                    <a href="/profile/diveReports">Add a Dive Report</a>
                  ) : (
                    <span
                      onClick={() =>
                        setAuthDrawer({
                          open: true,
                          login: true,
                          signup: false,
                        })
                      }
                    >
                      Log in
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className={classes.divesite__rightContainer}>
            <div className={classes.commPhotosContainer}>
              <a
                href={"/communityphotos/" + siteId}
                className={classes.photoLink}
              >
                See all community photos
              </a>
              <CommPhotoPreview siteId={siteId} />
            </div>
            <div className={classes.weatherContainer}>
              <WeatherContainer site={selectedSite} />
            </div>

            <div className={classes.shopContainer}>
              <h3> Dive Shops that dive at {siteName}</h3>
              {shops.length == 0 && (
                <div className={classes.noShops}>
                  <h3 className={classes.noShops__text}>
                    There are no shops associated with {siteName} yet.
                  </h3>
                  <p className={classes.noShops__contact}>
                    If you know any dive shops that dive at {siteName} please
                    contact us via email or social media.
                  </p>
                </div>
              )}
              {shops.map((shop, i) => (
                <DiveshopListingPanel shop={shop} key={i} />
              ))}
            </div>

            <div className={classes.nearbyDiveSites}>
              <h3> Dive Sites that are near {siteName}</h3>
              {nearbySites.length == 0 && (
                <div className={classes.noNearbySites}>
                  <h3 className={classes.noNearbySites__text}>
                    There are no dive sites near {siteName}.
                  </h3>
                  <p className={classes.noNearbySites__contact}>
                    If you know any dive sites near {siteName} please contact us
                    via email or social media.
                  </p>
                </div>
              )}
              {nearbySites.map((site, i) => (
                <DivesiteListingPanel site={site} key={i} />
              ))}
            </div>
          </div>
        </div>
      )}
      {isLoading && (
        <div className={classes.spinnerContainer}>
          <Spinner />
        </div>
      )}
    </div>
  );
};

export default DiveSiteView;
