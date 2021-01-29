import React from 'react';

// styles
import './styles.scss';

const AuthWrapper = ({headline, children}) => {
    
    return (
        <div className='authwrapper'>
            <div className='wrap'>
                { headline && 
                    <h2>{headline}</h2>
                }

                <div className='children'>
                    {children && children}
                </div>
            </div>
        </div>
    )
}

export default AuthWrapper;