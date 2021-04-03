import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.scss';

Header.propTypes = {};

function Header() {
    return (
        <header className="header">
            <div className="container">
                <div className="row text-center">
                    <div className="col-6" >
                        <NavLink
                            exact
                            className="header__link"
                            to="/photos"
                            activeClassName="header__link--active"
                        >
                            Redux Project
                        </NavLink>
                    </div>

                    <div className="col-6" >
                        <NavLink
                            exact
                            className="header__link"
                            to="/signin"
                            activeClassName="header__link--active"
                        >
                            Sign In
                        </NavLink>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;