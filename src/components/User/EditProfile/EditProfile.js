import React, { useEffect, useState, useContext } from "react";

import { useHistory } from "react-router-dom";

import { FilePond } from "react-filepond";
import "../../../../node_modules/filepond/dist/filepond.min.css";

import { AccountContext } from "../../../context/AuthContext";

import classes from "./EditProfile.module.scss";

const EditProfile = (props) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [bio, setBio] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [experience, setExperience] = useState("Snorkeller");
  const [success, setSuccess] = useState(null);

  //TODO: ERROR Variables.
  const [isError, setIsError] = useState(null);
  const [errMsg, setErrMsg] = useState([]);
  const [firstnameErr, setFirstnameErr] = useState(false);
  const [lastnameErr, setLastnameErr] = useState(false);
  const [cityErr, setCityErr] = useState(false);
  const [countryErr, setCountryErr] = useState(false);
  const [experienceErr, setExperienceErr] = useState(false);
  const [bioErr, setBioErr] = useState(false);

  const [account, setAccount] = useContext(AccountContext);

  let history = useHistory();

  useEffect(() => {
    async function getProfile() {
      try {
        const response = await fetch("/api/user/getProfile", {
          method: "GET",
          credentials: "include",
        });
        const profile = await response.json();
        setFirstName(profile.firstName);
        setLastName(profile.lastName);
        setProfilePic(profile.profilePic);
        setBio(profile.bio);
        setCity(profile.city);
        setCountry(profile.country);
        setExperience(profile.experience);
      } catch (error) {
        console.log(error);
        //setIsLoading(null);
      }
    }
    getProfile();
  }, []);

  const editProfileHandler = () => {
    setFirstnameErr(false);
    setLastnameErr(false);
    setCityErr(false);
    setCountryErr(false);
    setExperienceErr(false);
    setIsError(false);

    var letters = /^[a-zA-Z]+$/;

    let errorMessage = [];

    if (firstName) {
      if (!firstName.match(letters)) {
        errorMessage.push("There are numbers or symbols in your first name.");
        setFirstnameErr(true);
        setIsError(true);
      }
      if (firstName.length <= 1) {
        errorMessage.push("Your first name is too short.");
        setFirstnameErr(true);
        setIsError(true);
      }
    } else {
      errorMessage.push("Please add your first name.");
      setFirstnameErr(true);
      setIsError(true);
    }

    if (lastName) {
      if (!lastName.match(letters)) {
        errorMessage.push("There are numbers or symbols in your last name.");
        setLastnameErr(true);
        setIsError(true);
      }
      if (lastName.length <= 1) {
        errorMessage.push("Your last name is too short.");
        setLastnameErr(true);
        setIsError(true);
      }
    } else {
      errorMessage.push("Please add your last name.");
      setLastnameErr(true);
      setIsError(true);
    }

    if (bio) {
      if (bio.length > 255) {
        errorMessage.push("Bio is too long.");
        setBioErr(true);
        setIsError(true);
      }
    }

    if (city) {
      if (!city.match(letters)) {
        errorMessage.push("There are numbers or symbols in the city.");
        setCityErr(true);
        setIsError(true);
      }
      if (city.length < 2) {
        errorMessage.push("Your city name is too short.");
        setCityErr(true);
        setIsError(true);
      }
    }

    if (country) {
      if (!country.match(letters)) {
        errorMessage.push("There are numbers or symbols in the country.");
        setCountryErr(true);
        setIsError(true);
      }
      if (country.length <= 3) {
        errorMessage.push("Your country name is too short.");
        setCountryErr(true);
        setIsError(true);
      }
    }

    setErrMsg(errorMessage);

    return fetch("/api/user/editProfile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        bio: bio,
        city: city,
        country: country,
        experience: experience,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        if (!result.success) {
          errorMessage.push(result.message);
          setIsError(true);
        } else {
          setSuccess(true);
          setTimeout(() => {
            window.location.reload();
          }, 1500);
        }
      })
      .catch((err) => {
        console.log(err);
        setSuccess("false");
      });
  };

  return (
    <div>
      <div className={classes.form}>
        <div className={classes.form__backBtnContainer}>
          {/* <span className={classes.backBtn} onClick={cancelHandler}>Back to Profile</span> */}
        </div>
        <div className={classes.form__headerContainer}>
          <h3 className={classes.header}>Edit Profile</h3>
        </div>
        <div className={classes.form__firstNameContainer}>
          <input
            className={`${classes.input} ${classes.input__firstName}`}
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <span>First Name</span>
        </div>

        <div className={classes.form__lastNameContainer}>
          <input
            className={`${classes.input} ${classes.input__lastName}`}
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <span>Last Name</span>
        </div>
        <div className={classes.form__cityContainer}>
          <input
            className={`${classes.input} ${classes.input__city}`}
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <span>City</span>
        </div>
        <div className={classes.form__countryContainer}>
          <input
            className={`${classes.input} ${classes.input__country}`}
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
          <span>Country</span>
        </div>
        <div className={classes.form__uploadContainer}>
          <FilePond
            className={`${classes.input} ${classes.input__upload}`}
            allowMultiple={false}
            name={"profile"}
            server={{
              url:
                process.env.REACT_APP_BACKEND +
                "user/uploadImages/" +
                account.id +
                "?folder=profile&firstName=" +
                firstName +
                "&lastName=" +
                lastName +
                "&id=" +
                account.id,
              process: {
                withCredentials: true,
              },
            }}
          />
        </div>

        <div className={classes.form__bioContainer}>
          <textarea
            className={`${classes.input} ${classes.input__bio}`}
            rows="10"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
          <span>Bio</span>
        </div>

        <div className={classes.form__experienceContainer}>
          <select
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            className={classes.input}
          >
            <option value="Snorkeller">Snorkeller</option>
            <option value="Free Diver">Free Diver</option>
            <option value="Open Water Diver">Open Water Diver</option>
            <option value="Advanced Open Water Diver">
              Advanced Open Water Diver
            </option>
            <option value="Rescue Diver">Rescue Diver</option>
            <option value="Master Scuba Diver">Master Scuba Diver</option>
            <option value="Enriched Air Diver">Enriched Air Diver</option>
            <option value="Equipment Specialist Diver">
              Equipment Specialist Diver
            </option>
            <option value="Deep Diver">Deep Diver</option>
            <option value="Wreck Diver">Wreck Diver</option>
            <option value="Sidemount Diver">Sidemount Diver</option>
            <option value="PADI Instructor">PADI Instructor</option>
            <option value="Divemaster">Divemaster</option>
          </select>
          <span>Experience</span>
        </div>

        <div className={classes.form__cancelBtnContainer}>
          <button className={classes.cancelBtn} onClick={props.closeModal}>
            Cancel
          </button>
        </div>

        <div className={classes.form__editBtnContainer}>
          <input
            type="submit"
            value="Edit"
            onClick={(e) => editProfileHandler(e)}
            className={classes.editBtn}
          />
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
    </div>
  );
};

export default EditProfile;
