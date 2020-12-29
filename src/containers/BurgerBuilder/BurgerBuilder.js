import React, { Component } from 'react';

import Aux from '../../hoc/Auxiliary/Auxiliary';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';

class BurgerBuilder extends Component {
    state = {
        purchasing: false,
    }

    componentDidMount() {
        this.props.onInitIngredients();
    }

    purchaseHandler = () => {
        if (this.props.isAuth) {
            this.setState({ purchasing: true })
        } else {
            this.props.onSetAuthRedirectPath('/checkout');
            this.props.history.push('/auth');
        }
    }

    cancelPurchaseHandler = () => {
        this.setState({ purchasing: false })
    }

    continuePurchaseHandler = () => {
        this.props.onInitPurchase();
        this.props.history.push('/checkout');
    }

    render() {
        const disabledInfo = {
            ...this.props.ingredients
        };

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        let purchasable = false;
        const isZero = (currentValue) => currentValue === 0;

        if (this.props.ingredients) { 
            purchasable = Object.keys(this.props.ingredients)
                .map(ingredientKey => {
                    return this.props.ingredients[ingredientKey]
                })
                .every(isZero) 
        } 
        
        let burger = this.props.error ? <p>Unfortunately, the burger can't be loaded at this time. Please try again later.</p> : <Spinner />
        let orderSummary = null;

        if (this.props.ingredients) {
            burger = (
                <Aux>
                    <Burger
                        ingredients={this.props.ingredients} />

                    <BuildControls
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientDeleted={this.props.onIngredientRemoved}
                        disabled={disabledInfo}
                        price={this.props.totalPrice}
                        purchasable={purchasable}
                        ordered={this.purchaseHandler}
                        isAuth={this.props.isAuth} />
                </Aux>
            )

            orderSummary = 
                <OrderSummary
                ingredients={this.props.ingredients}
                price={this.props.totalPrice}
                continuePurchase={this.continuePurchaseHandler}
                cancelPurchase={this.cancelPurchaseHandler} />
        } 
        
        return (
            <Aux>

                <Modal
                    show={this.state.purchasing}
                    cancelPurchase={this.cancelPurchaseHandler}>
                    {orderSummary}

                </Modal>

                {burger}

            </Aux>

        );
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuth: state.auth.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onInitPurchase: () => dispatch(actions.purchaseInit()),
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));