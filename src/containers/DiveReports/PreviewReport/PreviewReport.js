import React, { useEffect, useState} from 'react';

import { format } from 'date-fns';

import classes from './PreviewReport.module.scss';

import { ReactComponent as BackBtnSVG } from '../../../assets/icons/arrow-left.svg';
import { ReactComponent as VisibilitySVG } from '../../../assets/icons/binoculars.svg';
import { ReactComponent as DurationSVG } from '../../../assets/icons/time.svg';
import { ReactComponent as DateSVG } from '../../../assets/icons/calendar.svg';



const PreviewReport = (props) => {
    //console.log(props.reportId);

    const [locationName, setLocationName] = useState("");
    const [locationArea, setLocationArea] = useState("");
    const [locationCountry, setLocationCountry] = useState("");
    const [date, setDate] = useState("");
    const [visibility, setVisibility] = useState("");
    const [duration, setDuration] = useState("");
    const [report, setReport] = useState("");
    const [images, setImages] = useState("");






    const [isLoading, setIsLoading] = useState(null);

    useEffect(() => {
        
        console.log(props.currentReport);
        console.log(props.currentReport.siteId.name);

        let convertedDate = new Date(props.currentReport.createdAt);
        convertedDate = format(convertedDate, 'dd/MM/yyyy');


        setLocationName(props.currentReport.siteId.name);
        setLocationArea(props.currentReport.siteId.area);
        setLocationCountry(props.currentReport.siteId.country);
        setDate(convertedDate);
        setVisibility(props.currentReport.visibility);
        setDuration(props.currentReport.duration);
        setReport(props.currentReport.report);
        setImages(props.currentReport.images);
        //setIsLoading(false);
    }, [props.currentReport]);

    const backHandler = () => {
        props.setShowPreview(false);
    }

  



    return (
        <div>
            {!isLoading && (
            <div className={classes.previewReport}>
                <div className={classes.previewReport__title}>
                    <h1>Preview Report</h1> 
                </div>
                <div className={classes.previewReport__backBtn}>
                    <BackBtnSVG className={classes.backBtnSVG} onClick={backHandler}/>
                </div>
                <div className={classes.previewReport__nameContainer}>    
                    <h2>{locationName}, {locationArea}, {locationCountry}</h2>
                </div>
                <div className={classes.previewReport__dateContainer}>
                    <DateSVG className={classes.dateSVG}/>
                    <span>{date}</span>
                </div>
                <div className={classes.previewReport__visibilityContainer}>
                    <VisibilitySVG className={classes.visibilitySVG}/>
                    <span>Visibility: ~{visibility}m</span>
                </div>
                <div className={classes.previewReport__durationContainer}>
                    <DurationSVG className={classes.durationSVG}/>
                    <span>Duration: ~{duration} mins</span>
                </div>
                <div className={classes.previewReport__reportContainer}>
                    <p>{report}</p>
                </div>
                {images.length > 0 && (
                <div className={classes.previewReport__imagesContainer}>
                    <div className={classes.container}>
                        <div className={classes.imageSlideshow}>
                            {images.map(image => (
                            <div className={classes.imgContainer}>
                                <img src={'http://localhost:8080/' + image}/>
                            </div>
                            ))}
                        </div>
                    </div>
                </div>
                )}
            </div>
            )}
        </div>
    );
};

export default PreviewReport;