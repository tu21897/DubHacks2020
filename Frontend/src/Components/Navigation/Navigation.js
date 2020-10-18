import React from 'react';
import { MenuItems } from "./MenuItems"
import { Link } from 'react-router-dom';
import './Navigation.css';


const Navigation = () => {
    return (
        <nav className="NavbarItems">
            <h1 className="navbar-logo"><img src="https://media.discordapp.net/attachments/766950457381486606/767419101848797204/unknown.png" height="75px" />StreamPlus.</h1>
            <ul className="nav-menu">
                {MenuItems.map((item, i) => {
                    return (
                        <li className="d-flex align-items-center" key={i}><Link to={item.url} className="nav-links">{item.title}</Link></li>
                    );
                })}

            </ul>
        </nav>
    );
}

export default Navigation;
//<li className="d-flex align-items-center"> <SignOut className="nav-links"></SignOut> </li>
