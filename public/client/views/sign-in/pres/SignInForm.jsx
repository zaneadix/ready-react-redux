import { Component, PropTypes } from 'react';
import { bindActionCreators }   from 'redux';
import { connect }              from 'react-redux';
import actions                  from '../../../store/actions';


class SignInForm extends Component {

    static contextTypes = {
        store: PropTypes.any,
        router: PropTypes.object.isRequired
    };

    retrieveUser = (e) => {

        e.preventDefault();
        const { router } = this.context;

        this.props.fetchUser(this.input.value, () => {
            router.push('/repos');
        });
    }

    render () {

        const isFetching = this.props.user.isFetching;

        return (

            <form onSubmit={ this.retrieveUser }>

                <label htmlFor="username">Enter Github username</label>

                <input 
                    id="username" 
                    type="text" 
                    ref={ node => this.input = node }/>

                <button 
                    className="btn btn-primary"
                    type="submit">
                    Get User
                </button>

                {
                    isFetching ?
                    <p>Fetching...</p> :
                    null
                }

            </form>
        )
    }
}

//state bindings
export default connect(

    //map state
    ({user}) => ({user}),

    //map dispatch to props,
    dispatch => bindActionCreators(actions.user, dispatch)

)(SignInForm)