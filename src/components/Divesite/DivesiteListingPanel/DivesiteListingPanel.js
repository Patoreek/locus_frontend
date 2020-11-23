import React, {useState, useContext, useEffect} from 'react';

import classes from './DivesiteListingPanel.module.scss';

import { AuthContext } from '../../../context/AuthContext';

import StarRating from '../../../components/StarRating/StarRating';
import FavouriteButton from '../../../components/Buttons/FavouriteButton/FavouriteButton';
import EllipsesButton from '../../../components/Buttons/EllipsesButton/EllipsesButton';

import { EditModalContext,
    DeleteModalContext } from '../../../context/UserContext';
import { SiteContext } from '../../../context/DiveSiteContext';

import { ReactComponent as EditSVG } from '../../../assets/icons/edit.svg';


const DivesiteListingPanel = (props) => {

    const [isAuth, setIsAuth] = useContext(AuthContext);

    const [ selectedSite, setSelectedSite ] = useContext(SiteContext);
    const [ showDeleteModal, setShowDeleteModal] = useContext(DeleteModalContext);
    const [ showEditModal, setShowEditModal ] = useContext(EditModalContext);

    const [edit, setEdit] = useState(false);

    const site = props.site;

    useEffect(() => {
        if (props.edit){
            setEdit(props.edit);
        } else {
            setEdit(false);
        }
    }, [])

    

    const editSiteHandler = () => {
        setShowDeleteModal(false);
        setShowEditModal(true);
    }

    return (
        <div className={classes.site}>
                    <div className={classes.site__imageContainer}>
                        <a href={"/divesite/" + site._id}>
                            <img src={'http://localhost:8080/' + site.images[0]}
                                className={classes.image}
                            />
                        </a>
                    </div>

                    <div className={classes.site__diveTypeContainer}>
                        <span> {site.siteType} Dive · {site.suitable}</span> 
                    </div>


                    <div className={classes.site__nameContainer}>
                        <h5  className={classes.siteName}>
                            <a href={"/divesite/" + site._id}>
                                {site.name}, {site.area}
                            </a>
                        </h5>
                    </div>


                    {isAuth && !edit && (
                        <div className={classes.site__favButtonContainer}>
                            <FavouriteButton site={site}/> 
                        </div>
                    )}

                    {isAuth && edit && (
                    <div className={classes.site__editContainer}>
                        <EditSVG className={classes.edit} onClick={() => {
                                setSelectedSite(site);
                                editSiteHandler();
                        }}/>
                    </div>
                    )}

                

                    <div className={classes.site__descriptionContainer}>
                        <p className={classes.siteDescription}> {site.description} </p>
                    </div>

                    <div className={classes.site__ratingsContainer}>
                        <StarRating site={site}/>
                    </div>

                    <div className={classes.site__moreDetailsContainer}>
                                <a href={"/divesite/" + site._id} className={classes.moreDetailsButton}>
                                        More Details...
                                    </a>
                    </div>
                
                </div>
           
    );
};

export default DivesiteListingPanel;