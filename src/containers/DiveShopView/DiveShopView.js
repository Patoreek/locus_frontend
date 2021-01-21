import React, { useState, useEffect } from "react";

import classes from "./DiveShopView.module.scss";

import { ReactComponent as PhoneSVG } from "../../assets/icons/phone.svg";
import { ReactComponent as EmailSVG } from "../../assets/icons/email.svg";
import { ReactComponent as LocationSVG } from "../../assets/icons/location_default.svg";
import { ReactComponent as WebsiteSVG } from "../../assets/icons/global.svg";
import { ReactComponent as FacebookSVG } from "../../assets/icons/facebook.svg";
import { ReactComponent as InstagramSVG } from "../../assets/icons/instagram.svg";
import { ReactComponent as TwitterSVG } from "../../assets/icons/twitter.svg";

import DivesiteListingPanel from "../../components/Divesite/DivesiteListingPanel/DivesiteListingPanel";
import Spinner from "../../components/Spinner/Spinner";

import DisplayImage from "../../components/DisplayImage/DisplayImage";
import GoogleMapLocation from "../../components/LocationMap/GoogleMapLocation";

const DiveShopView = (props) => {
  const shopId = props.match.params.id;

  const [shop, setShop] = useState();
  const [name, setName] = useState();
  const [area, setArea] = useState();
  const [country, setCountry] = useState();
  const [phone, setPhone] = useState();
  const [email, setEmail] = useState();
  const [address, setAddress] = useState();
  const [website, setWebsite] = useState();
  const [facebook, setFacebook] = useState();
  const [twitter, setTwitter] = useState();
  const [instagram, setInstagram] = useState();
  const [logo, setLogo] = useState();
  const [banner, setBanner] = useState();
  const [diveSites, setDiveSites] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  const [englargeBanner, setEnlargeBanner] = useState(false);
  const [englargeLogo, setEnlargeLogo] = useState(false);

  useEffect(() => {
    async function getShop() {
      try {
        const response = await fetch(
          process.env.REACT_APP_BACKEND + "diveShops/findShop/" + shopId,
          {
            method: "GET",
            credentials: "include",
          }
        );
        const results = await response.json();

        const shop = results.shop;
        setShop(shop);
        setName(shop.name);
        setArea(shop.area);
        setCountry(shop.country);
        setPhone(shop.phone);
        setEmail(shop.email);
        setAddress(shop.address);
        setWebsite(shop.website);
        setFacebook(shop.facebook);
        setTwitter(shop.twitter);
        setInstagram(shop.instagram);
        setLogo(shop.logo);
        setBanner(shop.banner);
        setDiveSites(shop.associatedDiveSites);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    }

    getShop();
  }, []);

  useEffect(() => {
    if (!name) {
      document.title = "Locus - Shop";
    } else {
      document.title = "Locus - Shop - " + name;
    }
  }, [isLoading]);

  return (
    <div className={classes.container}>
      {!isLoading && (
        <div className={classes.diveShop}>
          {englargeBanner ? (
            <DisplayImage
              banner={banner}
              shop={shop}
              setEnlargeImage={setEnlargeBanner}
            />
          ) : null}
          {englargeLogo ? (
            <DisplayImage
              logo={logo}
              shop={shop}
              setEnlargeImage={setEnlargeLogo}
            />
          ) : null}
          <div
            className={classes.banner}
            onClick={() => setEnlargeBanner(true)}
          >
            <img src={process.env.REACT_APP_BACKEND + banner} />
          </div>
          <div className={classes.mainGrid}>
            <div className={classes.mainGrid__topContainer}>
              <div
                className={classes.imageContainer}
                onClick={() => setEnlargeLogo(true)}
              >
                <img src={process.env.REACT_APP_BACKEND + logo} />
              </div>
              <div className={classes.shopInfo}>
                <div className={classes.nameContainer}>
                  <h2>{name}</h2>
                </div>
                <div className={classes.addressContainer}>
                  <LocationSVG
                    className={`${classes.icon} ${classes.icon__location}`}
                  />
                  <a
                    href={"https://www.google.com/search?q=" + address}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {address}
                  </a>
                </div>
                <div className={classes.websiteContainer}>
                  <WebsiteSVG
                    className={`${classes.icon} ${classes.icon__website}`}
                  />
                  <a href={website} target="_blank" rel="noopener noreferrer">
                    {website}
                  </a>
                </div>
              </div>
            </div>
            <div className={classes.mainGrid__bottomContainer}>
              <div className={classes.leftGrid}>
                <div className={classes.leftGrid__diveSitesHeader}>
                  <h3> Sites that {name} dive at</h3>
                </div>
                <div className={classes.leftGrid__diveSites}>
                  {diveSites.map((site, i) => (
                    <DivesiteListingPanel site={site} key={i} />
                  ))}
                  {diveSites.length == 0 && (
                    <div className={classes.leftGrid__noSites}>
                      <p className={classes.leftGrid__noSitesText}>
                        {name} are currently no associated with any dive sites.
                      </p>
                      <p className={classes.leftGrid__noSitesContact}>
                        If you know of any dive sites that {name} dive at,
                        please contact us via email or social media.
                      </p>
                    </div>
                  )}
                </div>
              </div>
              <div className={classes.rightGrid}>
                <div className={classes.rightGrid__contactInfoHeader}>
                  <h3>Contact Information</h3>
                </div>
                <div className={classes.rightGrid__phoneContainer}>
                  <PhoneSVG
                    className={`${classes.icon} ${classes.icon__phone}`}
                  />
                  <a href={"tel:" + phone}>{phone ? phone : "N/A"}</a>
                </div>
                <div className={classes.rightGrid__emailContainer}>
                  <EmailSVG
                    className={`${classes.icon} ${classes.icon__email}`}
                  />
                  <a href={"mailto:" + email}>{email ? email : "N/A"}</a>
                </div>
                <div className={classes.socialsContainer}>
                  {facebook && (
                    <div
                      className={classes.socialsContainer__facebookContainer}
                    >
                      <a
                        href={"https://www.facebook.com" + facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FacebookSVG
                          className={`${classes.icon} ${classes.icon__facebook}`}
                        />
                      </a>
                    </div>
                  )}
                  {instagram && (
                    <div
                      className={classes.socialsContainer__instagramContainer}
                    >
                      <a
                        href={"https://www.instagram.com" + instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <InstagramSVG
                          className={`${classes.icon} ${classes.icon__instagram}`}
                        />
                      </a>
                    </div>
                  )}
                  {twitter && (
                    <div className={classes.socialsContainer__twitterContainer}>
                      <a
                        href={"https://www.twitter.com" + twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <TwitterSVG
                          className={`${classes.icon} ${classes.icon__twitter}`}
                        />
                      </a>
                    </div>
                  )}
                </div>

                <div className={classes.rightGrid__mapHeader}>
                  <h3>Find {name} here</h3>
                </div>
                <div className={classes.rightGrid__map}>
                  <GoogleMapLocation location={shop} />
                </div>
              </div>
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

export default DiveShopView;
