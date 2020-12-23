import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem'
import classes from './NavigationItems.module.css'

const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem exact link="/" > Burger Builder </NavigationItem>
        { props.isAuth ? <NavigationItem link="/orders"> Orders </NavigationItem> : null }
        { !props.isAuth 
        ? <NavigationItem link="/auth"> Sign in </NavigationItem> 
        : <NavigationItem link="/logout"> Log out </NavigationItem> }
        
    </ul>
);

export default navigationItems;