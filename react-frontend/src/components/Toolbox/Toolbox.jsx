import React, {useEffect, useState} from 'react';
import styles from "./Toolbox.module.css";
import drawingIcon from "./drawing.png";
import uploadIcon from "./upload.png";
import urlIcon from "./url.png";
import randomIcon from "./random.png";
import browseIcon from "./browse.png";
import axios from "axios";


const Toolbox = (props) => {

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
            <div onClick={() => props.setMode({draw: true, desktop: false, url: false, random: false, browse: false})}>
                <img className={styles.tool} src={drawingIcon} alt="drawingIcon"/>
            </div>
            <span className={styles.tooltipText}>Draw</span>
        </div>
        <div className={styles.tooltip}>
            <div onClick={() => props.setMode({draw: false, desktop: true, url: false, random: false, browse: false})}>
                <img className={styles.tool} src={uploadIcon} alt="uploadIcon"/>
            </div>
            <span className={styles.tooltipText}>Pick from files</span>
        </div>
        <div className={styles.tooltip}>
            <div onClick={() => props.setMode({draw: false, desktop: false, url: true, random: false, browse: false})}>
                <img className={styles.tool} src={urlIcon} alt="urlIcon"/>
            </div>
            <span className={styles.tooltipText}>Pick from URL</span>
        </div>
        <div className={styles.tooltip}>
            <div onClick={props.randomTemplate}>
                <img className={styles.tool} src={randomIcon} alt="randomIcon"/>
            </div>
            <span className={styles.tooltipText}>Pick randomly</span>
        </div>
        <div className={styles.tooltip}>
            <img className={styles.tool} src={browseIcon} alt="browseIcon" onClick={() => setCollapsed(!collapsed)}/>
            <span className={styles.tooltipText}>Browse templates</span>
            <div className={styles.dropDown}>
                <ul className={collapsed ? styles.collapsed : styles.expanded}>
                    {
                        templates.map(template => (
                            <li key={template._id} onClick={() => props.setMode({draw: false, desktop: false, url: false, random: false, browse: true})} className={styles.dropDownItem}>{template.name}</li>
                        ))
                    }
                </ul>
            </div>
        </div>
    </div>);
};

export default Toolbox;
