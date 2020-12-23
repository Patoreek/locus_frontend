import React, {useState, useContext} from 'react';

import { FilePond } from 'react-filepond';
import "filepond/dist/filepond.min.css";

import classes from './EditSiteForm.module.scss';

import { SiteContext, LoadDiveSiteContext } from '../../../../context/DiveSiteContext';
import { EditModalContext, DeleteModalContext } from '../../../../context/UserContext';

import CommonFeatures from './CommonFeatures/CommonFeatures';
import ImageUpload from '../../../ImageUpload/ImageUpload';

import DeleteContainer from '../DeleteContainer/DeleteContainer';





const EditSiteForm = (props) => {

    const [selectedSite, setSelectedSite] = useContext(SiteContext);
    const [showEditModal, setShowEditModal] = useContext(EditModalContext);
    const [showDeleteModal, setShowDeleteModal] = useContext(DeleteModalContext);


    const loadDiveSites = useContext(LoadDiveSiteContext);


    const [name, setName] = useState(selectedSite.name);
    const [suburb, setSuburb] = useState(selectedSite.suburb);
    const [city, setCity] = useState(selectedSite.city);
    const [state, setState] = useState(selectedSite.state);
    const [country, setCountry] = useState(selectedSite.country);
    const [description, setDescription] = useState(selectedSite.description);
    const [experience, setExperience] = useState(selectedSite.experience);
    const [siteType, setSiteType] = useState(selectedSite.siteType);
    const [latitude, setLatitude] = useState(selectedSite.latitude);
    const [longitude, setLongitude] = useState(selectedSite.longitude);
    const [access, setAccess] = useState(selectedSite.access);
    const [maxDepth, setMaxDepth] = useState(selectedSite.maxDepth);
    const [avgDepth, setAvgDepth] = useState(selectedSite.avgDepth);
    const [minTemp, setMinTemp] = useState(selectedSite.minTemp);
    const [maxTemp, setMaxTemp] = useState(selectedSite.maxTemp);
    const [minVis, setMinVis] = useState(selectedSite.minVis);
    const [maxVis, setMaxVis] = useState(selectedSite.maxVis);
    const [suitable, setSuitable] = useState(selectedSite.suitable);

    const [commonFeatures, setCommonFeatures] = useState(selectedSite.commonFeatures);


    const editDiveSite = () => {
        return fetch('http://localhost:8080/diveSites/editDiveSite/' + selectedSite._id,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                diveSite: {
                    id: selectedSite._id,
                    name: name,
                    suburb: suburb,
                    city: city,
                    state: state,
                    country: country,
                    latitude: latitude,
                    longitude: longitude,
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
            setShowEditModal(false);
            loadDiveSites();
        })
        .catch(err => {
            console.log(err);
        });
    
    }
    
    const handleEditSiteSubmit = (event) => {
        event.preventDefault();
 
        console.log('handleEditSiteSubmit');
        editDiveSite();
    }

    return (
        <div>
            {/* IF showDeleteModal is false then show edit modal */}
            {!showDeleteModal && (
              <div className={classes.form}>
              <div className={classes.form__backBtnContainer}>
                  <span className={classes.deleteBtn} onClick={() => setShowDeleteModal(true)}>Delete</span>

                  <span className={classes.backBtn} onClick={() => setShowEditModal(false)}>Back</span>
              </div>
              <div className={classes.form__headerContainer}>
                  <h3 className={classes.header}>Edit this dive site</h3>
              </div>
              <div className={classes.form__nameContainer}>
                  <input  className={`${classes.input} ${classes.input__name}`}
                          //placeholder="Name of Dive Site"
                          value={name}
                          onChange={e => setName(e.target.value)} />
                  <span className={classes.label}>Name</span>
              </div>
              
              <div className={classes.form__suburbContainer}>
                  <input className={`${classes.input} ${classes.input__suburb}`}
                          //placeholder="suburb / Suburb"
                          value={suburb}
                          onChange={e => setSuburb(e.target.value)} />
                  <span>Suburb</span>
              </div>

              <div className={classes.form__cityContainer}>
                  <input className={`${classes.input} ${classes.input__city}`}
                          //placeholder="city / city"
                          value={city}
                          onChange={e => setCity(e.target.value)} />
                  <span>City</span>
              </div>

              <div className={classes.form__stateContainer}>
                  <input className={`${classes.input} ${classes.input__state}`}
                          //placeholder="state / state"
                          value={state}
                          onChange={e => setState(e.target.value)} />
                  <span>State</span>
              </div>
              
              <div className={classes.form__countryContainer}>
                  <input className={`${classes.input} ${classes.input__country}`}
                          //placeholder="Country"
                          value={country}
                          onChange={e => setCountry(e.target.value)} />
                   <span>Country</span>
              </div>
              <div className={classes.form__uploadContainer}>
                    <FilePond 
                            className={`${classes.input} ${classes.input__upload}`}
                            allowMultiple={false}
                            name={"profilePicture"}
                            server={
                                {
                                    url: "http://localhost:8080/diveSites/uploadImages/" + selectedSite._id,
                                    process:{
                                        withCredentials: true
                                    }
                                }
                            }
                        />
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
                            <option value="beach">Beach</option>
                            <option value="boat">Boat</option>
                            <option value="dock">Dock</option>
                            <option value="rocks">Rocks</option>
                      </select>
                      <span>Access</span>
                  </div>
                  
                  <div className={classes.siteTypeContainer}>
                      <select value={siteType} onChange={e => setSiteType(e.target.value)} className={`${classes.input} ${classes.siteTypeContainer__input}`}>
                            <option value="reef">Reef</option>
                            <option value="wreck">Wreck</option>
                            <option value="cave">Cave</option>
                            <option value="deep">Deep</option>
                            <option value="drift">Drift</option>
                            <option value="wall">Wall</option>
                            <option value="ice">Ice</option>
                      </select>
                      <span>Site Type</span>
               
                  </div>

                  <div className={classes.maxDepthContainer}>
                      <input   className={`${classes.input} ${classes.input__maxDepth}`}
                              //placeholder="Max Depth"
                              value={maxDepth}
                              onChange={e => setMaxDepth(e.target.value)} />
                        <span>Max Depth</span>
                  </div>
                  
                  <div className={classes.avgDepthContainer}>
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
                            <span>Maximum Visibility</span>
                      </div>
                  </div>
              </div>
              

              <div className={classes.form__section3}>
                  <div className={classes.experienceContainer}>
                  <select  value={experience} onChange={e => setExperience(e.target.value)}  className={classes.input}>
                                <option value="Snorkeller">Snorkeller</option>
                                <option value="Free Diver">Free Diver</option>
                                <option value="Open Water Diver">Open Water Diver</option>
                                <option value="Advanced Open Water Diver">Advanced Open Water Diver</option>
                                <option value="Rescue Diver">Rescue Diver</option>
                                <option value="Master Scuba Diver">Master Scuba Diver</option>
                                <option value="Enriched Air Diver">Enriched Air Diver</option>
                                <option value="Equipment Specialist Diver">Equipment Specialist Diver</option>
                                <option value="Deep Diver">Deep Diver</option>
                                <option value="Wreck Diver">Wreck Diver</option>
                                <option value="Sidemount Diver">Sidemount Diver</option>
                                <option value="PADI Instructor">PADI Instructor</option>
                                <option value="Divemaster">Divemaster</option>

                            </select>
                        <span>Diver Experience</span>
                  </div>
                  
              </div>
      
              <div className={classes.form__section4}>
                  <div className={classes.suitableContainer}>
                      <select value={suitable} onChange={e => setSuitable(e.target.value)}  className={classes.input}>
                      <option value="Great location for kids">Great location for kids</option>
                                <option value="Great for Snorkelling">Great for Snorkelling</option>
                                <option value="Great for Scuba">Great for Scuba</option>
                                <option value="Experienced Divers only">Experienced Divers only</option>
                                <option value="Great for Free diving">Great for Free Diving</option>
                                <option value="Calm Waters">Calm waters</option>
                                <option value="Restaurants closeby">Restaurants closeby</option>
                                <option value="Easy to get to">Easy to get to</option>
                      </select>
                      <span>Suitable for</span> {/* Dive Type */}
                  </div>
              </div>

              <div className={classes.form__cancelBtnContainer}>
                  <button className={classes.cancelBtn}>Cancel</button>
              </div>

              <div className={classes.form__editBtnContainer}>
                  <input
                          placeholder="Add"
                          type="submit"
                          onClick={(e) => handleEditSiteSubmit(e)}
                          className={classes.editBtn}/>
              </div>

              {/* <div className={classes.form__messageContainer}>
                  {isError ? <p className={classes.errorMsg}>Whoops! Something went wrong!</p> : null }
                  {errMsg.map(message => <p className={classes.errorMsg}>{message}</p>)}
                          
              </div> */}

            </div>
      
           )}

                    
                    
              
            {showDeleteModal && ( 
                <DeleteContainer/>
            )}
             {/* ELSE showDeleteModal is true then show delete modal */}
        </div>
    );
};

export default EditSiteForm;