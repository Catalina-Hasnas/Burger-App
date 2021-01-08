import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../utility/utility';

const initialState = {
    error: null,
    loading: false,
    userInfoId: "",
    userInfo: {}
};


const saveUserInfoId = ( state, action ) => {
    return updateObject ( state, {
        userInfoId: action.id
    })
}

const fillInputValues = ( state, action ) => {
    return updateObject ( state, {
        userInfo: action.userInfo
    })
}

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.SAVE_USER_INFO_ID: return saveUserInfoId(state, action);
        case actionTypes.FILL_INPUT_VALUE: return fillInputValues(state, action);
        
        default:
            return state;
    }
};

export default reducer;