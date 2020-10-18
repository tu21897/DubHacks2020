import React, { Component } from 'react';
import { MenuItems } from "./MenuItems"
import { Link } from 'react-router-dom';

import './Navigation.css';

class Navigation extends Component {
    state = {active: false}

    handleClick = () => {
        this.setState({active: !this.state.active})
    }

    render() {
        return(
            <nav className="NavbarItems">
                <h1 className="navbar-logo">Logo</h1>
                <div className="menu-icon" onClick = {this.handleClick}>
                </div>
                <ul>
                    {MenuItems.map((item, i) => {
                        return (
                        <li><Link to={item.url} className={item.className}>{item.title}</Link></li>
                        )
                    })}
                </ul>
            </nav>
        )
    }
}

export default Navigation;