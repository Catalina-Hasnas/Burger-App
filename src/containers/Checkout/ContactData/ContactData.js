import React, {Component} from 'react';
import { connect } from 'react-redux';

import { updateObject, checkValidity } from '../../../utility/utility';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../../axios-orders';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import classes from './ContactData.module.css';

import * as actions from '../../../store/actions/index';

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'John Smith'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Roses str.'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            "zip code": {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: '15112'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5,
                    isNumeric: true
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Germany'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'name@email.com'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            "delivery method": {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'cheapest', displayValue: 'Cheapest'},
                        {value: 'fastest', displayValue: 'Fastest'}
                        
                    ]
                },
                value: 'cheapest',
                validation: {},
                valid: true
            },
        },
        formIsValid: false,
        loading: false,
        checked: localStorage.getItem('saveUserInfo') === 'true'
    }

    componentDidMount() {
        const saveUserInfo = localStorage.getItem('saveUserInfo');

        if (saveUserInfo === 'true') {
            this.props.onGetUserInfo(this.props.token, this.props.userId, this.props.userInfoId);
        }

        console.log(this.props.userInfo);
        console.log(this.state.checked);
        console.log(localStorage);
    };

    orderHandler = (event) => {
        event.preventDefault();
        const formData = {};
        for (let formElementIdentifier in this.state.orderForm) {
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }
        const order = {
            ingredients: this.props.ingredients,
            price: Number.parseFloat(this.props.totalPrice).toFixed(2),
            orderData: formData,
            userId: this.props.userId,
        }
        this.props.onOrderBurger(order, this.props.token);

        localStorage.setItem('saveUserInfo', this.state.checked);
        console.log(localStorage);
        const saveUserInfo = localStorage.getItem('saveUserInfo');

        if (saveUserInfo === 'true') {
            this.props.onSaveUserInfo(formData, this.props.token, this.props.userId);
        }
    }

    inputChangedHandler = (event, inputIdentifier) => {
        
        const updatedFormElement = updateObject(this.state.orderForm[inputIdentifier], {
            value: event.target.value,
            valid: checkValidity(event.target.value, this.state.orderForm[inputIdentifier].validation),
            touched: true
        });
        const updatedOrderForm = updateObject(this.state.orderForm, {
            [inputIdentifier]: updatedFormElement
        });
        
        let formIsValid = true;
        for (let inputIdentifier in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }
        this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid});
    }

    saveUserInfo = (event) => {
        let saveUserInfo = this.state.checked;
        if (event.target.checked) {
            saveUserInfo = true;
        } else {
            saveUserInfo = false;
        }
        this.setState({checked: saveUserInfo})
      }

    

    render () {

        const formElementsArray = [];
        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }

        const saveUserInfo = localStorage.getItem('saveUserInfo');

        let checked = false;

        if (saveUserInfo === 'true') {
            checked = true;
        }

        let checkBox = (
            <div>
                <label for="saveInfo">Save info to account</label> 
                <input type="checkbox" value="saveInfo" id="saveInfo" defaultChecked={checked} onClick={this.saveUserInfo}></input>
            </div>
        ) 

        
        let form = (
            <form autoComplete="on" onSubmit={this.orderHandler}>
                {formElementsArray.map(formElement => ( 
                    <Input 
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        id={formElement.config.id}
                        value={formElement.config.value}
                        label={formElement.id}
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                        changed={(event) => this.inputChangedHandler(event, formElement.id)}/>
                ))}
                {checkBox}
                <Button buttonType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
            </form>
        );
        if ( this.props.loading ) {
            form = <Spinner />;
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId,
        userInfoId: state.user.userInfoId,
        userInfo: state.user.userInfo
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onGetUserInfo: (token, userId, userInfoId) => dispatch(actions.getUserInfo(token, userId, userInfoId)),
        onSaveUserInfo: (formData, token, userId) => dispatch(actions.saveUserInfo(formData, token, userId)),  
        onOrderBurger: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));