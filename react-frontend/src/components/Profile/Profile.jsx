import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import UserInfos from '../UserInfos/UserInfos'

const Profile = () => {
    const {isAuthenticated} = useAuth0();

    if (!isAuthenticated) {
        return (
            <div>
                Please log in to access your profile.
            </div>
        )
    }

    return (<UserInfos />)
};

export default Profile;
