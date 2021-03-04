import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { signOutUserStart } from '../../redux/User/user.actions';

import { selectCartItemsCount } from "../../redux/Cart/cart.selectors";

import './styles.scss';

import Logo from '../../assets/imgs/Logo.png';

const mapState = (state) => ({
    currentUser: state.user.currentUser,
    totalNumCartItems: selectCartItemsCount(state)
});

const Header = props => {
    const dispatch = useDispatch();
    const { currentUser, totalNumCartItems } = useSelector(mapState);

    const [showHam, setShowHam] = useState(false);

    const handleSignOut = () => {
        dispatch(signOutUserStart())
    }

    const handleHamburgerClick = () => {
        if( document.getElementsByClassName("line")[0].classList.contains("change") ) {
            document.getElementsByClassName("line").forEach(element => {
                element.classList.remove("change");
            });

            document.getElementsByClassName("callToActions")[0].classList.remove("change")
        }else {
            document.getElementsByClassName("line").forEach(element => {
                element.classList.add("change");
            });

            document.getElementsByClassName("callToActions")[0].classList.add("change")
        }

        setShowHam(b => !b);
    }

    return (window.innerWidth > 800 ? 
        <header className="header">
            <div className='wrap'>
                <div className='logo'>
                    <Link to='/'>
                        <img src={Logo} alt="Shiyacheen"></img>
                    </Link>
                </div>

                <nav>
                    <ul>
                        <li>
                            <Link to="/search">
                                Products
                            </Link>
                        </li>

                    </ul>
                </nav>

                <div className='callToActions'>
                    {currentUser && (
                        <ul>
                            <li>
                                <Link to="/cart">
                                    Cart ({totalNumCartItems})
                                </Link>
                            </li>
                            <li>
                                <Link to='/dashboard'>
                                    My Account
                            </Link>
                            </li>
                            <li>
                                <span onClick={handleSignOut}>
                                    Logout
                            </span>
                            </li>
                        </ul>
                    )}

                    {!currentUser && (
                        <ul>
                            <li>
                                <Link to='/registration'>
                                    Register
                            </Link>
                            </li>
                            <li>
                                <Link to='/login'>
                                    Login
                            </Link>
                            </li>
                        </ul>
                    )
                    }
                </div>
            </div>
        </header>
         :
        <header>
            <div className='logo'>
                <Link to='/'>
                    <img src={Logo} alt="Shiyacheen"></img>
                </Link>
            </div>
            <div className="hamburger" onClick={() => handleHamburgerClick()}>
                <div className="line line-1"></div>
                <div className="line line-2"></div>
                <div className="line line-3"></div>
            </div>
            {/* {showHam && ( */}
            <div className="callToActions">
                <ul>
                    <li>
                        <Link to="/search">
                            Products
                        </Link>
                    </li>
                </ul>

                {currentUser ? (
                    <ul>
                        <li>
                            <Link to="/cart">
                                Cart ({totalNumCartItems})
                            </Link>
                        </li>
                        <li>
                            <Link to='/dashboard'>
                                My Account
                        </Link>
                        </li>
                        <li>
                            <span onClick={handleSignOut}>
                                Logout
                        </span>
                        </li>
                    </ul>
                ) : (
                        <ul>
                            <li>
                                <Link to='/registration'>
                                    Register
                        </Link>
                            </li>
                            <li>
                                <Link to='/login'>
                                    Login
                        </Link>
                            </li>
                        </ul>
                    )}
                <hr />
            </div>
        </header>
    )
};

Header.defaultProps = {
    currentUser: null,
}

export default Header; 