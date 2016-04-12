import request from 'axios';
import * as constants from '../constants';

const usersURL = 'https://api.github.com/users/:username'

function requestUser (username) {

    return { type: constants.USER_REQUEST}
}

function recieveUser (user) {

    console.log(user);

    return {
        type: constants.USER_RECIEVE,
        user
    }
}

function fetchUser (username, redirect) {

    return (dispatch, getState) => {

        // Tell the application state
        // we're looking for user data
        dispatch(requestUser(username));

        // return a thunk for the thunk
        // middleware
        return request
            .get(usersURL.replace(':username', username))
            .then(response => response.data)
            .then(user => {
                
                // user has been retrieved
                // notify the store
                dispatch(recieveUser(user));
                if (redirect) redirect();
            });
    }
}

const userActions = {
    fetchUser: fetchUser,
    recieveUser: recieveUser,
    requestUser: requestUser
}

export default userActions;