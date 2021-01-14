import React, { useState, useContext, useEffect } from "react";
import classes from "./EditReport.module.scss";

import { AccountContext } from "../../../../context/AuthContext";
import { SiteContext } from "../../../../context/DiveSiteContext";

import { ReactComponent as BackSVG } from "../../../../assets/icons/arrow-left.svg";

import { FilePond } from "react-filepond";
import "filepond/dist/filepond.min.css";

const EditReport = (props) => {
  const [selectedSite, setSelectedSite] = useContext(SiteContext);
  const [account, setAccount] = useContext(AccountContext);

  const [location, setLocation] = useState();
  const [visibility, setVisibility] = useState();
  const [duration, setDuration] = useState();
  const [report, setReport] = useState();
  const [reportId, setReportId] = useState();

  const [locationErr, setLocationErr] = useState();
  const [visibilityErr, setVisibilityErr] = useState();
  const [durationErr, setDurationErr] = useState();
  const [reportErr, setReportErr] = useState();

  const [diveSites, setDiveSites] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  //? ERROR VARIABLES

  const [isError, setIsError] = useState(null);
  const [errMsg, setErrMsg] = useState([]);

  useEffect(() => {
    console.log(account);

    setLocation(props.currentReport.siteId._id);
    setVisibility(props.currentReport.visibility);
    setDuration(props.currentReport.duration);
    setReport(props.currentReport.report);
    setReportId(props.currentReport._id);

    async function getSites() {
      try {
        const response = await fetch(
          "http://localhost:8080/diveSites/getSites",
          {
            method: "GET",
            credentials: "include",
          }
        );
        const sites = await response.json();
        //console.log(profile);
        setDiveSites(sites.site);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(null);
      }
    }
    getSites();
  }, []);

  //console.log(diveSites);

  const cancelHandler = () => {
    console.log("cancelling...");
    props.setShowEdit(false);
  };

  const submitHandler = () => {
    console.log("submitting report...");

    //validate();

    //! STATE HAS TO CHANGE BEFORE IT CHECKS THIS SO IT WORKS ON ONE CLICK;
    //? SOLUTION IMPLEMENTED ??? DOUBLE CHECK THIS
    //* if (!isError) {
    //if (isError == false || (isError != null && !isError )) {
    return fetch("http://localhost:8080/user/diveReports/editReport", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        reportId: reportId,
        location: location,
        visibility: visibility,
        duration: duration,
        report: report,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        console.log(result);
        if (!result.success) {
          //errorMessage.push(result.message);
          setIsError(true);
        } else {
          window.location.reload();
        }
      })
      .catch((err) => {
        console.log(err);
        //setSuccess('false');
      });
    //}
  };

  const validate = () => {
    setLocationErr(false);
    setVisibilityErr(false);
    setDurationErr(false);
    setReportErr(false);
    setIsError(false);

    var numbers = /^[1-9]\d*$/;
    let errorMessage = [];

    if (visibility) {
      if (!visibility.match(numbers)) {
        errorMessage.push(
          "There are letters or symbols in the Visibility field."
        );
        setVisibilityErr(true);
        setIsError(true);
      }
    }
    if (!visibility) {
      errorMessage.push("Please add an estimate of the visbility.");
      setVisibilityErr(true);
      setIsError(true);
    }

    if (duration) {
      if (!duration.match(numbers)) {
        errorMessage.push(
          "There are letters or symbols in the duration field."
        );
        setDurationErr(true);
        setIsError(true);
      }
    }
    if (!duration) {
      errorMessage.push("Please add an estimate of the visbility.");
      setDurationErr(true);
      setIsError(true);
    }
    if (report == null || report == "") {
      errorMessage.push("Please add your report description.");
      setReportErr(true);
      setIsError(true);
    }

    if (errorMessage.length == 0) {
      submitHandler();
    }

    setErrMsg(errorMessage);
    console.log(errorMessage);
    console.log(isError);

    if (errorMessage.length == 0) {
      submitHandler();
    }
  };

  return (
    <div className={classes.form}>
      <div className={classes.form__headerContainer}>
        <h3 className={classes.header}>Edit this Dive Report</h3>
      </div>
      <div className={classes.form__backContainer}>
        <BackSVG className={classes.backSVG} onClick={cancelHandler} />
      </div>

      <div className={classes.form__locationContainer}>
        {/* {!isLoading ? <h1>isLoading is False</h1> : <h1>isLoading is TRUE</h1>} */}
        <select
          value={location}
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className={`${classes.input} ${classes.input__location}`}
        >
          {diveSites.map((site) => (
            <option value={site._id}>
              {site.name}, {site.area}, {site.country}
            </option>
          ))}
        </select>

        <span>Location</span>
      </div>

      <div className={classes.form__visibilityContainer}>
        <input
          className={`${classes.input} ${classes.input__visibility}`}
          value={visibility}
          onChange={(e) => setVisibility(e.target.value)}
        />
        <span>Visibility</span>
      </div>

      <div className={classes.form__durationContainer}>
        <input
          className={`${classes.input} ${classes.input__duration}`}
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
        />
        <span>Duration</span>
      </div>

      <div className={classes.form__reportContainer}>
        <textarea
          className={`${classes.input} ${classes.input__report}`}
          rows="50"
          value={report}
          //placeholder="report"
          onChange={(e) => setReport(e.target.value)}
        />
        <span>Report</span>
      </div>

      <div className={classes.form__uploadContainer}>
        <FilePond
          className={`${classes.input} ${classes.input__upload}`}
          allowMultiple={false}
          name={"profilePicture"}
          server={{
            url:
              "http://localhost:8080/user/diveReports/uploadImagesForReport/" +
              reportId +
              "?folder=divereport&userId=" +
              account.id +
              "&reportId=" +
              reportId,
            process: {
              withCredentials: true,
            },
          }}
        />
      </div>

      <div className={classes.form__cancelBtnContainer}>
        <button className={classes.cancelBtn} onClick={cancelHandler}>
          Cancel
        </button>
      </div>

      <div className={classes.form__submitBtnContainer}>
        <button onClick={validate} className={classes.submitBtn}>
          Edit
        </button>
      </div>

      <div className={classes.form__messageContainer}>
        {!isError && isError != null ? (
          <p className={classes.successMsg}>Changes saved successfully</p>
        ) : null}
        {errMsg.length > 1 ? (
          <p className={classes.errorMsg}>Whoops! Something went wrong!</p>
        ) : null}
        {errMsg.map((message) => (
          <p className={classes.errorMsg}>{message}</p>
        ))}
      </div>
    </div>
  );
};

export default EditReport;
