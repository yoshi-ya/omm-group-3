import React from 'react';
import {useAuth0} from "@auth0/auth0-react";

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
    </div>);
};

export default Editor;
