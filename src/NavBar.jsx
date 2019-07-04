import React, {Component} from 'react';

class NavBar extends Component {
    render() {
        return (
            <nav className="navbar">
                <a href="/" className="navbar-brand">Chatty</a>
                <p className="users-num">{this.props.numOfUsersOn} users online</p>
            </nav>
        );
    }
}
export default NavBar;