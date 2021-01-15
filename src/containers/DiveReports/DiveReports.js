import React, { useState, useEffect } from "react";

import classes from "./DiveReports.module.scss";

import PreviewReport from "./PreviewReport/PreviewReport";
import DiveReportList from "../../components/DiveReport/DiveReportList/DiveReportList";

import DiveReportForm from "../../components/DiveReport/Forms/DiveReportForm/DiveReportForm";
import EditReport from "../../components/DiveReport/Forms/EditReport/EditReport";
import DeleteReport from "../../components/DiveReport/Forms/DeleteReport/DeleteReport";

import Spinner from "../../components/Spinner/Spinner";

import { ReactComponent as CreateSVG } from "../../assets/images/openmap.svg";
import { ReactComponent as ShareSVG } from "../../assets/images/share_image.svg";
import { ReactComponent as LogSVG } from "../../assets/images/diving_log_image.svg";
import { ReactComponent as ImproveSVG } from "../../assets/images/improve.svg";

const DiveReports = () => {
  const [diveReports, setDiveReports] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [reportId, setReportId] = useState();

  const [showPreview, setShowPreview] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const [currentReport, setCurrentReport] = useState(null);

  useEffect(() => {
    async function getReports() {
      try {
        const response = await fetch(
          "http://localhost:8080/user/diveReports/getReports",
          {
            method: "GET",
            credentials: "include",
          }
        );
        const reports = await response.json();
        setDiveReports(reports.reportsData);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    }

    document.title = "Locus - Dive Reports";

    getReports();
  }, []);

  const findReport = (id, handlerType) => {
    setIsLoading(true);
    return fetch("http://localhost:8080/user/diveReports/findReport", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        reportId: id,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((resData) => {
        setCurrentReport(resData.report);
        setIsLoading(false);

        if (handlerType == "preview") {
          setShowPreview(true);
        } else if (handlerType == "edit") {
          setShowEdit(true);
        } else if (handlerType == "delete") {
          setShowDelete(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className={classes.diveReports}>
      <div className={classes.diveReports__left}>
        {!isLoading && (
          <DiveReportList
            diveReports={diveReports}
            setReportId={setReportId}
            setShowPreview={setShowPreview}
            setShowAdd={setShowAdd}
            setShowEdit={setShowEdit}
            setShowDelete={setShowDelete}
            findReport={findReport}
          />
        )}
      </div>
      <div className={classes.diveReports__right}>
        {!isLoading && !showAdd && !showEdit && !showPreview && !showDelete && (
          <div className={classes.diveReportsHome}>
            <h1 className={classes.diveReportsHome__header}>Dive Reports</h1>
            <div className={classes.diveReportsHome__create}>
              <CreateSVG className={classes.image} />
              <div className={classes.text}>
                <h3 className={classes.text__header}>Create</h3>
                <p className={classes.text__content}>
                  Creating dive reports allow you to keep track of dives, share
                  the information, images and videos. These reports will show on
                  the dive sites page in the reports section.
                </p>
              </div>
            </div>
            <div className={classes.diveReportsHome__share}>
              <div className={classes.text}>
                <h3 className={classes.text__header}>Share</h3>
                <p className={classes.text__content}>
                  Other users will be able to see you report and soon be able to
                  like and comment on reports. The images that you upload to the
                  report will also appear on the report and the images will be
                  shown in the dive sites community photos gallery section.
                </p>
              </div>
              <ShareSVG className={classes.image} />
            </div>
            <div className={classes.diveReportsHome__log}>
              <LogSVG className={classes.image} />
              <div className={classes.text}>
                <h3 className={classes.text__header}>Log</h3>
                <p className={classes.text__content}>
                  Adding dive reports allows you to keep track of places you
                  have dived, share information of the dive to others, and if
                  you have images to share you can edit the new report and add
                  images. Currently, adding images can only be done after first
                  making a report then going to the edit form.
                </p>
              </div>
            </div>
            <div className={classes.diveReportsHome__improve}>
              <div className={classes.text}>
                <h3 className={classes.text__header}>Improve</h3>
                <p className={classes.text__content}>
                  The Dive Reports page is a work in progress with the vision of
                  creating a diving community where users can share images,
                  videos and information or maybe even connect with other nearby
                  divers or shops to dive new places you might have not known of
                  before.{" "}
                </p>
              </div>
              <ImproveSVG className={classes.image} />
            </div>
            <div className={classes.diveReportsHome__feedback}>
              <span>
                If you have any feedback or suggestions for improvements to any
                aspects of Locus, please contact us via email or social media.
              </span>
            </div>
          </div>
        )}
        {!isLoading && showAdd && <DiveReportForm setShowAdd={setShowAdd} />}
        {!isLoading && showEdit && (
          <EditReport currentReport={currentReport} setShowEdit={setShowEdit} />
        )}
        {!isLoading && showPreview && (
          <PreviewReport
            currentReport={currentReport}
            setShowPreview={setShowPreview}
            setShowEdit={setShowEdit}
            setShowDelete={setShowDelete}
          />
        )}
        {!isLoading && showDelete && (
          <DeleteReport
            currentReport={currentReport}
            setShowDelete={setShowDelete}
          />
        )}
        {isLoading && (
          <div className={classes.spinnerContainer}>
            <Spinner />
          </div>
        )}
      </div>
    </div>
  );
};

export default DiveReports;
