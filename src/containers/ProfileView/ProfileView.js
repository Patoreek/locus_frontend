import React, { useEffect, useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext, AccountContext } from "../../context/AuthContext";
import { SiteContext, DetailsContext } from "../../context/DiveSiteContext";

import { ReactComponent as PinSVG } from "../../assets/icons/location_default.svg";
import { ReactComponent as XpSVG } from "../../assets/icons/userXP.svg";
import { ReactComponent as CloseSVG } from "../../assets/icons/close.svg";

import { useParams } from "react-router";

import Spinner from "../../components/Spinner/Spinner";

import StarRating from "../../components/StarRating/StarRating";
import FavouriteButton from "../../components/Buttons/FavouriteButton/FavouriteButton";
import DisplayReport from "../../components/DiveReport/DisplayReport/DisplayReport";

import DivesiteListingPanel from "../../components/Divesite/DivesiteListingPanel/DivesiteListingPanel";
import DivesiteListingThumbnail from "../../components/Divesite/DivesiteListingThumbnail/DivesiteListingThumbnail";

import avatarPlaceholder from "../../assets/images/avatar_placeholder.jpeg";

import EditProfile from "../../components/User/EditProfile/EditProfile";
import ChangePassword from "../../components/User/ChangePassword/ChangePassword";

import classes from "./ProfileView.module.scss";

