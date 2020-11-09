import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';


const hamburgerMenu = (props) => {

    const hamburgerStyles = {
        color: "#fff",
        fontSize: "2em"
    }

    return (
    <FontAwesomeIcon onClick={props.toggleMenu} icon={faBars} style={hamburgerStyles}/>
    );
};

export default hamburgerMenu;