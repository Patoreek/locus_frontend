import React, { useState, useContext } from "react";

import {
  CoordsContext,
  LoadDiveSiteContext,
} from "../../../../context/DiveSiteContext";
import { AccountContext } from "../../../../context/AuthContext";

import { AddRequestContext } from "../../../../context/UserContext";

import classes from "./AddRequestForm.module.scss";

const AddRequestForm = (props) => {
  const [coords, setCoords] = useContext(CoordsContext);
  const [account, setAccount] = useContext(AccountContext);
  const loadDiveSites = useContext(LoadDiveSiteContext);
  const [showAddRequestModal, setShowAddRequestModal] = useContext(
    AddRequestContext
  );

  const [showSuccessfulRequest, setShowSuccessfulRequest] = useState(false); //! change to FALSE

  const [name, setName] = useState("");
  const [suburb, setSuburb] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [description, setDescription] = useState("");
  const [experience, setExperience] = useState("Snorkel Friendly");
  const [siteType, setSiteType] = useState("reef");
  const [access, setAccess] = useState("rocks");
  const [maxDepth, setMaxDepth] = useState("");
  const [avgDepth, setAvgDepth] = useState("");
  const [minTemp, setMinTemp] = useState("");
  const [maxTemp, setMaxTemp] = useState("");
  const [minVis, setMinVis] = useState("");
  const [maxVis, setMaxVis] = useState("");
  const [suitable, setSuitable] = useState("Great For All");

  const coordsLat = coords.lat;
  const coordsLng = coords.lng;

  //TODO: // ERROR STATE VARIABLES

  const [nameErr, setNameErr] = useState(false);
  const [suburbErr, setSuburbErr] = useState(false);
  const [cityErr, setCityErr] = useState(null);
  const [stateErr, setStateErr] = useState(null);
  const [countryErr, setCountryErr] = useState(false);
  //const [descriptionErr, setDescriptionErr] = useState(false);
  const [experienceErr, setExperienceErr] = useState(false);
  const [siteTypeErr, setSiteTypeErr] = useState(false);
  const [accessErr, setAccessErr] = useState(false);
  const [maxDepthErr, setMaxDepthErr] = useState(false);
  const [avgDepthErr, setAvgDepthErr] = useState(false);
  const [minTempErr, setMinTempErr] = useState(false);
  const [maxTempErr, setMaxTempErr] = useState(false);
  const [minVisErr, setMinVisErr] = useState(false);
  const [maxVisErr, setMaxVisErr] = useState(false);
  const [suitableErr, setSuitableErr] = useState(false);
  const [isError, setIsError] = useState(null);
  const [errMsg, setErrMsg] = useState([]);

  const requestAddDiveSite = () => {
    var letters = /^[a-zA-Z ]+$/;

    var numbers = /^[1-9]\d*$/;

    let errorMessage = [];

    console.log("adding divesite...");

    if (name) {
      if (!name.match(letters)) {
        errorMessage.push("There are numbers or symbols in the name.");
        setNameErr(true);
        setIsError(true);
      }
      if (name.length <= 4) {
        errorMessage.push("The name is too short.");
        setNameErr(true);
        setIsError(true);
      }
    }
    if (name === null) {
      errorMessage.push("Please add a name.");
      setNameErr(true);
      setIsError(true);
    }

    if (suburb) {
      if (!suburb.match(letters)) {
        errorMessage.push("There are numbers or symbols in the suburb.");
        setSuburbErr(true);
        setIsError(true);
      }
      if (suburb.length <= 4) {
        errorMessage.push("The suburb is too short.");
        setSuburbErr(true);
        setIsError(true);
      }
    }
    if (suburb == null) {
      errorMessage.push("Please add an suburb.");
      setSuburbErr(true);
      setIsError(true);
    }

    if (country) {
      if (!country.match(letters)) {
        errorMessage.push("There are numbers or symbols in the country.");
        setCountryErr(true);
        setIsError(true);
      }
      if (country.length <= 4) {
        errorMessage.push("The country is too short.");
        setCountryErr(true);
        setIsError(true);
      }
    }
    if (country == null) {
      errorMessage.push("Please add an country.");
      setCountryErr(true);
      setIsError(true);
    }

    // //? ADD VALIDATION FOR DESCRIPTION ????

    if (experience == null || experience == "") {
      errorMessage.push("Please choose your experience from the selection.");
      setExperienceErr(true);
      setIsError(true);
    }

    if (siteType == null || siteType == "") {
      errorMessage.push("Please choose the type of site from the selection.");
      setSiteTypeErr(true);
      setIsError(true);
    }

    if (access == null || access == "") {
      errorMessage.push("Please choose the type of access from the selection.");
      setAccessErr(true);
      setIsError(true);
    }

    if (maxDepth) {
      if (!maxDepth.match(numbers)) {
        errorMessage.push(
          "There are letters or symbols in the max depth field."
        );
        setMaxDepthErr(true);
        setIsError(true);
      }
      if (maxDepth > 150) {
        errorMessage.push(
          "The Maximum Depth is too large. Try a smaller amount."
        );
        setMaxDepthErr(true);
        setIsError(true);
      }
    }
    if (maxDepth == null || maxDepth == 0) {
      errorMessage.push("Please enter an estimate of the Max Depth.");
      setMaxDepthErr(true);
      setIsError(true);
    }

    if (avgDepth) {
      if (!avgDepth.match(numbers)) {
        errorMessage.push(
          "There are letters or symbols in the Average depth field."
        );
        setAvgDepthErr(true);
        setIsError(true);
      }
      if (avgDepth > 100) {
        errorMessage.push(
          "The Average Depth is too large. Try a smaller amount."
        );
        setAvgDepthErr(true);
        setIsError(true);
      }
    }
    if (avgDepth == null || avgDepth == 0) {
      errorMessage.push("Please enter an estimate of the avg Depth.");
      setAvgDepthErr(true);
      setIsError(true);
    }

    if (minTemp) {
      if (!minTemp.match(numbers)) {
        errorMessage.push(
          "There are letters or symbols in the minimum temperature field."
        );
        setMinTempErr(true);
        setIsError(true);
      }
      if (minTemp > 35) {
        errorMessage.push(
          "The minimum temperature is too large. Try a smaller amount."
        );
        setMinTempErr(true);
        setIsError(true);
      }
    }
    if (minTemp == null || minTemp == 0) {
      errorMessage.push("Please enter an estimate of the minimum temperatue.");
      setMinTempErr(true);
      setIsError(true);
    }

    if (maxTemp) {
      if (!maxTemp.match(numbers)) {
        errorMessage.push(
          "There are letters or symbols in the maximum temperature field."
        );
        setMaxTempErr(true);
        setIsError(true);
      }
      if (maxTemp > 75) {
        errorMessage.push(
          "The maximum temperature is too large. Try a smaller amount."
        );
        setMaxTempErr(true);
        setIsError(true);
      }
    }
    if (maxTemp == null || maxTemp == 0) {
      errorMessage.push("Please enter an estimate of the maximum temperature.");
      setMaxTempErr(true);
      setIsError(true);
    }

    if (minVis) {
      if (!minVis.match(numbers)) {
        errorMessage.push(
          "There are letters or symbols in the minimum visibility field."
        );
        setMinVisErr(true);
        setIsError(true);
      }
      if (minVis > 20) {
        errorMessage.push(
          "The minimum visibility is too large. Try a smaller amount."
        );
        setMinVisErr(true);
        setIsError(true);
      }
    }
    if (minVis == null || minVis == 0) {
      errorMessage.push("Please enter an estimate of the minimum visibility.");
      setMinVisErr(true);
      setIsError(true);
    }

    if (maxVis) {
      if (!maxVis.match(numbers)) {
        errorMessage.push(
          "There are letters or symbols in the maximum visibility field."
        );
        setMaxVisErr(true);
        setIsError(true);
      }
      if (maxVis > 100) {
        errorMessage.push(
          "The maximum visibility is too large. Try a smaller amount."
        );
        setMaxVisErr(true);
        setIsError(true);
      }
    }
    if (maxVis == null || maxVis == 0) {
      errorMessage.push("Please enter an estimate of the maximum visibility.");
      setMaxVisErr(true);
      setIsError(true);
    }

    if (suitable == null || suitable == "") {
      errorMessage.push(
        "Please choose the dive sites suitability from the selection."
      );
      setSuitableErr(true);
      setIsError(true);
    }

    setErrMsg(errorMessage);

    //! STATE HAS TO CHANGE BEFORE IT CHECKS THIS SO IT WORKS ON ONE CLICK;

    if (errorMessage.length == 0) {
      console.log("no errors");
      return fetch(process.env.REACT_APP_BACKEND + "diveSites/addRequestSite", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          diveSite: {
            userId: account.id,
            userFirstName: account.firstName,
            userLastName: account.lastName,
            name: name,
            suburb: suburb,
            city: city,
            state: state,
            country: country,
            latitude: coordsLat,
            longitude: coordsLng,
            description: description,
            siteType: siteType,
            access: access,
            avgDepth: avgDepth,
            maxDepth: maxDepth,
            minTemp: minTemp,
            maxTemp: maxTemp,
            minVis: minVis,
            maxVis: maxVis,
            suitable: suitable,
            experience: experience,
          },
        }),
      })
        .then((res) => {
          return res.json();
        })
        .then((result) => {
          //console.log(result);
          if (result.success) {
            setShowSuccessfulRequest(true);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setNameErr(false);
    setSuburbErr(false);
    setCityErr(false);
    setStateErr(false);
    setCountryErr(false);
    //setDescriptionErr(false);
    setExperienceErr(false);
    setSiteTypeErr(false);
    setAccessErr(false);
    setMaxDepthErr(false);
    setAvgDepthErr(false);
    setMinTempErr(false);
    setMaxTempErr(false);
    setMinVisErr(false);
    setMaxVisErr(false);
    setSuitableErr(false);
    setIsError(false);

    requestAddDiveSite();
  };

  return (
    <div>
      {!showSuccessfulRequest && (
        <div className={classes.form}>
          <div className={classes.form__backBtnContainer}>
            <span
              className={classes.backBtn}
              onClick={() => setShowAddRequestModal(false)}
            >
              Back
            </span>
          </div>
          <div className={classes.form__headerContainer}>
            <h3 className={classes.header}>Request to add a dive site</h3>
          </div>
          <div className={classes.form__nameContainer}>
            <input
              className={`${classes.input} ${classes.input__name}`}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <span className={classes.label}>Name</span>
          </div>

          <div className={classes.form__suburbContainer}>
            <input
              className={`${classes.input} ${classes.input__suburb}`}
              value={suburb}
              onChange={(e) => setSuburb(e.target.value)}
            />
            <span>Suburb</span>
          </div>

          <div className={classes.form__cityContainer}>
            <input
              className={`${classes.input} ${classes.input__city}`}
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <span>City</span>
          </div>

          <div className={classes.form__stateContainer}>
            <input
              className={`${classes.input} ${classes.input__state}`}
              value={state}
              onChange={(e) => setState(e.target.value)}
            />
            <span>State</span>
          </div>

          <div className={classes.form__countryContainer}>
            <input
              className={`${classes.input} ${classes.input__country}`}
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
            <span>Country</span>
          </div>

          <div className={classes.form__descriptionContainer}>
            <textarea
              className={`${classes.input} ${classes.input__description}`}
              rows="10"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <span>Description</span>
          </div>

          <div className={classes.form__section1}>
            <div className={classes.accessContainer}>
              <select
                value={access}
                onChange={(e) => setAccess(e.target.value)}
                className={`${classes.input} ${classes.accessContainer__input}`}
              >
                <option value="Dock">Dock</option>
                <option value="Beach">Beach</option>
                <option value="Boat">Boat</option>
                <option value="Rocks">Rocks</option>
                <option value="Ramp">Ramp</option>
              </select>
              <span>Access</span>
            </div>

            <div className={classes.siteTypeContainer}>
              <select
                value={siteType}
                onChange={(e) => setSiteType(e.target.value)}
                className={`${classes.input} ${classes.siteTypeContainer__input}`}
              >
                <option value="Bridge">Bridge</option>
                <option value="Cave">Cave</option>
                <option value="Deep">Deep</option>
                <option value="Drift">Drift</option>
                <option value="Ice">Ice</option>
                <option value="Reef">Reef</option>
                <option value="Wall">Wall</option>
                <option value="Wreck">Wreck</option>
              </select>
              <span>Site Type</span>
            </div>

            <div className={classes.avgDepthContainer}>
              <input
                className={`${classes.input} ${classes.input__avgDepth}`}
                value={avgDepth}
                onChange={(e) => setAvgDepth(e.target.value)}
              />
              <span>Average Depth</span>
            </div>

            <div className={classes.maxDepthContainer}>
              <input
                className={`${classes.input} ${classes.input__maxDepth}`}
                value={maxDepth}
                onChange={(e) => setMaxDepth(e.target.value)}
              />
              <span>Max Depth</span>
            </div>
          </div>

          <div className={classes.form__section2}>
            <div className={classes.temperatureContainer}>
              <h5 className={classes.temperatureContainer__title}>
                Temperature (C)
              </h5>
              <div className={classes.minTempContainer}>
                <input
                  className={`${classes.input} ${classes.input__minTemp}`}
                  value={minTemp}
                  onChange={(e) => setMinTemp(e.target.value)}
                />
                <span>Minimum Temperature</span>
              </div>
              <div className={classes.maxTempContainer}>
                <input
                  className={`${classes.input} ${classes.input__maxTemp}`}
                  value={maxTemp}
                  onChange={(e) => setMaxTemp(e.target.value)}
                />
                <span>Maximum Temperature</span>
              </div>
            </div>

            <div className={classes.visibilityContainer}>
              <h5 className={classes.visibilityContainer__title}>
                Visibility (m)
              </h5>
              <div className={classes.minVisContainer}>
                <input
                  className={`${classes.input} ${classes.input__minVis}`}
                  value={minVis}
                  onChange={(e) => setMinVis(e.target.value)}
                />
                <span>Minimum Visibility</span>
              </div>
              <div className={classes.maxVisContainer}>
                <input
                  className={`${classes.input} ${classes.input__maxVis}`}
                  value={maxVis}
                  onChange={(e) => setMaxVis(e.target.value)}
                />
                <span>Maximum Visibility</span>
              </div>
            </div>
          </div>

          <div className={classes.form__section3}>
            <div className={classes.experienceContainer}>
              <select
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                className={classes.input}
              >
                <option value="Snorkel Friendly">Snorkel Friendly</option>
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
                <option value="Cave Diver">Cave Diver</option>
                <option value="Sidemount Diver">Sidemount Diver</option>
                <option value="PADI Instructor">PADI Instructor</option>
                <option value="Divemaster">Divemaster</option>
              </select>
              <span>Diver Experience (Min. Exp needed)</span>
            </div>
          </div>

          <div className={classes.form__section4}>
            <div className={classes.suitableContainer}>
              <select
                value={suitable}
                onChange={(e) => setSuitable(e.target.value)}
                className={classes.input}
              >
                <option value="Great For All">Great For All</option>
                <option value="Great for Snorkelling">
                  Great for Snorkelling
                </option>
                <option value="All SCUBA Divers">All SCUBA Divers</option>

                <option value="Beginner Divers">Beginner Divers</option>
                <option value="Novice Divers">Novice Divers</option>
                <option value="Experienced Divers">Experienced Divers</option>
              </select>
              <span>Suitable for</span>
            </div>
          </div>

          <div className={classes.form__cancelBtnContainer}>
            <button
              className={classes.cancelBtn}
              onClick={() => setShowAddRequestModal(false)}
            >
              Cancel
            </button>
          </div>

          <div className={classes.form__addBtnContainer}>
            <input
              placeholder="Add"
              type="submit"
              onClick={(e) => handleSubmit(e)}
              className={classes.addBtn}
            />
          </div>

          <div className={classes.form__messageContainer}>
            {isError ? (
              <p className={classes.errorMsg}>Whoops! Something went wrong!</p>
            ) : null}
            {errMsg.map((message) => (
              <p className={classes.errorMsg}>{message}</p>
            ))}
          </div>
        </div>
      )}

      {showSuccessfulRequest && (
        <div className={classes.successfulContainer}>
          <h3 className={classes.successfulContainer__header}>
            You have successfully sent a request.
          </h3>
          <h4 className={classes.successfulContainer__subheader}>
            We will contact you once we review your request.
          </h4>

          <a href="/map" className={classes.successfulContainer__backBtn}>
            Back to map
          </a>
        </div>
      )}
    </div>
  );
};

export default AddRequestForm;
