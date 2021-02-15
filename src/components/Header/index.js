import React from 'react';
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

    const handleSignOut = () => {
        dispatch(signOutUserStart())
    }

    return (
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
                            <Link to="/">
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link to="/search">
                                Search
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
    )
};

Header.defaultProps = {
    currentUser: null,
}

export default Header; 