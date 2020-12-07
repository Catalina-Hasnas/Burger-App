import React, {Component} from 'react';
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
    render() {
        return (
            <div>
                <h4 className={classes.ContactData}>Entry your contact data </h4>
                <form>
                    <input type="text" name="name" placeholder="John Smith"/>
                    <input type="text" name="email" placeholder="johnsmith@mail.com"/>
                    <input type="text" name="street" placeholder="Roses Street"/>
                    <input type="text" name="postalCode" placeholder="10115"/>
                    <Button buttonType="Succes">ORDER</Button>
                </form>
            </div>
        )
    }
}

export default ContactData;