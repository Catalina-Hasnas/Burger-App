import React, { Component } from 'react';

import Aux from '../../hoc/Auxiliary/Auxiliary';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';

const INGREDIENT_PRICES = {
    salad: 0.5,
    bacon: 0.7,
    cheese: 0.4,
    meat: 1.3
}

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4,
        purchasing: false,
        loading: false
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {...this.state.ingredients}
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;

        this.setState({
            totalPrice: newPrice,
            ingredients: updatedIngredients
        })

    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0) {
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {...this.state.ingredients}
        updatedIngredients[type] = updatedCount;
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;

        this.setState({
            totalPrice: newPrice,
            ingredients: updatedIngredients
        })
    }

    purchaseHandler = () => {
        this.setState({purchasing: true})
    }

    cancelPurchaseHandler = () => {
        this.setState({purchasing: false})
    }

    continuePurchaseHandler = () => {
        // alert("You continue!")
        this.setState({loading:true});
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'Catalina',
                adress: {
                    street: 'Blvd Iuliu Maniu 65',
                    zipCode: '12345',
                    country: 'Romania'
                },
                email: 'test@test.gmail.com',
            },
            deliveryMethod: 'fastest'
        }
        axios.post('/orders.json', order)
            .then(response => {this.setState({loading:false, purchasing: false})
        })
            .catch(error => {this.setState({loading:false, purchasing: false})
        });
    }

    render () {
        const disabledInfo = {
            ...this.state.ingredients
        };

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        const ingredients = {
            ...this.state.ingredients
        }

        const isZero = (currentValue) => currentValue === 0;

        const purchasable = Object.keys(ingredients)
            .map(ingredientKey => {
                return ingredients[ingredientKey]
            })

            .every(isZero)
        
            // console.log(this.state.purchasing)
        
        let orderSummary = 
            <OrderSummary
                ingredients={this.state.ingredients} 
                price={this.state.totalPrice}
                continuePurchase={this.continuePurchaseHandler}
                cancelPurchase={this.cancelPurchaseHandler}/>
        

        if (this.state.loading) {
            orderSummary = <Spinner />
        }
        
        return (
            <Aux>
                <Modal 
                    show={this.state.purchasing}
                    cancelPurchase={this.cancelPurchaseHandler}>
                {orderSummary}
                </Modal>

                <Burger 
                ingredients={this.state.ingredients} />

                <BuildControls 
                ingredientAdded={this.addIngredientHandler}
                ingredientDeleted={this.removeIngredientHandler}
                disabled={disabledInfo}
                price={this.state.totalPrice}
                purchasable={purchasable}
                ordered={this.purchaseHandler}/>
                
            </Aux>
        );
    }
}

export default withErrorHandler(BurgerBuilder, axios);