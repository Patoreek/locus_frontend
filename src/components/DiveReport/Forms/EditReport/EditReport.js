import React, { useState, useContext, useEffect } from "react";
import classes from "./EditReport.module.scss";
import { isMobile } from "react-device-detect";

import { AccountContext } from "../../../../context/AuthContext";
import { SiteContext } from "../../../../context/DiveSiteContext";

import { ReactComponent as BackSVG } from "../../../../assets/icons/arrow-left.svg";

import { FilePond } from "react-filepond";
import "filepond/dist/filepond.min.css";

const EditReport = (props) => {
  const [account, setAccount] = useContext(AccountContext);

  const [location, setLocation] = useState("");
  const [visibility, setVisibility] = useState("");
  const [duration, setDuration] = useState("");
  const [report, setReport] = useState("");
  const [reportId, setReportId] = useState("");

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
    setLocation(props.currentReport.siteId._id);
    setVisibility(props.currentReport.visibility);
    setDuration(props.currentReport.duration);
    setReport(props.currentReport.report);
    setReportId(props.currentReport._id);

    async function getSites() {
      try {
        const response = await fetch(
          process.env.REACT_APP_BACKEND + "diveSites/getSites",
          {
            method: "GET",
            credentials: "include",
          }
        );
        const sites = await response.json();
        setDiveSites(sites.site);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(null);
      }
    }
    getSites();
  }, []);

  const cancelHandler = () => {
    props.setShowEdit(false);
    if (isMobile) {
      props.setShowList(true);
    }
  };

  const submitHandler = () => {
    return fetch(
      process.env.REACT_APP_BACKEND + "user/diveReports/editReport",
      {
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
      }
    )
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        if (!result.success) {
          setIsError(true);
        } else {
          window.location.reload();
        }
      })
      .catch((err) => {
        console.log(err);
      });
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
        <select
          value={location}
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className={`${classes.input} ${classes.input__location}`}
        >
          {diveSites.map((site, i) => (
            <option value={site._id} key={i}>
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
              process.env.REACT_APP_BACKEND +
              "user/diveReports/uploadImagesForReport/" +
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
