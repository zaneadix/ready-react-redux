import React                 from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './app/cont/AppContainer';
import Repos from './repos/cont/ReposContainer';
import SignIn from './sign-in/cont/SignInContainer';

export default (

	<Route path="/" name="App" components={ App }>
		<IndexRoute component={ SignIn }></IndexRoute>
		<Route path="repos" component={ Repos }></Route>
	</Route>
);