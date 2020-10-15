
import React, { useState, useEffect, useContext } from 'react';

import './UserMapContainer.css';

import {
    Marker,
    InfoWindow
} from 'react-google-maps';


import { FormContext } from '../../../context/UserContext';
import { DiveSitesContext,
         SiteContext,
         CoordsContext,
         LoadDiveSiteContext } from '../../../context/DiveSiteContext';
import { TokenContext, AuthContext } from '../../../context/AuthContext';

import MySitesMap from './MySitesMap/MySitesMap';

const UserMap = () => {


    return (
        <div>
            <MySitesMap/>
        </div>
    );
};

export default UserMap;



/// 