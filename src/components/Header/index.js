import React from 'react';
import { Link } from 'react-router-dom';

import './styles.scss';

import Logo from '../../assets/imgs/Logo.png';

const Header = props => {
    return (
        <header className="header">
            <div className='wrap'>
                <div className='logo'>
                    <Link to='/'>
                        <img src={Logo} alt="Shiyacheen"></img>
                    </Link>
                </div>

                <div className='callToActions'>
                    <ul>
                        <li>
                            <Link to='/registration'>
                                Register
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </header>
    )
};

export default Header; 