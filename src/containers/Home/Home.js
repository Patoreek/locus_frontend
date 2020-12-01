import React, { useState, useContext, useEffect } from 'react';

import { AuthDrawerContext, NavbarContext } from '../../context/AuthContext';

import classes from './Home.module.scss';

import {ReactComponent as GlobeSVG} from '../../assets/icons/globe.svg';
import {ReactComponent as SnorkelSVG} from '../../assets/icons/snorkel.svg';
import {ReactComponent as BinocularsSVG} from '../../assets/icons/binoculars.svg';

import homeImg1 from '../../assets/images/homeImg1.jpg';
import homeImg2 from '../../assets/images/homeImg2.jpg';
import homeImg3 from '../../assets/images/homeImg3.jpg';
import homeImg4 from '../../assets/images/homeImg4.jpg';

import Searchbar from '../../components/Searchbar/Searchbar';

import {ReactComponent as Wave1SVG} from '../../assets/images/Wave1.svg';
import {ReactComponent as Wave2SVG} from '../../assets/images/Wave2.svg';
import {ReactComponent as Wave3SVG} from '../../assets/images/Wave3.svg';
import {ReactComponent as BubbleSVG} from '../../assets/images/Bubble.svg';








const Home = () => {

    const [authDrawer, setAuthDrawer] = useContext(AuthDrawerContext);
    const [navbar, setNavbar] = useContext(NavbarContext);
    //const [authDrawer, setAuthDrawer] = useContext(AuthDrawerContext);

    const [offsetY, setOffsetY] = useState(0);
    const handleYScroll = () => setOffsetY(window.pageYOffset);

    const [offsetX, setOffsetX] = useState(0);
    const handleXScroll = () => setOffsetX(window.pageXOffset);


    useEffect(() => {
        setNavbar("home");


        window.addEventListener("scroll",handleYScroll);
        window.addEventListener("scroll",handleXScroll);


        return function cleanup() {
            setNavbar("main");
            window.removeEventListener("scroll", handleYScroll);
            window.removeEventListener("scroll", handleXScroll);

        };
    },[]);

    const signupHandler = () => {
            setAuthDrawer({
                open: true,
                login: false,
                signup: true,
                forgotPw: false
            });
    }


    //console.log(isRowBased);

    return (
        <div>
        <div className={`${classes.home} ${authDrawer.open ? classes.shrink : null}`}>
            <div className={`${classes.content}`}>
            <div className={classes.homeMainPage}>
                <div className={authDrawer.open ? classes.groupedContent__disappear : classes.groupedContent__display}>
                    <h1 className={classes.homeMainPage__title}>Find your Atlantis</h1> 
                        {/* <p className={classes.homeDescription}> A description of what this website is trying to achieve</p> */}
                        <div className={classes.searchContainer}>
                            <Searchbar/>
                        </div>

                        <div className={classes.pointsContainer}>
                {/* //TODO|||||||||| DIVE SITES ACROSS THE GLOBE ||||||||||||||||||||||| */}
                <div className={classes.point}>
                    <div className={classes.point__icon}>
                        <GlobeSVG className={classes.icon}/>
                    </div>
                    <div className={classes.point__title}>
                    <h4>Dive sites across the globe</h4>
                    </div>
                    <div className={classes.point__description}>
                    <p>Find dive sites anywhere in the world. With new dive sites added and updated through the community.</p>
                    </div>
                </div>

                 {/* //TODO|||||||||| SNORKEL, FREEDIVE OR SCUBA ||||||||||||||||||||||| */}
                 <div className={classes.point}>
                    <div className={classes.point__icon}>
                        <SnorkelSVG className={classes.icon}/>
                    </div>
                    <div className={classes.point__title}>
                    <h4>Snorkel, Free dive or Scuba</h4>
                    </div>
                    <div className={classes.point__description}>
                    <p>No matter what skill you are, there is a dive site for you. Either for a casual snorkel or a deep wreck dive, there is a location for everyone!</p>
                    </div>
                </div>

                 {/* //TODO|||||||||| DIVE REPORTS ||||||||||||||||||||||| */}
                 <div className={classes.point}>
                    <div className={classes.point__icon}>
                        <BinocularsSVG className={classes.icon}/>
                    </div>
                    <div className={classes.point__title}>
                    <h4>Dive Reports</h4>
                    </div>
                    <div className={classes.point__description}>
                    <p>Keep logs of your dives for yourself and others to see. Explore certain dive sites reports to get real experiences of peoples dives.</p>
                    </div>
                </div>


            </div>
                </div>
            </div>


            
            
            <div className={classes.homeContent}>
                <div className={classes.homeContent__background}>
                    <Wave1SVG className={classes.wave1}/>
                    <Wave2SVG className={classes.wave2}/>
                    <Wave3SVG className={classes.wave3}/>
                    <BubbleSVG className={`${classes.bubble} ${classes.bubble__1}`}/>
                    <BubbleSVG className={`${classes.bubble} ${classes.bubble__2}`}/>
                    <BubbleSVG className={`${classes.bubble} ${classes.bubble__3}`}/>
                    <BubbleSVG className={`${classes.bubble} ${classes.bubble__4}`}/>
                    <BubbleSVG className={`${classes.bubble} ${classes.bubble__5}`}/>

                </div>
               
                <div className={classes.homeContent__1}>
                    <div className={classes.contentLeft}>
                        <div className={classes.contentLeft__titleContainer}>
                            <h3>Snorkel, scuba or free dive, theres locations all around the world waiting to be explored.</h3>
                        </div>
                        <div className={classes.contentLeft__textContainer}>
                            <p>Locus is a dive site location service for many locations across the globe. We provide information on theses sites to help find the most suitable site for you. With sites being added frequently, you will always find a new place to explore.</p>
                        </div>
                    </div>
                    <div className={classes.contentRight}>
                        <img className={`${classes.image} ${classes.image__1}`} src={homeImg1} alt="man in diving gear"/>
                        <img className={`${classes.image} ${classes.image__2}`} src={homeImg2} alt="women snorkelling"/>
                    </div>
                </div>

                <div className={classes.homeContent__2}>
                    <img className={`${classes.image} ${classes.image__3}`} src={homeImg3} alt="birds eye view of beach"/>
                    <div className={classes.mapContainer}>
                        <p className={classes.mapContainer__text}>Press the button below to go to the map or scroll up and type in a location that you want to dive. Explore around the area to discover the dive sites.</p>
                        <a href="/map" className={`${classes.btn} ${classes.btn__map}`}>Go To Map</a>
                    </div>
                    <img className={`${classes.image} ${classes.image__4}`} src={homeImg4} alt="turtle gliding through the water"/>
                    <div className={classes.signUpContainer}>
                        <p className={classes.signUpContainer__text}>Come join our community of  marine enthusiasts and adventurers that help provide information to others. You can request to add a dive site and be able to add dive reports for others to see and hear your experience.</p>
                        <button className={`${classes.btn} ${classes.btn__signUp}`} onClick={signupHandler}>Sign up</button>
                    </div>
                </div>

            </div>

            </div>
            </div>
        </div>
    );
};

export default Home;