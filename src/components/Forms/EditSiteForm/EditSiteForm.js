import React, {useState, useContext} from 'react';

import { FilePond } from 'react-filepond';
import "filepond/dist/filepond.min.css";

import classes from './EditSiteForm.module.scss';

import { SiteContext, LoadDiveSiteContext } from '../../../context/DiveSiteContext';
import { EditModalContext, DeleteModalContext } from '../../../context/UserContext';

import CommonFeatures from './CommonFeatures/CommonFeatures';
import ImageUpload from '../../ImageUpload/ImageUpload';

import DeleteContainer from '../DeleteContainer/DeleteContainer';





const EditSiteForm = (props) => {

    const [selectedSite, setSelectedSite] = useContext(SiteContext);
    const [showEditModal, setShowEditModal] = useContext(EditModalContext);
    const [showDeleteModal, setShowDeleteModal] = useContext(DeleteModalContext);


    const loadDiveSites = useContext(LoadDiveSiteContext);


    const [name, setName] = useState(selectedSite.name);
    const [area, setArea] = useState(selectedSite.area);
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

    console.log(commonFeatures);


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
                    area: area,
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
                      <select value={suitable} onChange={e => setSuitable(e.target.value)}  className={classes.input}>
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