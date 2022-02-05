import React from 'react';
import {Route, Routes, BrowserRouter as Router, Link} from "react-router-dom";
import Gallery from "../Gallery/Gallery";
import Singleview from "../Gallery/Gallery";
import styles from "./Header.module.css"
import AuthenticationButton from "../AuthenticationButton/AuthenticationButton";
import Editor from "../Editor/Editor";
import Profile from "../Profile/Profile";
import {Meme} from '../Meme/Meme';
import {MemeGenerated} from '../MemeGenerated/MemeGenerated'
import PickFromURL from '../Editor/PickFromURL';
import PickFromDesktop from '../Editor/PickFromDesktop';
import PickFromCamera from '../Editor/PickFromCamera';
import DrawingCanvas from '../Editor/DrawingCanvas';
import SingleView from "../SingleView/SingleView";
import TestMemes from '../TestMemes/TestMemes';
import GallerySingleView from "../GallerySingleView/GallerySingleView";


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
                <Route path="/test" element={<TestMemes/>}/>
                <Route path="/profile/*" element={<Profile/>}/>
                <Route path="editor" element={<Editor/>}>
                    <Route path="generated" element={<MemeGenerated/>}/>
                    <Route exact path="drawing" element={<DrawingCanvas/>}/>
                    <Route exact path="pickfromUrl" element={<PickFromURL/>}/>
                    <Route exact path="pickfromDesktop" element={<PickFromDesktop/>}/>
                    <Route exact path="pickfromCamera" element={<PickFromCamera/>}/>
                    <Route exact path="random" element={<Meme/>}/>
                </Route>
                <Route path="/test" element={<GallerySingleView memesList={[{template: "https://via.placeholder.com/256?text=1"}, {template: "https://via.placeholder.com/256?text=2"}, {template: "https://via.placeholder.com/256?text=3"}, {template: "https://via.placeholder.com/256?text=4"}]} />}/>
                <Route path="/memes" element={<TestMemes/>} />
            </Routes>
        </div>
    </Router>);
};

export default Header;
