import React from 'react';
import {Route, Routes, BrowserRouter as Router, Link} from "react-router-dom";
import Gallery from "../Gallery/Gallery";
import styles from "./Header.module.css"
import AuthenticationButton from "../AuthenticationButton/AuthenticationButton";
import Editor from "../Editor/Editor";
import Profile from "../Profile/Profile";
import {Meme} from '../Meme/Meme';
import {MemeGenerated} from '../MemeGenerated/MemeGenerated'
import PickFromURL from '../Editor/PickFromURL';
import PickFromDesktop from '../Editor/PickFromDesktop';
import DrawingCanvas from '../Editor/DrawingCanvas';
import SingleView from "../SingleView/SingleView";
import GallerySingleView from "../GallerySingleView/GallerySingleView";
import TestMemes from "../TestMemes/TestMemes";


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
                <Route path="/editor" element={<Editor/>}/>
                <Route path="/generated" element={<MemeGenerated/>}/>
                <Route path="/profile" element={<Profile/>}/>
                <Route path="/view/:id" element={<SingleView/>}/>
                <Route exact path="/drawing" element={<DrawingCanvas/>}/>
                <Route exact path="/pickFromUrl" element={<PickFromURL/>}/>
                <Route exact path="/pickFromDesktop" element={<PickFromDesktop/>}/>
                <Route exact path="/random" element={<Meme/>}/>
                <Route path="/profile/*" element={<Profile/>}/>
                <Route path="/test" element={<GallerySingleView memesList={[{template: "https://via.placeholder.com/256?text=1"}, {template: "https://via.placeholder.com/256?text=2"}, {template: "https://via.placeholder.com/256?text=3"}, {template: "https://via.placeholder.com/256?text=4"}]} />}/>
                <Route path="/memes" element={<TestMemes/>} />
            </Routes>
        </div>
    </Router>);
};

export default Header;
