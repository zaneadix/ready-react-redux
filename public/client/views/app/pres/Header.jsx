import { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class Header extends Component {

    renderSignedIn (user) {

        return (

            <header className="clearfix">
                <div className="container pure-menu pure-menu-horizontal">
                    <ul className="pure-menu-list">
                        <li className="pure-menu-item">
                            <Link className="pure-menu-link" to="/repos">Repos</Link>
                        </li>
                        <li>
                            <img src={ user.avatar_url } alt=""/>
                        </li>
                    </ul>
                </div>
            </header>
        )
    }

    renderNotSignedIn () {

        return (

            <header className="clearfix">
                <div className="container pure-menu pure-menu-horizontal">
                    <ul className="pure-menu-list">
                        <li className="pure-menu-item">Sign In</li>
                    </ul>
                </div>
            </header>
        )
    }

    render () {

        const user = this.props.user.user;
        
        if (user) {

            return this.renderSignedIn(user);

        } else {

            return this.renderNotSignedIn();
        }
    }
}

export default connect(

    //map state
    ({user}) => ({user})

)(Header);