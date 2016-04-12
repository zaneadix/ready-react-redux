import '../core.scss';

import React from 'react';
import Header from '../pres/Header';

console.log(Header);

class App extends React.Component {

	render () {

		return (

			<div>
			
				<Header></Header>

				<div id="app-content" className="main-content container">

					{this.props.children}

				</div>

			</div>
		)
	}
}

export default App;