const ProfileView = (props) => {
  const [isAuth, setIsAuth] = useContext(AuthContext);
  const [account, setAccount] = useContext(AccountContext);

  const [isLoading, setIsLoading] = useState(true);
  const [profileID, setProfileID] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [bio, setBio] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [experience, setExperience] = useState("");
  const [profilePic, setProfilePic] = useState("");

  const [favourites, setFavourites] = useState([]);

  const [reports, setReports] = useState([]);

  const [editModal, setEditModal] = useState(false);
  const [changePWModal, setChangePWModal] = useState(false);

  let { userId } = useParams();
  let { editProfile } = useParams();

  let history = useHistory();

  useEffect(() => {
    if (editProfile) {
      setEditModal(true);
    } else {
      setEditModal(false);
    }

    const getProfileOther = (id) => {
      return fetch(process.env.REACT_APP_BACKEND + "user/viewProfile", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: id,
        }),
      })
        .then((res) => {
          return res.json();
        })
        .then((profile) => {
          setFirstName(profile.firstName);
          setLastName(profile.lastName);
          if (profile.profilePic) {
            setProfilePic(process.env.REACT_APP_BACKEND + profile.profilePic);
          } else {
            setProfilePic(avatarPlaceholder);
          }
          setBio(profile.bio);
          setCity(profile.city);
          setCountry(profile.country);
          setExperience(profile.experience);
          setFavourites(profile.favouritesData);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    async function getProfile() {
      try {
        const response = await fetch(
          process.env.REACT_APP_BACKEND + "user/getProfile",
          {
            method: "GET",
            credentials: "include",
          }
        );
        const profile = await response.json();
        setProfileID(profile._id);
        setFirstName(profile.firstName);
        setLastName(profile.lastName);
        if (profile.profilePic) {
          setProfilePic(process.env.REACT_APP_BACKEND + profile.profilePic);
        } else {
          setProfilePic(avatarPlaceholder);
        }
        setBio(profile.bio);
        setCity(profile.city);
        setCountry(profile.country);
        setExperience(profile.experience);
        setFavourites(profile.favouritesData);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(null);
      }
    }

    async function getReports(id) {
      try {
        const response = await fetch(
          process.env.REACT_APP_BACKEND +
            "user/diveReports/getReportsForUser/" +
            id,
          {
            method: "GET",
            credentials: "include",
          }
        );
        const reports = await response.json();
        setReports(reports.reportsData);
      } catch (error) {
        console.log(error);
        setIsLoading(null);
      }
    }

    if (userId) {
      getProfileOther(userId);
      getReports(userId);
    } else {
      getReports(account.id);
      getProfile(account.id);
    }
  }, []);

  useEffect(() => {
    if (!firstName || !lastName) {
      document.title = "Locus - Profile";
    } else {
      document.title = "Locus - Profile - " + firstName + " " + lastName;
    }
  }, [isLoading]);

  const closeModal = () => {
    setEditModal(false);
    setChangePWModal(false);
  };

  return (
    <div>
      {editModal && (
        <div className={classes.modalOverlay} onClick={closeModal}></div>
      )}
      {changePWModal && (
        <div className={classes.modalOverlay} onClick={closeModal}></div>
      )}
      {editModal && (
        <div className={classes.editModal}>
          <CloseSVG className={classes.editModal__close} onClick={closeModal} />
          <EditProfile closeModal={closeModal} />
        </div>
      )}

      {changePWModal && (
        <div className={classes.changePWModal}>
          <CloseSVG className={classes.editModal__close} onClick={closeModal} />
          <ChangePassword closeModal={closeModal} />
        </div>
      )}

      {!isLoading && (
        <div className={classes.profilePage}>
          <div className={classes.profile}>
            <div className={classes.profileLeft}>
              <div className={classes.profileLeft__pictureContainer}>
                <img src={profilePic} className={classes.picture} />
              </div>
            </div>

            <div className={classes.profileRight}>
              <div className={classes.profileRight__nameContainer}>
                <h3 className={classes.name}>
                  {firstName} {lastName}
                </h3>
              </div>

              <div className={classes.profileRight__bioContainer}>
                <p className={classes.bio}>{bio ? bio : "N/A"}</p>
              </div>

              <div className={classes.profileRight__locationContainer}>
                <div className={classes.iconPinContainer}>
                  <PinSVG className={classes.iconPin} />
                </div>
                <p className={classes.location}>
                  {city ? city : "City"}, {country ? country : "Country"}
                </p>
              </div>

              <div className={classes.profileRight__experienceContainer}>
                <div className={classes.xpIconContainer}>
                  <XpSVG className={classes.icon} />
                </div>
                <p className={classes.experience}>
                  {experience ? experience : "Experience"}
                </p>
              </div>

              {!userId && (
                <div className={classes.profileRight__editContainer}>
                  <span
                    className={classes.edit}
                    onClick={() => setEditModal(true)}
                  >
                    Edit profile
                  </span>
                  <span
                    className={classes.changePw}
                    onClick={() => setChangePWModal(true)}
                  >
                    Change Password
                  </span>
                </div>
              )}
            </div>
          </div>

          {reports.length > 0 && (
            <div className={classes.divedAtGridContainer}>
              <h4 className={classes.divedAtHeader}>
                Dives site that {firstName} has dived at
              </h4>
              <div className={classes.divedAtContainer}>
                <div className={classes.sliderContainer}>
                  {reports.map((report, i) => (
                    <DivesiteListingThumbnail site={report.siteId} key={i} />
                  ))}
                  <div className={classes.noMoreSites}>
                    <p>{firstName} hasn't visited any other locations.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {reports != [] && (
            <div className={classes.reportsContainer}>
              <h4>Dive Reports ({reports.length})</h4>
              {reports.map((report, i) => (
                <DisplayReport report={report} key={i} />
              ))}
            </div>
          )}
          {reports.length == 0 && (
            <div className={classes.reportsContainer}>
              <h4>Dive Reports (0)</h4>
              <div className={classes.noReports}>
                <h3>There are currently no dive reports from {firstName}.</h3>
                {!userId ? <a href="/diveReports">Add a Dive Report</a> : null}
              </div>
            </div>
          )}

          <div className={classes.favouritesContainer}>
            <h3 className={classes.header}>{firstName}'s Favourites</h3>
            <div className={classes.favourites}>
              {favourites.length > 0
                ? favourites.map((favourite, i) => (
                    <DivesiteListingPanel site={favourite.site} key={i} />
                  ))
                : null}
              {favourites.length <= 0 && (
                <div className={classes.noFavourites}>
                  <h3>{firstName} has not added any favourites.</h3>
                  {!userId ? <a href="/favourites">Go to favourites</a> : null}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      {isLoading && (
        <div className={classes.spinnerContainer}>
          <Spinner />
        </div>
      )}
    </div>
  );
};

export default ProfileView;
