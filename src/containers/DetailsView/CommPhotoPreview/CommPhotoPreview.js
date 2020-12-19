import React, {useState, useEffect} from 'react';

import classes from './CommPhotoPreview.module.scss';

import DisplayImage from '../../../components/DisplayImage/DisplayImage';

const CommPhotoPreview = (props) => {

    const siteId = props.siteId;

    const [images, setImages] = useState([]);

    const [selectedImage, setSelectedImage] = useState();
    const [enlargeImage, setEnlargeImage] = useState(false);

    useEffect(() => {
        async function getSite() {

            try {
              const response = await fetch('http://localhost:8080/diveSites/getCommunityPhotos/' + siteId,{
                method: 'GET',
                credentials: 'include',
              });
              const results = await response.json();
              console.log(results);
            //   setCommunityImages(results.communityImages);
            //   setIsLoading(false);

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
                            siteArea: image.siteArea,
                            siteCountry: image.siteCountry,
                            reportDate: image.reportDate,
                    })
                  } 
              });

              setImages(imagesArray);


                        
      
            } catch (error) {
             console.log(error);
             //setIsLoading(true);
            }
          }

        
        
          getSite();

    }, []);

    const imageHandler = (image) => {
        setSelectedImage(image);
        setEnlargeImage(true);
    }

    console.log(images);



    return (
        <div className={classes.commPhotoPreview}>

          {!images == [] && (
            <div>
              <div className={classes.sliderContainer}>
              <div className={classes.slider}>
              {images.map(image => (
                  <div className={classes.imageContainer}>
                      <img src={'http://localhost:8080/' + image.image} className={classes.imageContainer__image} onClick={() => imageHandler(image)}/>
                  </div>
              ))}
              </div>
              </div>

              {enlargeImage && (
                  <DisplayImage image={selectedImage} setEnlargeImage={setEnlargeImage}/>
              )}
            </div>
          )}
         {images.length <= 0 && (
            <div className={classes.noCommPhotos}>
              <h3 className={classes.noCommPhotos__header}> No Community Photos</h3>
              <p className={classes.noCommPhotos__text}> To add photos for this dive site, add a new dive report with images and they will automatically appear in the appropriate dive sites images.</p>
            </div>
         )}


        </div>
    );
};

export default CommPhotoPreview;