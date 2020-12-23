import React, {Component} from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';


import Aux from '../Auxiliary/Auxiliary';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'
import classes from './Layout.module.css';

class Layout extends Component {

    state = {
        showSideDrawer: false
    }

    sideDrawerClosedHandler = () => {
        this.setState({showSideDrawer: false});
    }

    toggleMenuHandler = (prevState) => {
        this.setState({showSideDrawer: !prevState.showSideDrawer});
    }

    render () {
        return (
            <Aux>
                <Toolbar
                isAuth={this.props.isAuth}
                toggleMenu={this.toggleMenuHandler}/>

                <SideDrawer
                isAuth={this.props.isAuth}
                open={this.state.showSideDrawer}
                closed={this.sideDrawerClosedHandler} />
        
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        );
    };
    
};

const mapStateToProps = state => {
    return {
        isAuth: state.auth.token !== null
    }
}    

export default connect( mapStateToProps, null )(Layout);