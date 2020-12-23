import React from 'react';
import Logo from '../../Logo/Logo'
import HamburgerMenu from '../SideDrawer/HamburgerMenu/HamburgerMenu';
import NavigationItems from '../NavigationItems/NavigationItems'
import classes from './Toolbar.module.css'

const toolbar = (props) => (

    <header className={classes.Toolbar}>

        <HamburgerMenu
        toggleMenu = {props.toggleMenu} />

        <Logo />

        <nav className={classes.DesktopOnly}>
            <NavigationItems isAuth={props.isAuth} />
        </nav>
        
    </header>
    

);

export default toolbar;