import React, {useState, useContext } from 'react';

import { CoordsContext,
         LoadDiveSiteContext } from '../../../context/DiveSiteContext';
import { AccountContext } from '../../../context/AuthContext';

import { AddRequestContext } from '../../../context/UserContext';

// import ImageUpload from '../../ImageUpload/ImageUpload';



import classes from './AddRequestForm.module.scss';





const AddRequestForm = (props) => {

    const [coords, setCoords] = useContext(CoordsContext);
    const [account, setAccount] = useContext(AccountContext);
    const loadDiveSites = useContext(LoadDiveSiteContext);
    const [ showAddRequestModal, setShowAddRequestModal ] = useContext(AddRequestContext);
   
    const [showSuccessfulRequest, setShowSuccessfulRequest ] = useState(false); //! change to FALSE


    const [name, setName] = useState(null);
    const [area, setArea] = useState(null);
    const [country, setCountry] = useState(null);
    const [description, setDescription] = useState(null);
    const [experience, setExperience] = useState(null);
    const [siteType, setSiteType] = useState("reef");
    const [access, setAccess] = useState("rocks");
    const [maxDepth, setMaxDepth] = useState();
    const [avgDepth, setAvgDepth] = useState();
    const [minTemp, setMinTemp] = useState();
    const [maxTemp, setMaxTemp] = useState();
    const [minVis, setMinVis] = useState();
    const [maxVis, setMaxVis] = useState();
    const [suitable, setSuitable] = useState('greatSnorkel');
    

    const coordsLat = coords.lat;
    const coordsLng = coords.lng;

    //TODO: // ERROR STATE VARIABLES

    const [nameErr, setNameErr] = useState(false);
    const [areaErr, setAreaErr] = useState(false);
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
        
        if (name){
            if(!name.match(letters)){
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
        if (name === null){
            errorMessage.push("Please add a name.");
            setNameErr(true);
            setIsError(true);
        }

        
        if (area) {
            if(!area.match(letters)){
                errorMessage.push("There are numbers or symbols in the area.");
                setAreaErr(true);
                setIsError(true);
            }
            if (area.length <= 4) {
                errorMessage.push("The area is too short.");
                setAreaErr(true);
                setIsError(true);
               
            }
        }
        if(area == null) {
            errorMessage.push("Please add an area.");
            setAreaErr(true);
            setIsError(true);
        } 

        if (country) {
            if(!country.match(letters)){
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
        if(country == null) {
            errorMessage.push("Please add an country.");
            setCountryErr(true);
            setIsError(true);
        } 

        // //? ADD VALIDATION FOR DESCRIPTION ????

        if (experience == null || experience == ""){
            errorMessage.push("Please choose your experience from the selection.");
            setExperienceErr(true);
            setIsError(true);
        }

        if (siteType == null || siteType == ""){
            errorMessage.push("Please choose the type of site from the selection.");
            setSiteTypeErr(true);
            setIsError(true);
        }

        if (access == null || access == ""){
            errorMessage.push("Please choose the type of access from the selection.");
            setAccessErr(true);
            setIsError(true);
        }

        if (maxDepth) {
            if(!maxDepth.match(numbers)){
                errorMessage.push("There are letters or symbols in the max depth field.");
                setMaxDepthErr(true);
                setIsError(true);
            }
            if (maxDepth > 150) {
                errorMessage.push("The Maximum Depth is too large. Try a smaller amount.");
                setMaxDepthErr(true);
                setIsError(true);
               
            }
        }
        if(maxDepth == null || maxDepth == 0) {
            errorMessage.push("Please enter an estimate of the Max Depth.");
            setMaxDepthErr(true);
            setIsError(true);
        } 

        if (avgDepth) {
            if(!avgDepth.match(numbers)){
                errorMessage.push("There are letters or symbols in the Average depth field.");
                setAvgDepthErr(true);
                setIsError(true);
            }
            if (avgDepth > 100) {
                errorMessage.push("The Average Depth is too large. Try a smaller amount.");
                setAvgDepthErr(true);
                setIsError(true);
               
            }
        }
        if(avgDepth == null || avgDepth == 0) {
            errorMessage.push("Please enter an estimate of the avg Depth.");
            setAvgDepthErr(true);
            setIsError(true);
        } 
       
        if (minTemp) {
            if(!minTemp.match(numbers)){
                errorMessage.push("There are letters or symbols in the minimum temperature field.");
                setMinTempErr(true);
                setIsError(true);
            }
            if (minTemp > 35) {
                errorMessage.push("The minimum temperature is too large. Try a smaller amount.");
                setMinTempErr(true);
                setIsError(true);
               
            }
        }
        if(minTemp == null || minTemp == 0) {
            errorMessage.push("Please enter an estimate of the minimum temperatue.");
            setMinTempErr(true);
            setIsError(true);
        } 

        if (maxTemp) {
            if(!maxTemp.match(numbers)){
                errorMessage.push("There are letters or symbols in the maximum temperature field.");
                setMaxTempErr(true);
                setIsError(true);
            }
            if (maxTemp > 75) {
                errorMessage.push("The maximum temperature is too large. Try a smaller amount.");
                setMaxTempErr(true);
                setIsError(true);
               
            }
        }
        if(maxTemp == null || maxTemp == 0) {
            errorMessage.push("Please enter an estimate of the maximum temperature.");
            setMaxTempErr(true);
            setIsError(true);
        } 

        if (minVis) {
            if(!minVis.match(numbers)){
                errorMessage.push("There are letters or symbols in the minimum visibility field.");
                setMinVisErr(true);
                setIsError(true);
            }
            if (minVis > 20) {
                errorMessage.push("The minimum visibility is too large. Try a smaller amount.");
                setMinVisErr(true);
                setIsError(true);
               
            }
        }
        if(minVis == null || minVis == 0) {
            errorMessage.push("Please enter an estimate of the minimum visibility.");
            setMinVisErr(true);
            setIsError(true);
        } 

        if (maxVis) {
            if(!maxVis.match(numbers)){
                errorMessage.push("There are letters or symbols in the maximum visibility field.");
                setMaxVisErr(true);
                setIsError(true);
            }
            if (maxVis > 100) {
                errorMessage.push("The maximum visibility is too large. Try a smaller amount.");
                setMaxVisErr(true);
                setIsError(true);
               
            }
        }
        if(maxVis == null || maxVis == 0) {
            errorMessage.push("Please enter an estimate of the maximum visibility.");
            setMaxVisErr(true);
            setIsError(true);
        } 

        if (suitable == null || suitable == ""){
            errorMessage.push("Please choose the dive sites suitability from the selection.");
            setSuitableErr(true);
            setIsError(true);
        }

        setErrMsg(errorMessage);
        console.log(errMsg);

        console.log(isError);
        //! STATE HAS TO CHANGE BEFORE IT CHECKS THIS SO IT WORKS ON ONE CLICK;

        if (isError == false || (isError != null && !isError )) {
            return fetch('http://localhost:8080/diveSites/addRequestSite',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    diveSite: {
                        userId: account.id,
                        userFirstName: account.firstName,
                        userLastName: account.lastName,
                        name: name,
                        area: area,
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
                        experience: experience
                    }
                })
            })
            .then(res => {
                return res.json();
            })
            .then(result => {
                console.log(result);
                if (result.success) {
                    setShowSuccessfulRequest(true);
                }
                // setShowAddRequestModal(false);
                // loadDiveSites();
            })
            .catch(err => {
                console.log(err);
            });
        }

    }
    


    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Submitting Request to add a dive site form...');

        setNameErr(false);
        setAreaErr(false);
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
       // name, area, description, type, latitude, longitude, userId, loadDiveSites, setShowAddModal
    }
   

    return (
        <div>
            {/* IF showDeleteModal is false then show edit modal */}
            {!showSuccessfulRequest && (

                <div className={classes.form}>
                    <div className={classes.form__backBtnContainer}>
                        <span className={classes.backBtn} onClick={() => setShowAddRequestModal(false)}>Back</span>
                    </div>
                    <div className={classes.form__headerContainer}>
                        <h3 className={classes.header}>Request to add a dive site</h3>
                    </div>
                    <div className={classes.form__nameContainer}>
                        <input  className={`${classes.input} ${classes.input__name}`}
                                //placeholder="Name of Dive Site"
                                value={name}
                                onChange={e => setName(e.target.value)} />
                        <span className={classes.label}>Name</span>
                    </div>
                    
                    <div className={classes.form__areaContainer}>
                        <input className={`${classes.input} ${classes.input__area}`}
                                //placeholder="Area / Suburb"
                                value={area}
                                onChange={e => setArea(e.target.value)} />
                        <span>Area</span>
                    </div>
                    <div className={classes.form__countryContainer}>
                        <input className={`${classes.input} ${classes.input__country}`}
                                //placeholder="Country"
                                value={country}
                                onChange={e => setCountry(e.target.value)} />
                        <span>Country</span>
                    </div>
                  

                    <div className={classes.form__descriptionContainer}>
                        <textarea className={`${classes.input} ${classes.input__description}`}
                                    rows="10"
                                    value={description}
                                    //placeholder="Description"
                                    onChange={e => setDescription(e.target.value)} />
                        <span>Description</span>
                    </div>
                  
                    <div className={classes.form__section1}>
                        <div className={classes.accessContainer}>
                            <select value={access} onChange={e => setAccess(e.target.value)} className={`${classes.input} ${classes.accessContainer__input}`}>
                                <option value="rocks">Rocks</option>
                                <option value="boat">Boat</option>
                                <option value="beach">Beach</option>
                            </select>
                            <span>Access</span>
                        </div>
                        
                        <div className={classes.siteTypeContainer}>
                            <select value={siteType} onChange={e => setSiteType(e.target.value)} className={`${classes.input} ${classes.siteTypeContainer__input}`}>
                                <option value="reef">Reef</option>
                                <option value="wreck">Wreck</option>
                                <option value="cave">Cave</option>
                                <option value="deep">Deep</option>
                            </select>
                            <span>Site Type</span>
                     
                        </div>

                        <div className={classes.maxDepthContainer}>
                            {/* <span className={classes.maxDepthContainer__title}>Max Depth</span> */}
                            <input   className={`${classes.input} ${classes.input__maxDepth}`}
                                    //placeholder="Max Depth"
                                    value={maxDepth}
                                    onChange={e => setMaxDepth(e.target.value)} />
                            <span>Max Depth</span>
                        </div>
                        
                        <div className={classes.avgDepthContainer}>
                            {/* <span className={classes.avgDepthContainer__title}>Avg Depth</span> */}
                            <input   className={`${classes.input} ${classes.input__avgDepth}`}
                                    //placeholder="Max Depth"
                                    value={avgDepth}
                                    onChange={e => setAvgDepth(e.target.value)} 
                                    />
                            <span>Average Depth</span>
                        </div>
                        
                    </div>

                    <div className={classes.form__section2}>
                        <div className={classes.temperatureContainer}>
                            <h5 className={classes.temperatureContainer__title}>Temperature (C)</h5>
                                <div className={classes.minTempContainer}>
                                    <input className={`${classes.input} ${classes.input__minTemp}`}
                                        //placeholder="Average Minimum Temperature"
                                        value={minTemp}
                                        onChange={e => setMinTemp(e.target.value)} 
                                        />
                                    <span>Minimum Temperature</span>
                                </div>
                                <div className={classes.maxTempContainer}>
                                    <input className={`${classes.input} ${classes.input__maxTemp}`}
                                        //placeholder="Average Maximum Temperature"
                                        value={maxTemp}
                                        onChange={e => setMaxTemp(e.target.value)} 
                                        />
                                    <span>Maximum Temperature</span>
                                </div>
                        </div>
                 
                    
                        
                        <div className={classes.visibilityContainer}>
                            <h5 className={classes.visibilityContainer__title}>Visibility (m)</h5>
                            <div className={classes.minVisContainer}>
                                <input className={`${classes.input} ${classes.input__minVis}`}
                                    // placeholder="Average Minimum Visibility"
                                    value={minVis}
                                    onChange={e => setMinVis(e.target.value)} 
                                    />
                                <span>Minimum Visibility</span>
                            </div>
                            <div className={classes.maxVisContainer}>
                                <input className={`${classes.input} ${classes.input__maxVis}`}
                                    // placeholder="Average Maximum Visibility"
                                    value={maxVis}
                                    onChange={e => setMaxVis(e.target.value)} 
                                    />
                            </div>
                        </div>
                    </div>
                    

                            <span>Maximum Visibility</span>
                    <div className={classes.form__section3}>
                        <div className={classes.experienceContainer}>
                            <input className={`${classes.input} ${classes.input__experience}`}
                                // placeholder="Advanced Open Water Diver"
                                value={experience}
                                onChange={e => setExperience(e.target.value)} 
                                />
                            <span>Diver Experience</span>
                        </div>
                        
                    </div>
            
                    <div className={classes.form__section4}>
                        <div className={classes.suitableContainer}>
                            <select  value={suitable} onChange={e => setSuitable(e.target.value)}  className={classes.input}>
                                <option value="greatSnorkel">Great for snorkelling</option>
                                <option value="greatScuba">Great for scuba</option>
                                <option value="greatFreedive">Great for free diving</option>
                            </select>
                            <span>Suitable for</span> {/* Dive Type */}
                        </div>
                    </div>

                    <div className={classes.form__cancelBtnContainer}>
                        <button className={classes.cancelBtn}>Cancel</button>
                    </div>

                    <div className={classes.form__addBtnContainer}>
                        <input
                                placeholder="Add"
                                type="submit"
                                onClick={(e) => handleSubmit(e)}
                                className={classes.addBtn}/>
                    </div>

                    <div className={classes.form__messageContainer}>
                        {isError ? <p className={classes.errorMsg}>Whoops! Something went wrong!</p> : null }
                        {errMsg.map(message => <p className={classes.errorMsg}>{message}</p>)}
                                
                    </div>

                  </div>
            
            )}

            {showSuccessfulRequest && (
                <div className={classes.successfulContainer}>

                    <h3 className={classes.successfulContainer__header}>You have successfully sent a request.</h3>
                    <h4 className={classes.successfulContainer__subheader}>We will contact you once we review your request.</h4>

                    <a href="/map" className={classes.successfulContainer__backBtn}> Back to map </a>
                </div>
            )}
        </div>
    );
};

export default AddRequestForm;