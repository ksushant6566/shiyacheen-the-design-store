import React from 'react';
import './styles.scss';
import UserImg from '../../assets/imgs/user.png';

const UserProfile = ({ currentUser }) => {
    const { displayName } = currentUser;

    return (
        <div className="userProfile">
            <ul>
                <li>
                    <div className="img">
                        <img src={UserImg} alt="user" />
                    </div>
                </li>
                <li>
                    <span className="displayName">
                        {displayName && displayName}
                    </span>
                </li>
            </ul>
        </div>
    )
}

export default UserProfile;