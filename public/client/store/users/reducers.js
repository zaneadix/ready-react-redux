import { Record, fromJS } from 'immutable';
import { REHYDRATE } from 'redux-persist/constants'
import * as constants from '../constants';

const UserStoreRecord = new Record({
    isFetching: false,
    didInvalidate: false,
    user: null
});

const userReducer = (state=new UserStoreRecord(), action) => {

    console.log(action);

    switch (action.type) {

        case constants.USER_REQUEST:
            return state.merge({
                isFetching: true,
                didInvalidate: false
            });

        case constants.USER_RECIEVE:
            return state.merge({
                isFetching: false,
                didInvalidate: false,
                user: action.user
            })

        case constants.USER_SIGN_OUT:
            return state.merge({
                isFetching: false,
                didInvalidate: false,
                user: null
            });

        case REHYDRATE:
            let { user } = action.payload;
            return user ? UserStoreRecord(fromJS(user)) : state;

        default:
            return state;
    }
}

export default userReducer;