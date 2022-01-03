import React from 'react';
import {Route, Routes, BrowserRouter as Router, Link} from "react-router-dom";
import Home from "../Home/Home";
import styles from "./Header.module.css"
import AuthenticationButton from "../AuthenticationButton/AuthenticationButton";


const Header = () => {
    return (<Router>
            <div>
                <ul className={styles.navBar}>
                    <li className={styles.navElementLeft}>
                        <Link className={styles.navLink} to="/">Home</Link>
                    </li>
                    <li className={styles.navElementRight}>
                        <Link className={styles.navLink} to="/login">
                            <AuthenticationButton/>
                        </Link>
                    </li>
                </ul>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                </Routes>
            </div>
        </Router>);
};

export default Header;
