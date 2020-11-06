import React from 'react';
import classes from './Logo.module.css'
import burgerLogo from '../../assets/images/burger-logo.png'

const logo = (props) => {

    const logoStyles = {
        height: props.height,
        marginBottom: props.marginBottom
    }

    return (
        <div className={classes.Logo} style={logoStyles}>
            <img src={burgerLogo} alt="My burger"></img>
        </div>
    );
};

export default logo;