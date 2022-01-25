import React, {useEffect, useState} from 'react'
import axios from 'axios';
import {useAuth0} from "@auth0/auth0-react";
import {Meme} from '../Meme/Meme';
import {Route, Routes, BrowserRouter as Router, Link} from "react-router-dom";
import styles from '../Meme/styles.module.css';
import {Outlet} from 'react-router-dom'
import { MemeGenerated } from '../MemeGenerated/MemeGenerated'
import DrawingCanvas from './DrawingCanvas';
import PickFromDesktop from './PickFromDesktop';
import PickFromURL from './PickFromURL';


const Editor = () => {
    const {isAuthenticated} = useAuth0();

    const [showCanvas, setShowCanvas] = useState(false);
    const [showPickFromDesktop, setShowPickFromDesktop] = useState(false);
    const [showPickFromURL, setShowPickFromURL] = useState(false);
    const [showRandomImg, setShowRandomImg] = useState(false);


    if (!isAuthenticated) {
        return (
            <div>
                Please log in to create and upload memes.
            </div>
        )
    }
   

    const openCanvas = () =>{
        setShowCanvas(true);
    }

    const openPickFromDesktop = () =>{
        setShowPickFromDesktop(true);
    }

    const openPickFromURL = () =>{
        setShowPickFromURL(true);
    }

    const openRandomIMG = () =>{
        setShowRandomImg(true);
    }

    return (<div>
        <div>            
            <Link to="drawing">
            <button className={styles.upload} onClick={openCanvas}>Open drawing canvas</button>
            </Link>
            <Link to="pickfromDesktop">
            <button className={styles.upload} onClick={openPickFromDesktop}>Pick image from Desktop</button>
            </Link>
            <Link to="pickfromURL">
                <button className={styles.upload} onClick={openPickFromURL}>Pick image from URL</button>
            </Link> 
            <Link to="random">
            <button className={styles.upload} onClick={openRandomIMG}>See random images</button>
            </Link>
            <Outlet/>
        </div>
        
        
        
    </div>);
};

export default Editor;
