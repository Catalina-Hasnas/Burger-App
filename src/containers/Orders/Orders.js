import React, { Component } from 'react';

import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';
import Order from '../../components/Order/Order';
import Spinner from '../../components/UI/Spinner/Spinner';

import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

class Orders extends Component {
    

    componentDidMount() {
        this.props.onFetchOrders(this.props.token);
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
        token: state.auth.token
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: (token) => dispatch(actions.fetchOrders(token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (withErrorHandler(Orders, axios));