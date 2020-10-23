import React, { useState, useContext, useEffect } from 'react';
import Rating from '@material-ui/lab/Rating';
import { makeStyles } from '@material-ui/core/styles';

import { AuthContext } from '../../context/AuthContext';

import { SiteContext } from '../../context/DiveSiteContext';

import customClasses from './StarRating.module.scss';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    '& > * + *': {
      marginTop: theme.spacing(1),
    },
    margin: '0 auto',
    paddingTop: '1vh',
    transform: 'translate(25%, 20%) scale(1.5)'
  }
}));







const ReviewStars = (props) => {
    const classes = useStyles();

    const [isAuth, setIsAuth] = useContext(AuthContext);
    const [selectedSite, setSelectedSite] = useContext(SiteContext);

    const [rating, setRating] = useState(1.5);
    const [totalRatings, setTotalRatings] = useState(0);

    const [value, setValue] = useState(2.5);

    const [siteId, setSiteId] = useState("");


    useEffect(()=> {
        console.log('[StarRating] siteId in useEffect = ' + props.siteId);
        setSiteId(props.siteId);
        async function checkRating() {
            try {
                const response = await fetch('http://localhost:8080/diveSites/getRating',{
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include',
                    body: JSON.stringify({
                        selectedSiteId: props.site._id
                    })
                });
                const data = await response.json();
        
                //console.log(data.fixedAverageRating);
                setRating(data.fixedAverageRating);
                setTotalRatings(data.totalRatings);
            } catch(err) {
                console.log(err);
            }
        }
          checkRating();



    
    },[]);

    // const submitRatingHandler = (newValue, siteId) => {
    //     console.log('Value: ' + newValue);
    //     console.log('Submitting Rating');
    //     console.log('[StarRating] siteId in submitRatingHandler = ' + props.siteId);
    //     console.log('[StarRating] siteId in submitRatingHandler = ' + siteId);


    //     // const response = await fetch('http://localhost:8080/diveSites/addRating',{
    //     //     method: 'POST',
    //     //     headers: {
    //     //         'Content-Type': 'application/json'
    //     //     },
    //     //     credentials: 'include',
    //     //     body: JSON.stringify({
    //     //         selectedSiteId: siteId,
    //     //         ratingValue: newValue
    //     //     })
    //     // });
    //     // const data = await response.json();
    //     // console.log(data.message);
              
    // }


    //console.log(siteId);
    const submitRating = () => {
    }
  

  return (
    <div>
    {isAuth && (
        <div className={classes.root}>

            <Rating name="half-rating"
                  precision={0.5}
                  value={rating}
                  onChange={(event, newValue) => {
                    setValue(newValue);
                    submitRating();
                    //submitRatingHandler(newValue, siteId);
                  }}
                  className={customClasses.rating}
               
            />

          <div className={customClasses.totalRatingsContainer}>
            <p className={customClasses.totalRatings}><b>({totalRatings})</b></p>
          </div>
        </div>
    )}
    {!isAuth && (
       <div className={classes.root}>
        <Rating name="half-rating-read" defaultValue={rating} precision={0.5} readOnly />
      </div>
    )}
    </div>
  );
};

export default ReviewStars;