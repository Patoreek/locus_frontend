import React, {useState, useEffect} from 'react';

import { format } from 'date-fns';

import classes from './CommunityPhotos.module.scss';

import { ReactComponent as CloseSVG } from '../../assets/icons/close.svg';

const CommunityPhotos = (props) => {
    const siteId = props.match.params.siteId;

    const [communityImages, setCommunityImages] = useState([]);
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
              const response = await fetch('http://localhost:8080/diveSites/getCommunityPhotos/' + siteId,{
                method: 'GET',
                credentials: 'include',
              });
              const results = await response.json();
              console.log(results);
              setCommunityImages(results.communityImages);
              setIsLoading(false);

          
              results.communityImages.map((image, i) => {
                    if (i % 3 == 0) { //? True if i is divisible by 3   |||||| RIGHT COL
                        rightColArray.push({
                            image: image.image,
                            userId: image.userId,
                            userFirstName: image.userFirstName,
                            userLastName: image.userLastName,
                            siteId: image.siteId,
                            siteName: image.siteName,
                            siteArea: image.siteArea,
                            siteCountry: image.siteCountry,
                            reportDate: image.reportDate,
                        });
                    } else if ( i % 2 == 0) { //? True if even          |||||| MIDDLE COL
                        middleColArray.push({
                            image: image.image,
                            userId: image.userId,
                            userFirstName: image.userFirstName,
                            userLastName: image.userLastName,
                            siteId: image.siteId,
                            siteName: image.siteName,
                            siteArea: image.siteArea,
                            siteCountry: image.siteCountry,
                            reportDate: image.reportDate,
                        });
                    } else if ( i % 2 != 0) {//? True if Odd            |||||| LEFT COL
                        leftColArray.push({
                            image: image.image,
                            userId: image.userId,
                            userFirstName: image.userFirstName,
                            userLastName: image.userLastName,
                            siteId: image.siteId,
                            siteName: image.siteName,
                            siteArea: image.siteArea,
                            siteCountry: image.siteCountry,
                            reportDate: image.reportDate,
                        });
                    }
              });

              console.log(leftColArray);
              console.log(middleColArray);
              console.log(rightColArray);


            setLeftColImages(leftColArray);
            setMiddleColImages(middleColArray);
            setRightColImages(rightColArray);

            setIsLoading(false)

      
            } catch (error) {
             console.log(error);
             //setIsLoading(true);
            }
          }

        
        
          getSite();

    },[]);

    const previewImageHandler = (image) => {
        setPreviewImage(image);
        setShowPreview(true);
    }

    const dateHandler = (reportDate) => {

        let convertedDate = new Date(reportDate);
        convertedDate = format(convertedDate, 'dd/MM/yyyy');

        return (
            <span className={classes.date}>{convertedDate}</span>
        )
    }

    
 

    return (
        <div className={classes.communityPhotos}>
            {!isLoading ? 
                <h1>Community Photos ({communityImages.length > 100 ? "100+" : communityImages.length})</h1> 
                        :  
                <h1>Community Photos (err)</h1>
            }
            {!isLoading && (
                <div className={classes.grid}>
                    <div className={classes.grid__left}>
                        {leftColImages.map(image => (
                            <div className={classes.imageContainer} onClick={() => previewImageHandler(image)}>
                                <div className={classes.overlay}>
                                </div>
                                <img src={'http://localhost:8080/' + image.image}/>
                            </div>
                        ))}
                    </div>
                    <div className={classes.grid__middle}>
                        {middleColImages.map(image => (
                            <div className={classes.imageContainer} onClick={() => previewImageHandler(image)}>
                                 <div className={classes.overlay}>
                                </div>
                                <img src={'http://localhost:8080/' + image.image}/>
                            </div>
                        ))}
                    </div>
                    <div className={classes.grid__right}>
                        {rightColImages.map(image => (
                            <div className={classes.imageContainer} onClick={() => previewImageHandler(image)}>
                                 <div className={classes.overlay}>
                                </div>
                                <img src={'http://localhost:8080/' + image.image}/>
                            </div>
                        ))}
                    </div>
                </div>
            )}
            

            {showPreview && (
                <div className={classes.showPreview}>
                <div className={classes.previewOverlay} onClick={() => setShowPreview(false)}>
                </div>
                     <div className={classes.imageContainer}>
                        <CloseSVG className={classes.closeSVG} onClick={() => setShowPreview(false)}/>
                        <img src={'http://localhost:8080/' + previewImage.image}/>
                        <div className={classes.textContainer}>
                            <div className={classes.textContainer__nameContainer}>
                            <span>Uploaded by </span><a href={"/viewprofile/" + previewImage.userId} className={classes.name}>
                                     {previewImage.userFirstName} {previewImage.userLastName}
                                </a>
                            </div>
                            <div className={classes.textContainer__locationContainer}>
                                <a href={"/divesite/" + previewImage.siteId} className={classes.location}>
                                    {previewImage.siteName}, {previewImage.siteArea}, {previewImage.siteCountry}
                                </a>
                            </div>
                            <div className={classes.textContainer__dateContainer}>
                                {dateHandler(previewImage.reportDate)}
                            </div>
                        </div>
                     </div>
                </div>
            )}
        </div>
    );
};

export default CommunityPhotos;