import '../sign-in.scss';

import { Component }          from 'react';
import SignInForm             from '../pres/SignInForm';

// @connect()
export default class SignIn extends Component {

	render () {

        const { dispatch, history } = this.props;

		return (

            <div id="sign-in" className="container">

                <SignInForm></SignInForm>

            </div>
		)
	}
}