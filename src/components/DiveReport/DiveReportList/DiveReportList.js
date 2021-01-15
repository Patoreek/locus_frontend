import React, { useState, useContext, useEffect } from "react";
import classes from "./DiveReportList.module.scss";
import { format } from "date-fns";

import { ReactComponent as AddSVG } from "../../../assets/icons/add.svg";
import { ReactComponent as DeleteSVG } from "../../../assets/icons/delete.svg";
import { ReactComponent as EditSVG } from "../../../assets/icons/edit.svg";

import { ReactComponent as FeedbackSVG } from "../../../assets/images/feedback.svg";

const DiveReportList = (props) => {
  const addHandler = () => {
    props.setShowEdit(false);
    props.setShowDelete(false);
    props.setShowPreview(false);
    props.setShowAdd(true);
  };

  const previewHandler = (id) => {
    props.setShowEdit(false);
    props.setShowDelete(false);
    props.setShowPreview(false);
    props.setShowAdd(false);
    props.findReport(id, "preview");
  };

  const editHandler = (id) => {
    props.setShowEdit(false);
    props.setShowDelete(false);
    props.setShowPreview(false);
    props.setShowAdd(false);
    props.findReport(id, "edit");
  };

  const deleteHandler = (id) => {
    props.setShowEdit(false);
    props.setShowPreview(false);
    props.setShowAdd(false);
    props.setShowDelete(false);
    props.findReport(id, "delete");
  };

  const dateHandler = (createdAt) => {
    let convertedDate = new Date(createdAt);
    convertedDate = format(convertedDate, "dd/MM/yyyy");

    return <span className={classes.date}>{convertedDate}</span>;
  };

  return (
    <div className={classes.diveReportList}>
      <div className={classes.diveReportList__titleContainer}>
        <h2 className={classes.title}>
          Dive Reports · (
          {props.diveReports.length > 0 ? props.diveReports.length : "0"})
        </h2>
      </div>

      <div>
        <div
          className={classes.diveReportList__addContainer}
          onClick={addHandler}
        >
          <span className={classes.addReportText}>Add a new report</span>
          <div className={classes.addSVG}>
            <AddSVG className={classes.addBtn} onClick={addHandler} />
          </div>
        </div>
        {props.diveReports.map((report) => (
          <div className={classes.diveReportList__reportContainer}>
            <div
              className={classes.locationContainer}
              onClick={() => previewHandler(report._id)}
            >
              <h3 className={classes.location}>
                {report.siteId.name}, {report.siteId.suburb}
              </h3>
            </div>
            <div
              className={classes.dateContainer}
              onClick={() => previewHandler(report._id)}
            >
              <span className={classes.date}>
                {dateHandler(report.createdAt)}
              </span>
            </div>

            <div
              className={classes.editSVG}
              onClick={() => editHandler(report._id)}
            >
              <EditSVG className={classes.icon} />
            </div>
            <div
              className={classes.deleteSVG}
              onClick={() => deleteHandler(report._id)}
            >
              <DeleteSVG className={classes.icon} />
            </div>
          </div>
        ))}
        <div className={classes.diveReportList__getStarted}>
          <h3 className={classes.header}>Get Started</h3>
          <p className={classes.pressBtn}>
            Press the “Add a new Report +” button above and fill out your
            report.
          </p>
          <p className={classes.addImages}>
            You may add images however, at the moment you must create a report
            then go to the edit form which will then allow you to add images
            (one at a time).{" "}
          </p>
          <span className={classes.improvement}>
            * We are consistently improving the dive site feature of locus and
            is currently still in the beta stages.
          </span>
        </div>
        <div className={classes.diveReportList__feedback}>
          <FeedbackSVG className={classes.icon} />
          <p className={classes.text}>
            If you have any feedback or suggestions for improvements to any
            aspects of Locus, please contact us via email or social media.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DiveReportList;
