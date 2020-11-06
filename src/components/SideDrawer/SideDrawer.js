import React from 'react';
import Logo from '../Logo/Logo';
import NavigationItems from '../Navigation/NavigationItems/NavigationItems';
import Backdrop from '../UI/Backdrop/Backdrop';
import Aux from '../../hoc/Auxiliary'

import classes from './SideDrawer.module.css';

const sideDrawer = (props) => {

    let sideDrawerVisiblity = [classes.SideDrawer, classes.Close];

    if (props.open) {
        sideDrawerVisiblity = [classes.SideDrawer, classes.Open];
    }

    return (
        <Aux>
            <Backdrop
            show={props.open}
            clicked={props.closed}/>

            <div className={sideDrawerVisiblity.join(' ')}>
                <Logo height="11%" marginBottom="32px" />
                <nav>
                    <NavigationItems />
                </nav>
            </div>
        </Aux>
    );

};

export default sideDrawer;