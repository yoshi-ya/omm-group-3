import React from 'react';
import {useAuth0} from "@auth0/auth0-react";
import {Meme} from '../Meme/Meme';
import { MemeGenerated } from '../MemeGenerated/MemeGenerated'
import {Routes, Route, Outlet} from 'react-router-dom'

const Editor = () => {
    const {isAuthenticated} = useAuth0();

    if (!isAuthenticated) {
        return (
            <div>
                Please log in to create and upload memes.
            </div>
        )
    }

    return (<div>
        This is the Editor-View.
        <Routes>
        <Route exact path='/' element={<Meme/>}/>
        </Routes>
        <Outlet/>
    </div>);
};

export default Editor;
