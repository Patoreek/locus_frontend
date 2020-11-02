import React, {useState} from 'react';
import { format } from 'date-fns';


import classes from './DisplayReport.module.scss';

import { ReactComponent as VisibilitySVG } from '../../assets/icons/visibility.svg';
import { ReactComponent as DateSVG } from '../../assets/icons/calendar.svg';
import { ReactComponent as LocationSVG } from '../../assets/icons/location_lightgrey.svg';
import { ReactComponent as DurationSVG } from '../../assets/icons/time.svg';

const DisplayReport = (props) => {
    const [report, setReport] = useState(props.report);


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

    return (
        <div className={classes.report}>
                            <div className={classes.report__topContainer}>
                                  <div className={classes.profilePic}>
                                      <img src={'http://localhost:8080/' + report.userId.profilePic}/>
                                  </div>
                                  <div className={classes.name}>
                                      <a href={"/viewprofile/" + report.userId._id}>{report.userId.firstName} {report.userId.lastName}</a>
                                  </div>
                            </div>
                            <div className={classes.report__infoContainer}>
                                  {dateHandler(report.createdAt)}
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
                                            {report.images.map(image => (
                                            <div className={classes.imgContainer}>
                                                <img src={'http://localhost:8080/' + image}/>
                                            </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                )}
                        </div>
    );
};

export default DisplayReport;