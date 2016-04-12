import { Component, PropTypes } from 'react';

class RepoSummary extends Component {

    render () {

        const { repo } = this.props;

        console.log(repo);

        return (

            <div className="repo-summary">

                <h2>{repo.get('name')}</h2>

                <p>{repo.description}</p>

            </div>
        )
    }
}

export default RepoSummary;