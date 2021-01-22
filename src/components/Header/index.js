import React from 'react';
import './styles.scss';

import Logo from '../../assets/imgs/Logo.png';

const Header = props => {
    return (
        <header className="header">
            <div className='wrap'>
                <img className='logo' src={Logo} alt="Shiyacheen"></img>
            </div>
        </header>
    )
};

export default Header; 