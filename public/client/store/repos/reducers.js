import { Record, List, fromJS } from 'immutable';
import { REHYDRATE } from 'redux-persist/constants'
import * as constants from '../constants';

const ReposRecord = new Record({
    isFetching: false,
    didInvalidate: false,
    repos: List()
});

const repoReducer = (state=new ReposRecord(), action) => {

    switch (action.type) {

        case constants.REPOS_REQUEST:
            console.log(state);
            return state.merge({
                isFetching: true,
                didInvalidate: false
            });

        case constants.REPOS_RECIEVE:
            return state.merge({
                isFetching: false,
                didInvalidate: false,
                repos: fromJS(action.repos)
            })

        case constants.USER_SIGN_OUT:
            return state.merge({
                isFetching: false,
                didInvalidate: false,
                repos: null
            })

        case REHYDRATE:
            let { repos } = action.payload;
            return repos ? ReposRecord(fromJS(repos)) : state;

        default:
            return state;
    }
}

export default repoReducer;