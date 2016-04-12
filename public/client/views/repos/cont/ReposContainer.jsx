import '../repos.scss'

import { Component, PropTypes } from 'react';
import { bindActionCreators }   from 'redux';
import { connect }              from 'react-redux';
import actions                  from '../../../store/actions';
import RepoSummary              from '../pres/RepoSummary';

export default class Repos extends Component {

    componentWillMount() {

        let { user } = this.props;
        this.props.fetchRepos(user.user.login);
    }

	render () {

        const { repos } = this.props;
        let repoList;

        if (repos.repos) {

            repoList = repos.repos.map((repo, index) => {
                return <RepoSummary repo={repo} key={index}></RepoSummary>
            })
        }

        return (

            <div id="repos">

                <h1 className="lined">Repos</h1>

                { repoList ? repoList : <p>Fetching...</p> }

            </div>
        )
    }
}

//state bindings
export default connect(

    //map state
    ({user, repos}) => {

        return {user, repos};
    },

    //map dispatch to props,
    dispatch => bindActionCreators(actions.repos, dispatch)

)(Repos)