import React from 'react'
import {useAuth0} from "@auth0/auth0-react";
import styles from '../Editor/Editor.module.css';
import {Outlet} from 'react-router-dom'
import Toolbox from "../Toolbox/Toolbox";


const Editor = () => {

    const {isAuthenticated} = useAuth0();

    if (!isAuthenticated) {
        return (<div>
            Please log in to create and upload memes.
        </div>)
    }

    return (<>
        <Toolbox />
        <div className={styles.outerContainer}>
            <div className={styles.editorContainer}>
                <Outlet/>
            </div>
        </div>
    </>);
};

export default Editor;
