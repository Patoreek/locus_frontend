import React, { useState, useEffect, useContext } from "react";

import classes from "./CommPhotoPreview.module.scss";

import DisplayImage from "../../components/DisplayImage/DisplayImage";

import { AuthContext } from "../../context/AuthContext";

const CommPhotoPreview = (props) => {
  const siteId = props.siteId;

  const [images, setImages] = useState([]);

  const [selectedImage, setSelectedImage] = useState();
  const [enlargeImage, setEnlargeImage] = useState(false);

  const [isAuth, setIsAuth] = useContext(AuthContext);

  useEffect(() => {
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
        //console.log(results);

        let imagesArray = [];

        results.communityImages.map((image, i) => {
          if (i < 5) {
            imagesArray.push({
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

        setImages(imagesArray);
      } catch (error) {
        console.log(error);
      }
    }

    getSite();
  }, []);

  const imageHandler = (image) => {
    setSelectedImage(image);
    setEnlargeImage(true);
  };

  return (
    <div className={classes.commPhotoPreview}>
      {!images == [] && (
        <div>
          <div className={classes.sliderContainer}>
            {images.map((image, i) => (
              <div className={classes.imageContainer} key={i}>
                <img
                  src={"http://localhost:8080/" + image.image}
                  className={classes.imageContainer__image}
                  onClick={() => imageHandler(image)}
                />
              </div>
            ))}
          </div>

          {enlargeImage && (
            <DisplayImage
              image={selectedImage}
              setEnlargeImage={setEnlargeImage}
            />
          )}
        </div>
      )}
      {images.length <= 0 && (
        <div className={classes.noCommPhotos}>
          <h3 className={classes.noCommPhotos__header}> No Community Photos</h3>
          {isAuth ? (
            <p className={classes.noCommPhotos__text}>
              {" "}
              To add photos for this dive site, add a new dive report with
              images and they will automatically appear in the appropriate dive
              sites images.
            </p>
          ) : null}
          {!isAuth ? (
            <p className={classes.noCommPhotos__text}>
              There are no community images for this site currently. If you wish
              to add some images, please create an account and post a dive
              report with images.
            </p>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default CommPhotoPreview;
