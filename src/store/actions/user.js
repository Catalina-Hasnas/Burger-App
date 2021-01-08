import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const saveUserInfoId = (id) => {
    return {
        type: actionTypes.SAVE_USER_INFO_ID,
        id: id
    }
}

export const saveUserInfo = (formData, token, userId) => {
    return dispatch => {
        const userData = {...formData, userId};
        axios.post( '/user.json?auth=' + token, userData )
        .then( response => {
            dispatch(saveUserInfoId(response.data.name))
        } )
        .catch(error => {
            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log('Error', error.message);
            }
            console.log(error.config);
            });
    }
}

export const fillInputValue = (userInfo) => { 
    return {
        type: actionTypes.FILL_INPUT_VALUE,
        userInfo: userInfo
    };
};

export const getUserInfo = (token, userId, userInfoId) => {
    return dispatch => {
        const queryParams = '?auth=' + token + '&orderBy="userId"&limitToLast=1&equalTo="' + userId + '"';
        axios.get('https://burger-app-e2b8d.firebaseio.com/user.json' + queryParams)
            .then(result => {
                const country = result.data[userInfoId].country;
                const email = result.data[userInfoId].email;
                const name = result.data[userInfoId].name;
                const street = result.data[userInfoId].street;
                let userInfo = {
                    country: country,
                    email: email,
                    name: name,
                    street: street
                } 
                dispatch(fillInputValue(userInfo))
                
            } )
            .catch(function (error) {
                if (error.response) {
                  console.log(error.response.data);
                  console.log(error.response.status);
                  console.log(error.response.headers);
                } else if (error.request) {
                  console.log(error.request);
                } else {
                  console.log('Error', error.message);
                }
                console.log(error.config);
              });
    }
}