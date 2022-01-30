import React, {useEffect, useState} from 'react'
import axios from 'axios';
import {useAuth0} from "@auth0/auth0-react";
import {Meme} from '../Meme/Meme';
import {Route, Routes, BrowserRouter as Router, Link} from "react-router-dom";
import styles from '../Editor/Editor.module.css';
import {Outlet} from 'react-router-dom'
import { MemeGenerated } from '../MemeGenerated/MemeGenerated'
import DrawingCanvas from './DrawingCanvas';
import PickFromDesktop from './PickFromDesktop';
import PickFromURL from './PickFromURL';
import TestMemes from '../TestMemes/TestMemes';
import {encode} from "base64-arraybuffer";


const Editor = () => {
    const {isAuthenticated} = useAuth0();

    const [showCanvas, setShowCanvas] = useState(false);
    const [showPickFromDesktop, setShowPickFromDesktop] = useState(false);
    const [showPickFromURL, setShowPickFromURL] = useState(false);
    const [showRandomImg, setShowRandomImg] = useState(false);
    const [memes, setMemes] = useState([]);
    const [currTemplate, setcurrTemplate] = useState(null);

    useEffect(async () => {
        let data = await axios.get("http://localhost:5001/allMemes")
        setMemes(data.data)
    }, []);


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
    const handleMeme = (_meme) =>{
        if(currTemplate== null){
            setcurrTemplate(_meme);
        }
    }

    return (<div>
        <div className={styles.container}>   
             {memes.map(meme => {
                return (<div className={styles.templates} key={meme._id}>
                    <img width='50px' height='50px' onClick={handleMeme(meme)} src={`data:image/png;base64,${encode(meme.template.data)}`}
                         alt={`meme_${meme._id}`}/>
                </div>)
            })} 
        </div>
        {currTemplate !== null
         ?
        <div className={styles.singleIMG} key={currTemplate._id}>
                    <img width='100px'  height='100px' src={`data:image/png;base64,${encode(currTemplate.template.data)}`}
                         alt={`meme_${currTemplate._id}`}/>
        </div> : 
        <></>}
        <div className={styles.containerCOL}>       
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
