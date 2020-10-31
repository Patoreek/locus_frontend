import React, {useState, useContext, useEffect} from 'react';
import classes from './DiveReportForm.module.scss';

import { AccountContext } from '../../../context/AuthContext';
import { SiteContext } from '../../../context/DiveSiteContext';

import { ReactComponent as BackSVG} from '../../../assets/icons/arrow-left.svg';

const DiveReportForm = (props) => {

    const [selectedSite, setSelectedSite] = useContext(SiteContext);
    const [account, setAccount] = useContext(AccountContext);

    const [location, setLocation] = useState();
    const [visibility, setVisibility] = useState();
    const [duration, setDuration] = useState();
    const [report, setReport] = useState();

    const [diveSites, setDiveSites] = useState([]);

    const [isLoading, setIsLoading] = useState(true);


    //? ERROR VARIABLES

    const [isError, setIsError] = useState(null);
    const [errMsg, setErrMsg] = useState([]);

    
    useEffect(() => {
        async function getSites() {
            try {
                const response = await fetch('http://localhost:8080/diveSites/getSites',{
                    method: 'GET',
                    credentials: 'include',
                });
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
        console.log('cancelling...');
        props.setShowAdd(false);
    }
    const submitHandler = (e) => {
        console.log('submitting report...');

         //validate();
       
        //! STATE HAS TO CHANGE BEFORE IT CHECKS THIS SO IT WORKS ON ONE CLICK;
        //? SOLUTION IMPLEMENTED ??? DOUBLE CHECK THIS
        //* if (!isError) {
        //if (isError == false || (isError != null && !isError )) {
            return fetch('http://localhost:8080/user/diveReports/addReport',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({
                    location: location,
                    visibility: visibility,
                    duration: duration,
                    report: report,
                    userId: account.id
                    })
            })
            .then(res => {
                return res.json();
                
            })
            .then(result => {
                console.log(result);
                    if (!result.success) {
                        //errorMessage.push(result.message);
                        setIsError(true);
                    } else {
                        // setSuccess(true);
                        // setTimeout(() => {
                        //     history.push('/profile');
                        //   }, 1500);
                    }
            })
            .catch(err => {
                console.log(err);
                //setSuccess('false');

            });
        //}
    }

    // const validate = () => {
    //     setLocationErr(false);
    //     setLastnameErr(false);
    //     setCityErr(false);
    //     setCountryErr(false);
    //     setExperienceErr(false);
    //     setIsError(false);

    //     var letters = /^[a-zA-Z]+$/;

    //     let errorMessage = [];

    //     if(!firstName.match(letters)){
    //         if(firstName == "") {
    //             errorMessage.push("Please add your first name.");
    //             setFirstnameErr(true);
    //             setIsError(true);
    //         } else {
    //             errorMessage.push("There are numbers or symbols in your first name.");
    //             setFirstnameErr(true);
    //             setIsError(true);
    //         } 
    //     }

    //     if (firstName.length <= 1) {
    //         errorMessage.push("Your first name is too short.");
    //         setFirstnameErr(true);
    //         setIsError(true);
           
    //     } 

    //      if (lastName.length <= 2) {
    //         errorMessage.push("Your last name is too short.");
    //         setLastnameErr(true);
    //         setIsError(true);
    //     } 


    //     if(!lastName.match(letters)){
    //         if(lastName == "") {
    //             errorMessage.push("Please add your last name.");
    //             setLastnameErr(true); 
    //             setIsError(true);       
    //         } else {
    //             errorMessage.push("There are numbers or symbols in your last name.");
    //             setLastnameErr(true);
    //             setIsError(true);
    //         } 
    //     }

    //     if (bio.length > 255){
    //         errorMessage.push("Bio is too long.");
    //         setBioErr(true);
    //         setIsError(true);
    //     }

    //     if(!city.match(letters)){
    //         if(city == "") {
    //             errorMessage.push("Please add a city.");
    //             setCityErr(true);     
    //             setIsError(true);   
    //         } else {
    //             errorMessage.push("There are numbers or symbols in the city.");
    //             setCityErr(true);
    //             setIsError(true);
    //         } 
    //     }

    //     if(!country.match(letters)){
    //         if(country == "") {
    //             errorMessage.push("Please add a country.");
    //             setCountryErr(true);  
    //             setIsError(true);      
    //         } else {
    //             errorMessage.push("There are numbers or symbols in the country.");
    //             setCountryErr(true);
    //             setIsError(true);
    //         } 
    //     }

    //     if (experience == null || experience == ""){
    //         errorMessage.push("Please choose your experience from the selection.");
    //         setExperienceErr(true);
    //         setIsError(true);
    //     }

    //     setErrMsg(errorMessage);
    //     console.log(errorMessage);
    //     console.log(isError);
    // }




    return (
        <div className={classes.form}>
           
                    <div className={classes.form__headerContainer}>
                        <h3 className={classes.header}>Add Dive Report</h3>
                       
                    </div>
                    <div className={classes.form__backContainer}>
                        <BackSVG className={classes.backSVG} onClick={cancelHandler}/>
                    </div>
                    
                    <div className={classes.form__locationContainer}>
                   
                            {/* {!isLoading ? <h1>isLoading is False</h1> : <h1>isLoading is TRUE</h1>} */}
                        <select value={location} onChange={e => setLocation(e.target.value)} className={`${classes.input} ${classes.input__location}`}>
                                {diveSites.map(site => (
                                     <option value={site._id}>{site.name}, {site.area}, {site.country}</option>
                                ))}
                        </select>

                

                        <span>Location</span>
                    </div>

                    
                    
                    <div className={classes.form__visibilityContainer}>
                        <input  className={`${classes.input} ${classes.input__visibility}`}
                                value={visibility}
                                onChange={e => setVisibility(e.target.value)} />
                        <span>Visibility</span>
                    </div>

                    <div className={classes.form__durationContainer}>
                        <input  className={`${classes.input} ${classes.input__duration}`}
                                value={duration}
                                onChange={e => setDuration(e.target.value)} />
                        <span>Duration</span>
                    </div>

                    <div className={classes.form__reportContainer}>
                        <textarea className={`${classes.input} ${classes.input__report}`}
                                    rows="50"
                                    value={report}
                                    //placeholder="report"
                                    onChange={e => setReport(e.target.value)} />
                        <span>Report</span>
                    </div>


                    <div className={classes.form__cancelBtnContainer}>
                        <button className={classes.cancelBtn} onClick={cancelHandler}>Cancel</button>
                    </div>

                    <div className={classes.form__submitBtnContainer}>
                        <input
                                //placeholder="Edit"
                                type="submit"
                                value="Submit"
                                onClick={(e) => submitHandler(e)}
                                className={classes.submitBtn}/>
                                
                    </div>

                    <div className={classes.form__messageContainer}>
                        {!isError && isError != null ? <p className={classes.successMsg}>Changes saved successfully</p> : null }
                        {errMsg.length > 1 ? <p className={classes.errorMsg}>Whoops! Something went wrong!</p> : null }
                        {errMsg.map(message => <p className={classes.errorMsg}>{message}</p>)}
                                
                    </div>
        </div>
    );
};

export default DiveReportForm;