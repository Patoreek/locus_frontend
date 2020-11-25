import React from 'react';
import classes from './DisplayImage.module.scss';

import { ReactComponent as CloseSVG } from '../../assets/icons/close.svg';

import { format } from 'date-fns';


const DisplayImage = (props) => {

    const image = props.image;

    const dateHandler = (reportDate) => {

        let convertedDate = new Date(reportDate);
        convertedDate = format(convertedDate, 'dd/MM/yyyy');

        return (
            <span className={classes.date}>{convertedDate}</span>
        )
    }

    return (
        <div className={classes.displayImage}>
                <div className={classes.displayImageOverlay} onClick={() => props.setEnlargeImage(false)}>
                </div>
                     <div className={classes.imageContainer}>
                        <CloseSVG className={classes.closeSVG} onClick={() => props.setEnlargeImage(false)}/>
                        <img src={'http://localhost:8080/' + image.image}/>
                        <div className={classes.textContainer}>
                            <div className={classes.textContainer__nameContainer}>
                            <span>Uploaded by </span><a href={"/viewprofile/" + image.userId} className={classes.name}>
                                     {image.userFirstName} {image.userLastName}
                                </a>
                            </div>
                            <div className={classes.textContainer__locationContainer}>
                                <a href={"/divesite/" + image.siteId} className={classes.location}>
                                    {image.siteName}, {image.siteArea}, {image.siteCountry}
                                </a>
                            </div>
                            <div className={classes.textContainer__dateContainer}>
                                {dateHandler(image.reportDate)}
                            </div>
                        </div>
                     </div>
                </div>
    );
};

export default DisplayImage;