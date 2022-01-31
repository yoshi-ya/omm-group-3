import React, {useEffect, useState} from 'react'
import axios from 'axios';
import {useAuth0} from "@auth0/auth0-react";
import {Link} from "react-router-dom";
import styles from '../Editor/Editor.module.css';
import {Outlet} from 'react-router-dom'
import {encode} from "base64-arraybuffer";
import uploadIcon from "./upload.png"
import randomIcon from "./random.png"
import urlIcon from "./url.png"
import drawingIcon from "./drawing.png"
import browseIcon from "./browse.png"


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
        return (<div>
            Please log in to create and upload memes.
        </div>)
    }

    const openCanvas = () => {
        setShowCanvas(true);
    }

    const openPickFromDesktop = () => {
        setShowPickFromDesktop(true);
    }

    const openPickFromURL = () => {
        setShowPickFromURL(true);
    }

    const openRandomIMG = () => {
        setShowRandomImg(true);
    }
    const handleMeme = (_meme) => {
        if (currTemplate == null) {
            setcurrTemplate(_meme);
        }
    }

    return (<>
        <div className={styles.editorTools}>
            <div className={styles.tooltip}>
                <Link to="drawing" onClick={openCanvas}>
                    <img className={styles.tool} src={drawingIcon} alt="drawingIcon"/>
                </Link>
                <span className={styles.tooltipText}>Draw</span>
            </div>
            <div className={styles.tooltip}>
                <Link to="pickfromDesktop" onClick={openPickFromDesktop}>
                    <img className={styles.tool} src={uploadIcon} alt="uploadIcon"/>
                </Link>
                <span className={styles.tooltipText}>Pick from files</span>
            </div>
            <div className={styles.tooltip}>
                <Link to="pickfromURL" onClick={openPickFromURL}>
                    <img className={styles.tool} src={urlIcon} alt="urlIcon"/>
                </Link>
                <span className={styles.tooltipText}>Pick from URL</span>
            </div>
            <div className={styles.tooltip}>
                <Link to="random" onClick={openRandomIMG}>
                    <img className={styles.tool} src={randomIcon} alt="randomIcon"/>
                </Link>
                <span className={styles.tooltipText}>Pick randomly</span>
            </div>
            <div className={styles.tooltip}>
                <img className={styles.tool} src={browseIcon} alt="browseIcon"/>
                <span className={styles.tooltipText}>Browse templates</span>
                <div className={styles.dropDown}>
                    <ul>
                        <li className={styles.dropDownItem}>Hello World</li>
                        <li className={styles.dropDownItem}>Some template name</li>
                    </ul>
                </div>
            </div>
        </div>


        <div className={styles.outerContainer}>
            <div className={styles.editorContainer}>
                <div className={styles.images}>
                    <div className={styles.container}>
                        {memes.map(meme => {
                            return (<div className={styles.templates} key={meme._id}>
                                <img className={styles.meme} width='50px' height='50px'
                                     onClick={handleMeme(meme)}
                                     src={`data:image/png;base64,${encode(meme.template.data)}`}
                                     alt={`meme_${meme._id}`}/>
                            </div>)
                        })}
                    </div>
                    {currTemplate !== null ?
                        <div className={styles.singleIMG} key={currTemplate._id}>
                            <img className={styles.meme} width='400px' height='400px'
                                 src={`data:image/png;base64,${encode(currTemplate.template.data)}`}
                                 alt={`meme_${currTemplate._id}`}/>
                        </div> : <></>}
                </div>
                <Outlet/>

            </div>
        </div>
    </>);
};

export default Editor;
