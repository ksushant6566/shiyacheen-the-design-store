import React from 'react';
import './styles.scss';

const MessageBox = ({ msg, show }) => {
    
    if(!show) return null;
    
    return (
        <div className="msgBox">
            <p>
                {msg}
            </p>
        </div>
    )
}

export default MessageBox;