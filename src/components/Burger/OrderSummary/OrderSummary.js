import React, {Component} from 'react';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {

    // componentDidUpdate() {
    //     console.log('order summary updates')
    // }

    render() {

        const ingredientSummary = Object.keys(this.props.ingredients)
        
        .map(ingredientKey => {
            return (
            <li key={ingredientKey}>
                <span style={{textTransform: 'capitalize'}}> {ingredientKey} </span> : {this.props.ingredients[ingredientKey]} 
            </li>
            );
        });

        return (
            <Aux> 
                <h3> Your order:</h3>
                <p> A delicious burger with the following ingredients:</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p> Price: {this.props.price.toFixed(2)} </p>
                <p> Continue to checkout? </p>
                <Button
                    buttonType="Success"
                    clicked={this.props.continuePurchase}>CONTINUE</Button>
                <Button
                    buttonType="Danger"
                    clicked={this.props.cancelPurchase}>CANCEL</Button>
            </Aux>
        );
    }
    
}

export default OrderSummary;