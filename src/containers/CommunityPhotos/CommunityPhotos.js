import React, { useState, useEffect } from "react";
import classes from "./CommunityPhotos.module.scss";

import DisplayImage from "../../components/DisplayImage/DisplayImage";
import Spinner from "../../components/Spinner/Spinner";

const CommunityPhotos = (props) => {
  const siteId = props.match.params.siteId;

  const [communityImages, setCommunityImages] = useState([]);
  const [site, setSite] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const [leftColImages, setLeftColImages] = useState([]);
  const [middleColImages, setMiddleColImages] = useState([]);
  const [rightColImages, setRightColImages] = useState([]);

  const [previewImage, setPreviewImage] = useState();
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    let refomattedArrayImages = [];
    let leftColArray = [];
    let middleColArray = [];
    let rightColArray = [];

    async function getSite() {
      try {
        const response = await fetch(
          "http://localhost:8080/diveSites/getCommunityPhotos/" + siteId,
          {
            method: "GET",
            credentials: "include",
          }
        );
        const results = await response.json();
        setSite(results.site);
        setCommunityImages(results.communityImages);
        setIsLoading(false);

        results.communityImages.map((image, i) => {
          if (i % 3 == 0) {
            //? True if i is divisible by 3   |||||| RIGHT COL
            rightColArray.push({
              image: image.image,
              userId: image.userId,
              userFirstName: image.userFirstName,
              userLastName: image.userLastName,
              siteId: image.siteId,
              siteName: image.siteName,
              siteSuburb: image.siteSuburb,
              siteCountry: image.siteCountry,
              reportDate: image.reportDate,
            });
          } else if (i % 2 == 0) {
            //? True if even          |||||| MIDDLE COL
            middleColArray.push({
              image: image.image,
              userId: image.userId,
              userFirstName: image.userFirstName,
              userLastName: image.userLastName,
              siteId: image.siteId,
              siteName: image.siteName,
              siteSuburb: image.siteSuburb,
              siteCountry: image.siteCountry,
              reportDate: image.reportDate,
            });
          } else if (i % 2 != 0) {
            //? True if Odd            |||||| LEFT COL
            leftColArray.push({
              image: image.image,
              userId: image.userId,
              userFirstName: image.userFirstName,
              userLastName: image.userLastName,
              siteId: image.siteId,
              siteName: image.siteName,
              siteSuburb: image.siteSuburb,
              siteCountry: image.siteCountry,
              reportDate: image.reportDate,
            });
          }
        });

        setLeftColImages(leftColArray);
        setMiddleColImages(middleColArray);
        setRightColImages(rightColArray);

        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    }

    getSite();
  }, []);

  useEffect(() => {
    if (!site) {
      document.title = "Locus - Photos";
    } else {
      document.title = "Locus - Photos - " + site.name + " · " + site.area;
    }
  }, [isLoading]);

  const previewImageHandler = (image) => {
    setPreviewImage(image);
    setShowPreview(true);
  };

  return (
    <div className={classes.communityPhotos}>
      {!isLoading && (
        <div className={classes.communityPhotos__locationHeaderContainer}>
          <h1>
            {site.name ? site.name : null} · {site.suburb ? site.suburb : null}{" "}
            · {site.city ? site.city : null} · {site.state ? site.state : null}{" "}
            · {site.country ? site.country : null}
          </h1>
        </div>
      )}
      {!isLoading ? (
        <h2 className={classes.communityPhotos__pageHeaderContainer}>
          Community Photos (
          {communityImages.length > 100 ? "100+" : communityImages.length})
        </h2>
      ) : (
        <h2 className={classes.communityPhotos__pageHeaderContainer}>
          Community Photos (0)
        </h2>
      )}
      {!isLoading && (
        <div className={classes.communityPhotos__googleLinks}>
          <span>
            <a
              target="_blank"
              href={"http://www.google.com/search?q=" + site.name}
            >
              {site.name}
            </a>
            ·
            <a
              target="_blank"
              href={"http://www.google.com/search?q=" + site.suburb}
            >
              {site.suburb}
            </a>
            ·
            <a
              target="_blank"
              href={"http://www.google.com/search?q=" + site.city}
            >
              {site.city}
            </a>
            ·
            <a
              target="_blank"
              href={"http://www.google.com/search?q=" + site.state}
            >
              {site.state}
            </a>
            ·
            <a
              target="_blank"
              href={"http://www.google.com/search?q=" + site.country}
            >
              {site.country}
            </a>
          </span>
        </div>
      )}

      {!isLoading && communityImages != [] && (
        <div className={classes.grid}>
          <div className={classes.grid__left}>
            {leftColImages.map((image, i) => (
              <div
                className={classes.imageContainer}
                key={i}
                onClick={() => previewImageHandler(image)}
              >
                <div className={classes.overlay}></div>
                <img src={"http://localhost:8080/" + image.image} />
              </div>
            ))}
          </div>
          <div className={classes.grid__middle}>
            {middleColImages.map((image, i) => (
              <div
                className={classes.imageContainer}
                key={i}
                onClick={() => previewImageHandler(image)}
              >
                <div className={classes.overlay}></div>
                <img src={"http://localhost:8080/" + image.image} />
              </div>
            ))}
          </div>
          <div className={classes.grid__right}>
            {rightColImages.map((image, i) => (
              <div
                className={classes.imageContainer}
                key={i}
                onClick={() => previewImageHandler(image)}
              >
                <div className={classes.overlay}></div>
                <img src={"http://localhost:8080/" + image.image} />
              </div>
            ))}
          </div>
        </div>
      )}

      {!isLoading && communityImages == [] && <div>No Photos</div>}

      {isLoading && (
        <div className={classes.spinnerContainer}>
          <Spinner />
        </div>
      )}

      {showPreview && (
        <DisplayImage image={previewImage} setEnlargeImage={setShowPreview} />
      )}
    </div>
  );
};

export default CommunityPhotos;
