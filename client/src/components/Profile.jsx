import React from 'react';
import { useSelector } from 'react-redux';

function Profile() {
    const user = useSelector((state) => state.userData.userDetails);
    return (
        <>
            <div className="profile">
                <div className="profile-details" style={{ marginLeft: '30%' }}>
                    <h2 className="profile-name">
                        Hey, <span style={{ color: 'red' }}>{user.name}</span> . What's up?
                    </h2>
                </div>
            </div>
        </>
    );
}

export default Profile;
