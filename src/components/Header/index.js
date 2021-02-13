import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { signOutUserStart } from '../../redux/User/user.actions';

import './styles.scss';

import Logo from '../../assets/imgs/Logo.png';

const Header = props => {
    const dispatch = useDispatch();

    const mapState = ({ user }) => ({
        currentUser: user.currentUser
    });
    const { currentUser } = useSelector(mapState);

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