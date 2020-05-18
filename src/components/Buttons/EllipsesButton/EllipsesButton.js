import React from 'react';

import { Button, Popover, OverlayTrigger } from 'react-bootstrap';


const EllipsesButton = () => {

    const popover = (
        <Popover id="popover-basic">
          <Popover.Title as="h3">Popover right</Popover.Title>
          <Popover.Content>
           <Button> Share </Button>
           <Button> Report </Button>
          </Popover.Content>
        </Popover>
      );

    return (
        <OverlayTrigger trigger="click" placement="right" overlay={popover}>
            <Button variant="info">...</Button>
        </OverlayTrigger>
    );
};

export default EllipsesButton;