import React from 'react';

import classes from './AboutView.module.css';

const AboutView = () => {
    return (
        <div className={classes.aboutUsPage}>
            <div className={classes.aboutUsContainer}>
                <h1> About Locus Page </h1>
                <h3> One sentence that describes Locus</h3>

                <h5>Mission Statement</h5>
                <h5>General Overview</h5>
                <h5>User Guide</h5>
            </div>
        </div>
    );
};

export default AboutView;