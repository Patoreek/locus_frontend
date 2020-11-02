import React, {useState, useEffect} from 'react';

import classes from './CommunityPhotos.module.scss';

const CommunityPhotos = (props) => {
    const siteId = props.match.params.siteId;


    useEffect(() => {

    },[]);
    
    return (
        <div>
            Community Photos
            <b> REACT BRICKS PACKAGE TO BE USED HERE FOR IMAGES </b>
        </div>
    );
};

export default CommunityPhotos;