import request from 'axios';
import * as constants from '../constants';

const reposURL = 'https://api.github.com/users/:username/repos';

function requestRepos () {

    return { type: constants.REPOS_REQUEST}
}

function recieveRepos (repos) {

    return {
        type: constants.REPOS_RECIEVE,
        repos
    }
}

function fetchRepos (username) {

    return (dispatch, getState) => {

        // Tell the application state
        // we're looking for repo data
        dispatch(requestRepos());

        // return a thunk for the thunk
        // middleware
        return request
            .get(reposURL.replace(':username', username))
            .then(response => response.data)
            .then(repos => {
                
                // repos have been retrieved
                // notify the store
                dispatch(recieveRepos(repos));
            });
    }
}

const repoActions = {
    fetchRepos: fetchRepos,
    recieveRepos: recieveRepos,
    requestRepos: requestRepos
}

export default repoActions;