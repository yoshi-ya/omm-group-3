import React from 'react';
import Gallery from "../Gallery/Gallery";
import styles from "./Header.module.css"
import Editor from "../Editor/Editor";
import Profile from "../Profile/Profile";
import SingleView from "../SingleView/SingleView";
import {Route, Routes, BrowserRouter as Router, Link} from "react-router-dom";
import AuthenticationButton from "../AuthenticationButton/AuthenticationButton";


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
                <Route path="/profile" element={<Profile/>}/>
                <Route path="/view/:id" element={<SingleView/>}/>
                <Route exact path="/editor" element={<Editor/>}/>
                <Route path="/editor/:id" element={<Editor/>}/>
            </Routes>
        </div>
    </Router>);
};

export default Header;
