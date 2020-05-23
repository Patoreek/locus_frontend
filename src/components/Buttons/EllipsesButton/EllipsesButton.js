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


const EllipsesButton = () => {

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
          <h3> Buttons to share to certain sites</h3>
            <FacebookShareButton url='http://www.youtube.com'> {/* CHANGE URL TO THE SELECTED DIVE SITE*/}
              <FacebookIcon size={32} round={true} /> 
            </FacebookShareButton >
            <RedditShareButton url='http://www.youtube.com'>
              <RedditIcon size={32} round={true} /> 
            </RedditShareButton>
            <TwitterShareButton url='http://www.youtube.com'>
              <TwitterIcon size={32} round={true} /> 
            </TwitterShareButton>
            <WhatsappShareButton url='http://www.youtube.com'>
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
          <p> form with report request that will be sent for evaluation. </p>

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
            <Button variant="info"><FaEllipsisH/></Button>
        </OverlayTrigger>
        </div>
    );
};

export default EllipsesButton;