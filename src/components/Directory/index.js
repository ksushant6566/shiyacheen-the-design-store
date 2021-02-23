import React from 'react';

import Men from '../../assets/imgs/men.jpg';
import Women from '../../assets/imgs/women.jpg';

import './styles.scss'

const Directory = props => {
    return (
        <div className='directory'>
            <div className='wrap'>
                <div
                    className='item'
                    style={{
                        backgroundImage: `url(${Men})`
                    }}
                >
                    <a href='/search/mens'>
                        Shop Mens
                    </a>
                </div>
                <div
                    className='item'
                    style={{
                        backgroundImage: `url(${Women})`
                    }}
                >
                    <a href='/search/womens'>
                        Shop Womens
                    </a>
                </div>
            </div>
        </div>
    )
}

export default Directory;