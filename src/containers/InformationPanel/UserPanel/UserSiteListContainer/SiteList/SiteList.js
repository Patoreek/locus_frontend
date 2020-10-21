import React, { useContext } from 'react';

import { EditModalContext,
         DeleteModalContext } from '../../../../../context/UserContext';
import { SiteContext } from '../../../../../context/DiveSiteContext';

import StarRating from '../../../../../components/StarRating/StarRating';

import { ReactComponent as EditSVG } from '../../../../../assets/icons/edit.svg';

import classes from './SiteList.module.scss';



const SiteList = (props) => {

    const [ showEditModal, setShowEditModal ] = useContext(EditModalContext);
    const [ selectedSite, setSelectedSite ] = useContext(SiteContext);
    const [showDeleteModal, setShowDeleteModal] = useContext(DeleteModalContext);


    const editSiteHandler = () => {
        setShowDeleteModal(false);
        setShowEditModal(true);
    }


    const showDeleteForm = () => {
        setShowEditModal(false);
        setShowDeleteModal(true);
    }

    const sites = props.sites;
    console.log('[SiteList]');
    console.log(sites);
    return (
        sites.map(site => (


            <div className={classes.site}>
                <div className={classes.site__imageContainer}>
                    <a href={"/divesite/" + site._id}>
                    <img src={'http://localhost:8080/' + site.images[0]}
                        className={classes.image}
                    />
                    </a>
                </div>

                <div className={classes.site__diveTypeContainer}>
                       <span> Shore Dive · Great for Scuba </span> 
                </div>


                <div className={classes.site__nameContainer}>
                    <h5  className={classes.siteName}>
                        <a href={"/divesite/" + site._id}>
                             {site.name}, {site.area}
                        </a>
                    </h5>
                </div>

                
                <div className={classes.site__editContainer}>
                    <EditSVG className={classes.edit} onClick={() => {
                         setSelectedSite(site);
                        editSiteHandler();
                    }}/>
                </div>

            

                <div className={classes.site__descriptionContainer}>
                    <p className={classes.siteDescription}> {site.description} </p>
                </div>

                <div className={classes.site__ratingsContainer}>
                    <StarRating siteRatings={site.ratings} site={site._id}/>
                </div>

                <div className={classes.site__moreDetailsContainer}>
                             <a href={"/divesite/" + site._id} className={classes.moreDetailsButton}>
                                    More Details...
                                </a>
                </div>
            
            </div>

        ))
            

    );
};

export default SiteList;