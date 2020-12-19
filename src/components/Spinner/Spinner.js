import React from 'react';

import { SpinnerDiamond } from 'spinners-react';

const Spinner = () => {
    return (
        <SpinnerDiamond 
        size={75}
        thickness={125}
        color={'#1263fa'}
        secondaryColor={'#0769C3'}
        speed={150}
        style={{transform: 'rotate(45deg)'}}
    />
    );
};

export default Spinner;