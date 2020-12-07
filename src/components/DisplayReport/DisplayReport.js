import React, {useState} from 'react';
import { format } from 'date-fns';


import classes from './DisplayReport.module.scss';

import { ReactComponent as VisibilitySVG } from '../../assets/icons/visibility.svg';
import { ReactComponent as DateSVG } from '../../assets/icons/calendar.svg';
import { ReactComponent as LocationSVG } from '../../assets/icons/location_lightgrey.svg';
import { ReactComponent as DurationSVG } from '../../assets/icons/time.svg';

import DisplayImage from '../DisplayImage/DisplayImage';

const DisplayReport = (props) => {
    const [report, setReport] = useState(props.report);

    const [selectedImage, setSelectedImage] = useState();
    const [enlargeImage, setEnlargeImage] = useState(false);


    const dateHandler = (createdAt) => {

        let convertedDate = new Date(createdAt);
        convertedDate = format(convertedDate, 'dd/MM/yyyy');
  
        return  (
          <div className={classes.date}>
            <DateSVG className={classes.icon}/>
            <span>Dived on: {convertedDate}</span> 
          </div>
        );
  
    }



    const imageHandler = (report, i) => {
        console.log(report);
        const image = report.images[i]
        const userId = report.userId._id;
        const firstName = report.userId.firstName;
        const lastName = report.userId.lastName;
        const siteId = report.siteId._id;
        const siteName = report.siteId.name;
        const siteArea = report.siteId.area;
        const siteCountry = report.siteId.country;
        const date = report.createdAt;

        setSelectedImage({
            image: image,
            userId: userId,
            userFirstName: firstName,
            userLastName: lastName,
            siteId: siteId,
            siteName: siteName,
            siteArea: siteArea,
            siteCountry: siteCountry,
            reportDate: date,
        })
        setEnlargeImage(true);
    }

    return (
        <div className={classes.report}>
                            <div className={classes.report__topContainer}>
                                  <div className={classes.profilePic}>
                                      <img src={'http://localhost:8080/' + report.userId.profilePic}/>
                                  </div>
                                    <div className={classes.nameContainer}>
                                        <div className={classes.nameContainer__name}>
                                            <a href={"/viewprofile/" + report.userId._id}>{report.userId.firstName} {report.userId.lastName}</a>
                                        </div>
                                        <div className={classes.nameContainer__date}>
                                            {dateHandler(report.createdAt)}
                                        </div>
                                    </div>
                            </div>
                            <div className={classes.report__infoContainer}>
                                  <div className={classes.location}>
                                      <LocationSVG className={classes.icon}/>
                                      <a href={"/divesite/" + report.siteId._id}>{report.siteId.name}, {report.siteId.area}, {report.siteId.country}</a>
                                  </div>
                                  <div className={classes.visibility}>
                                      <VisibilitySVG className={classes.icon}/>
                                      <span>~{report.visibility} meters</span>
                                  </div>
                                  <div className={classes.duration}>
                                      <DurationSVG className={classes.icon}/>
                                      <span>~{report.duration} minutes</span>
                                  </div>
                            </div>
                            <div className={classes.report__reportContainer}>
                                  <div className={classes.reportContent}>
                                      <p>{report.report}</p>
                                  </div>
                            </div>
                            {report.images.length > 0 && (
                                <div className={classes.report__imagesContainer}>
                                    <div className={classes.container}>
                                        <div className={classes.imageSlideshow}>
                                            {report.images.map((image, i) => (
                                            <div className={classes.imgContainer}>
                                                <img src={'http://localhost:8080/' + image} onClick={() => imageHandler(report, i)}/>
                                            </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {enlargeImage && (
                                <DisplayImage image={selectedImage} setEnlargeImage={setEnlargeImage}/>
                            )}
        </div>
    );
};

export default DisplayReport;