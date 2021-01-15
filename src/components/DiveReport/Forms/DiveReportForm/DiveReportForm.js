import React, { useState, useContext, useEffect } from "react";
import classes from "./DiveReportForm.module.scss";

import { AccountContext } from "../../../../context/AuthContext";
import { SiteContext } from "../../../../context/DiveSiteContext";

import { ReactComponent as BackSVG } from "../../../../assets/icons/arrow-left.svg";

const DiveReportForm = (props) => {
  const [selectedSite, setSelectedSite] = useContext(SiteContext);
  const [account, setAccount] = useContext(AccountContext);

  const [location, setLocation] = useState();
  const [visibility, setVisibility] = useState();
  const [duration, setDuration] = useState();
  const [report, setReport] = useState();

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
        setDiveSites(sites.site);
        setLocation(sites.site[0]._id);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(null);
      }
    }
    getSites();
  }, []);

  const cancelHandler = () => {
    props.setShowAdd(false);
  };

  const submitHandler = () => {
    return fetch("http://localhost:8080/user/diveReports/addReport", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        location: location,
        visibility: visibility,
        duration: duration,
        report: report,
        userId: account.id,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((result) => {
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

    setErrMsg(errorMessage);

    if (errorMessage.length == 0) {
      submitHandler();
    }
  };

  return (
    <div className={classes.form}>
      <div className={classes.form__headerContainer}>
        <h3 className={classes.header}>Add Dive Report</h3>
      </div>
      <div className={classes.form__backContainer}>
        <BackSVG className={classes.backSVG} onClick={cancelHandler} />
      </div>

      <div className={classes.form__locationContainer}>
        <select
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className={`${classes.input} ${classes.input__location}`}
        >
          {diveSites.map((site) => (
            <option value={site._id}>
              {site.name}, {site.suburb}, {site.country}
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

      <div className={classes.form__cancelBtnContainer}>
        <button className={classes.cancelBtn} onClick={cancelHandler}>
          Cancel
        </button>
      </div>

      <div className={classes.form__submitBtnContainer}>
        <button onClick={validate} className={classes.submitBtn}>
          Submit
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

export default DiveReportForm;
