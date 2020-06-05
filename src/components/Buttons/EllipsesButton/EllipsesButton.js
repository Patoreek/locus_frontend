import React, { useState } from 'react';

import { Button, Popover, OverlayTrigger, Modal } from 'react-bootstrap';

import {
  FacebookShareButton,
  RedditShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  FacebookIcon,
  RedditIcon,
  TwitterIcon,
  WhatsappIcon
} from "react-share";

import { FaEllipsisH } from 'react-icons/fa';

import classes from './EllipsesButton.module.css';


const EllipsesButton = (props) => {

    const [showShare, setShowShare] = useState(false);
    const [showReport, setShowReport] = useState(false);

    const handleClose = () => {
      setShowReport(false);
    }


    const shareHandler = () => {
      setShowShare(!showShare);
      setShowReport(false);

    }

    const reportHandler = () => {
      setShowShare(false);
      setShowReport(!showReport);

    }

    const popover = (
        <Popover id="popover-basic">
          <Popover.Title as="h3">
            <Button onClick={shareHandler}> Share </Button>
            <Button onClick={reportHandler}> Report </Button>
          </Popover.Title>
          {showShare && (
          <Popover.Content>
          <p> Sharing features to be completed soon...</p>
            <FacebookShareButton url='https://www.facebook.com/locusDiving/'> {/* CHANGE URL TO THE SELECTED DIVE SITE*/}
              <FacebookIcon size={32} round={true} /> 
            </FacebookShareButton >
            <RedditShareButton url='https://www.facebook.com/locusDiving/'>
              <RedditIcon size={32} round={true} /> 
            </RedditShareButton>
            <TwitterShareButton url='https://twitter.com/locus88596252'>
              <TwitterIcon size={32} round={true} /> 
            </TwitterShareButton>
            <WhatsappShareButton url='https://www.facebook.com/locusDiving/'>
              <WhatsappIcon size={32} round={true} /> 
            </WhatsappShareButton>
          </Popover.Content>
          )}
          {/* <h3> Report Modal should pop up</h3> */}


          
        </Popover>
      );

    return (
      <div>

      <Modal show={showReport} onHide={handleClose} className={classes.reportModal}>
        <Modal.Header closeButton>
          <Modal.Title>Report this site</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p> Reporting section</p>
          <p> This section is still under development. If there are any issues regarding 
            locus feel free to contact us any of our social media links at the bottom
            of this website. We appreciate the the feedback :)  </p>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

        <OverlayTrigger trigger="click" placement="right" overlay={popover}>
            <Button variant="info" className={classes.button} style={props.style}><FaEllipsisH/></Button>
        </OverlayTrigger>
        </div>
    );
};

export default EllipsesButton;