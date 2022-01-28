import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Routes, Route, Outlet } from 'react-router-dom';
import { UserInfos } from './UserInfos';


const Profile = () => {
    const {isAuthenticated} = useAuth0();

    if (!isAuthenticated) {
        return (
            <div>
                Please log in to access your profile.
            </div>
        )
    }

    return (<div>
        <Routes>
        <Route exact path='/' element={<UserInfos/>}/>
        </Routes>
        <Outlet/>
    </div>);
};

export default Profile;
