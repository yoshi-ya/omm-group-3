import React, {useEffect, useState} from 'react';
import styles from "./Toolbox.module.css";
import {Link} from "react-router-dom";
import drawingIcon from "./drawing.png";
import uploadIcon from "./upload.png";
import cameraIcon from "./camera.png";
import urlIcon from "./url.png";
import randomIcon from "./random.png";
import browseIcon from "./browse.png";
import axios from "axios";

const Toolbox = () => {

    const [collapsed, setCollapsed] = useState(true);
    const [templates, setTemplates] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:5001/allTemplates")
            .then(data => {
                setTemplates(data.data)
            })
            .catch(error => console.log(error))
    }, []);


    return (<div className={styles.editorTools}>
        <div className={styles.tooltip}>
            <Link to="drawing">
                <img className={styles.tool} src={drawingIcon} alt="drawingIcon"/>
            </Link>
            <span className={styles.tooltipText}>Draw</span>
        </div>
        <div className={styles.tooltip}>
            <Link to="pickfromDesktop">
                <img className={styles.tool} src={uploadIcon} alt="uploadIcon"/>
            </Link>
            <span className={styles.tooltipText}>Pick from files</span>
        </div>
        <div className={styles.tooltip}>
            <Link to="pickfromCamera">
                <img className={styles.tool} src={cameraIcon} alt="uploadIcon"/>
            </Link>
            <span className={styles.tooltipText}>Pick from camera</span>
        </div>
        <div className={styles.tooltip}>
            <Link to="pickfromURL">
                <img className={styles.tool} src={urlIcon} alt="urlIcon"/>
            </Link>
            <span className={styles.tooltipText}>Pick from URL</span>
        </div>
        <div className={styles.tooltip}>
            <Link to="random">
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
                        templates.map(template => (
                            <li key={template._id} className={styles.dropDownItem}>{template.name}</li>
                        ))
                    }
                </ul>
            </div>
        </div>
    </div>);
};

export default Toolbox;
