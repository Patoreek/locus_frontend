import React from 'react';

import classes from './NewsView.module.css';

const NewsView = () => {
    return (
        <div className={classes.newsPage}>

            <div className={classes.newsContainer}>
                <div className={classes.coverPhotoContainer}>
                    <h1 className={classes.newsHeader}>Locus News</h1>
                </div>

                <div className={classes.postContainer}>

                    <div className={classes.headerContainer}>
                        <h3 className={classes.postHeader}> Latest News 03/05/2020 </h3>
                    </div>

                    <div className={classes.contentContainer}>
                        <p className={classes.postContent}> The Latest news will appear here regarding updates and improvements 
                            for Locus. Currently at version 1.0 and has currently basic functionalities.
                            This includes able to make an account and add, edit and contribute to distributing
                            dive site information and locations. Basic profiles are available and basic image upload
                            is available. More improvements are planned such as forum and event features for individual
                            dive sites.
                        </p>
                    </div>
                </div>

            </div>

        </div>
    );
};

export default NewsView;