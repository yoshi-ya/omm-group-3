import React, {useEffect, useState} from 'react';
import styles from "./Toolbox.module.css";
import {Link} from "react-router-dom";
import drawingIcon from "./drawing.png";
import uploadIcon from "./upload.png";
import urlIcon from "./url.png";
import randomIcon from "./random.png";
import browseIcon from "./browse.png";

const Toolbox = (props) => {

    const [collapsed, setCollapsed] = useState(true);
    const [templateNames, setTemplateNames] = useState([])

    useEffect(() => {

    }, []);


    return (<div className={styles.editorTools}>
        <div className={styles.tooltip}>
            <Link to="drawing" onClick={props.setOpenCanvas(true)}>
                <img className={styles.tool} src={drawingIcon} alt="drawingIcon"/>
            </Link>
            <span className={styles.tooltipText}>Draw</span>
        </div>
        <div className={styles.tooltip}>
            <Link to="pickfromDesktop" onClick={props.setPickFromDesktop(true)}>
                <img className={styles.tool} src={uploadIcon} alt="uploadIcon"/>
            </Link>
            <span className={styles.tooltipText}>Pick from files</span>
        </div>
        <div className={styles.tooltip}>
            <Link to="pickfromURL" onClick={props.setPickFromUrl(true)}>
                <img className={styles.tool} src={urlIcon} alt="urlIcon"/>
            </Link>
            <span className={styles.tooltipText}>Pick from URL</span>
        </div>
        <div className={styles.tooltip}>
            <Link to="random" onClick={props.setPickRandom(true)}>
                <img className={styles.tool} src={randomIcon} alt="randomIcon"/>
            </Link>
            <span className={styles.tooltipText}>Pick randomly</span>
        </div>
        <div className={styles.tooltip}>
            <img className={styles.tool} src={browseIcon} alt="browseIcon" onClick={() => setCollapsed(!collapsed)}/>
            <span className={styles.tooltipText}>Browse templates</span>
            <div className={styles.dropDown}>
                <ul className={collapsed ? styles.collapsed : styles.expanded}>
                    {
                        templateNames.map(name => (
                            <li className={styles.dropDown}>{name}</li>
                        ))
                    }
                </ul>
            </div>
        </div>
    </div>);
};

export default Toolbox;
