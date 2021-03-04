import React from 'react';
import './styles.scss';
import Processing from '../../../assets/imgs/Processing.gif';

const Button  = ({ children, processing, ...otherProps }) => {
    return (
        <button className='btn' {...otherProps} >
            {children}
            {processing &&
                <img src={Processing} />
            }
        </button>
    )
}

export default Button;