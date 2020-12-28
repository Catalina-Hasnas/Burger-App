import React, { Component } from 'react';

import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';
import Order from '../../components/Order/Order';
import Spinner from '../../components/UI/Spinner/Spinner';

import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

class Orders extends Component {
    

    componentDidMount() {
        this.props.onFetchOrders(this.props.token, this.props.userId);
    }

    render () {

        let errorMessage = null;

        if (this.props.error) {
            errorMessage = (
                <small>{this.props.error}</small> 
            )
        }

        const order = this.props.loading ? <Spinner /> : 
        
        <div>
            {errorMessage}
            {this.props.orders.map(order => (
                <Order 
                key={order.id}
                ingredients={order.ingredients}
                price={order.price} />
            ))}
        </div> 

        return order
    }
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        error: state.order.error,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: (token, userId) => dispatch(actions.fetchOrders(token, userId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (withErrorHandler(Orders, axios));