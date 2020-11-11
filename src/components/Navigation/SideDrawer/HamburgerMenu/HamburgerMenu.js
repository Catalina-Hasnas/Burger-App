import React from 'react';

import classes from './HamburgerMenu.module.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';


const hamburgerMenu = (props) => (
    
    <FontAwesomeIcon onClick={props.toggleMenu} icon={faBars} className={classes.HamburgerMenu}/>
    
);

export default hamburgerMenu;