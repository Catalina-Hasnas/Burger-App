import React, {Component} from 'react';
import axios from '../../../axios-orders';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        }
    }

    orderHandler = () => {
        this.setState({ loading: true });
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
            customer: {
                name: 'Cristina',
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
            .then(response => {
                this.setState({ loading: false })
                console.log(response)

            })
            .catch(error => {
                this.setState({ loading: false })
                console.log(error)
            });
    }

    render() {
        return (
            <div className={classes.ContactData}>
                <h4>Entry your contact data</h4>
                <form>
                    <input type="text" name="name" placeholder="John Smith"/>
                    <input type="text" name="email" placeholder="johnsmith@mail.com"/>
                    <input type="text" name="street" placeholder="Roses Street"/>
                    <input type="text" name="postalCode" placeholder="10115"/>
                    
                </form>
                <Button buttonType="Success" clicked={this.orderHandler}>ORDER</Button>
            </div>
        )
    }
}

export default ContactData;