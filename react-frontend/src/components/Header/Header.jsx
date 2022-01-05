import React from 'react';
import {Route, Routes, BrowserRouter as Router, Link} from "react-router-dom";
import Gallery from "../Gallery/Gallery";
import styles from "./Header.module.css"
import AuthenticationButton from "../AuthenticationButton/AuthenticationButton";
import Editor from "../Editor/Editor";
import Profile from "../Profile/Profile";
import {Meme} from '../Meme/Meme';
import { MemeGenerated } from '../MemeGenerated/MemeGenerated'


const Header = () => {
    return (<Router>
            <div>
                <ul className={styles.navBar}>
                    <li className={styles.navElementLeft}>
                        <Link className={styles.navLink} to="/">Gallery</Link>
                    </li>
                    <li className={styles.navElementLeft}>
                        <Link className={styles.navLink} to="/editor">Editor</Link>
                    </li>
                    <li className={styles.navElementLeft}>
                        <Link className={styles.navLink} to="/profile">Profile</Link>
                    </li>
                    <li className={styles.navElementRight}>
                        <Link className={styles.navLink} to="/login">
                            <AuthenticationButton/>
                        </Link>
                    </li>
                </ul>
                <Routes>
                    <Route path="/" element={<Gallery/>}/>
                    <Route path="editor" element={<Editor/>}>
                        <Route path="generated" element={<MemeGenerated/>}/>
                    </Route>
                    <Route path="/profile" element={<Profile/>}/>
                </Routes>
            </div>
        </Router>);
};

export default Header;
