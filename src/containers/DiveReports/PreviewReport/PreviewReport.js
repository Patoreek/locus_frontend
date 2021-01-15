import React, { useEffect, useState } from "react";

import { format } from "date-fns";

import classes from "./PreviewReport.module.scss";

import { ReactComponent as BackBtnSVG } from "../../../assets/icons/arrow-left.svg";
import { ReactComponent as EditSVG } from "../../../assets/icons/edit.svg";
import { ReactComponent as DeleteSVG } from "../../../assets/icons/delete.svg";

import DisplayReport from "../../../components/DiveReport/DisplayReport/DisplayReport";

const PreviewReport = (props) => {
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
    let convertedDate = new Date(props.currentReport.createdAt);
    convertedDate = format(convertedDate, "dd/MM/yyyy");

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
  };

  const editHandler = () => {
    props.setShowPreview(false);
    props.setShowDelete(false);
    props.setShowEdit(true);
  };

  const deleteHandler = () => {
    props.setShowPreview(false);
    props.setShowEdit(false);
    props.setShowDelete(true);
  };

  return (
    <div>
      {!isLoading && (
        <div className={classes.previewReport}>
          <div className={classes.previewReport__title}>
            <h1>Preview Report</h1>
          </div>
          <div className={classes.previewReport__backBtn}>
            <BackBtnSVG className={classes.backBtnSVG} onClick={backHandler} />
          </div>
          <div className={classes.previewReport__optionsContainer}>
            <div
              className={`${classes.btn} ${classes.btn__edit}`}
              onClick={editHandler}
            >
              <EditSVG className={classes.icon} />
              <span>Edit</span>
            </div>
            <div
              className={`${classes.btn} ${classes.btn__delete}`}
              onClick={deleteHandler}
            >
              <DeleteSVG className={classes.icon} />
              <span>Delete</span>
            </div>
          </div>
          <div className={classes.previewReport__reportContainer}>
            <DisplayReport report={props.currentReport} />
          </div>
        </div>
      )}
    </div>
  );
};

export default PreviewReport;
