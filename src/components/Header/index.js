import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { auth } from '../../firebase/utils';

import './styles.scss';

import Logo from '../../assets/imgs/Logo.png';

const Header = props => {

    const { currentUser } = props;

    return (
        <header className="header">
            <div className='wrap'>
                <div className='logo'>
                    <Link to='/'>
                        <img src={Logo} alt="Shiyacheen"></img>
                    </Link>
                </div>

                <div className='callToActions'>
                { currentUser && (
                    <ul>
                        <li>
                            <Link to='/dashboard'>
                                My Account
                            </Link>
                        </li>
                        <li>
                            <span onClick = {() => auth.signOut()}>
                                Logout
                            </span>
                        </li>
                    </ul>
                ) }
                
                { !currentUser && (
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
    currentUser : null,
}

const mapStateToProps = ({ user }) => ({
    currentUser: user.currentUser
});

export default connect(mapStateToProps, null)(Header); 