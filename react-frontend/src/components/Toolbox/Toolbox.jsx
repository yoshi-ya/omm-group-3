import React, {useEffect, useState} from 'react';
import styles from "./Toolbox.module.css";
import drawingIcon from "./drawing.png";
import uploadIcon from "./upload.png";
import urlIcon from "./url.png";
import randomIcon from "./random.png";
import browseIcon from "./browse.png";
import addIcon from "./add.png"
import deleteIcon from "./delete.png"
import downloadIcon from "./download.png"
import saveIcon from "./save.png"
import axios from "axios";


const Toolbox = (props) => {

    const [collapsed, setCollapsed] = useState(true);
    const [templates, setTemplates] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:5001/allTemplates?private=false")
            .then(data => {
                setTemplates(data.data)
            })
            .catch(error => console.log(error))
    }, []);


    return (<div className={styles.editorTools}>
        <div className={styles.tooltip}>
            <div onClick={() => props.setMode({
                draw: !props.mode.draw,
                desktop: !props.mode.desktop,
                url: false
            })}>
                <img className={props.mode.draw ? styles.toolActive : styles.tool} src={drawingIcon} alt="drawingIcon"/>
            </div>
            <span className={styles.tooltipText}>Draw</span>
        </div>
        <div className={props.mode.draw ? styles.hidden : styles.tooltip}>
            <div onClick={() => props.setMode({
                draw: false,
                desktop: true,
                url: false
            })}>
                <img className={styles.tool} src={uploadIcon} alt="uploadIcon"/>
            </div>
            <span className={styles.tooltipText}>Pick from files</span>
        </div>
        <div className={props.mode.draw ? styles.hidden : styles.tooltip}>
            <div onClick={() => props.setMode({
                draw: false,
                desktop: false,
                url: true
            })}>
                <img className={styles.tool} src={urlIcon} alt="urlIcon"/>
            </div>
            <span className={styles.tooltipText}>Pick from URL</span>
        </div>
        <div className={props.mode.draw ? styles.hidden : styles.tooltip}>
            <div onClick={() => {
                props.setMode({
                    draw: false,
                    desktop: true,
                    url: false
                })
                props.randomTemplate()
            }}>
                <img className={styles.tool} src={randomIcon} alt="randomIcon"/>
            </div>
            <span className={styles.tooltipText}>Pick randomly</span>
        </div>
        <div className={props.mode.draw ? styles.hidden : styles.tooltip}>
            <img className={styles.tool} src={browseIcon} alt="browseIcon"
                 onClick={() => setCollapsed(!collapsed)}/>
            <span className={styles.tooltipText}>Browse templates</span>
            <div className={styles.dropDown}>
                <ul className={collapsed ? styles.collapsed : styles.expanded}>
                    {templates.map(template => (
                        <li key={template._id} onClick={e => {
                            props.getTemplate(e.target.innerHTML)
                            props.setMode({
                                draw: false,
                                desktop: true,
                                url: false
                            })
                            setCollapsed(true)
                        }}
                            className={styles.dropDownItem}>{template.name}</li>))}
                </ul>
            </div>
        </div>
        <div className={props.mode.draw ? styles.hidden : styles.tooltip}>
            <div onClick={props.addCaption}>
                <img className={styles.tool} src={addIcon} alt="addIcon"/>
            </div>
            <span className={styles.tooltipText}>Add caption</span>
        </div>
        <div className={props.mode.draw ? styles.hidden : styles.tooltip}>
            <div onClick={props.removeCaption}>
                <img className={styles.tool} src={deleteIcon} alt="deleteIcon"/>
            </div>
            <span className={styles.tooltipText}>Remove caption</span>
        </div>
        <div className={styles.tooltip}>
            <div onClick={props.save}>
                <img className={styles.tool} src={saveIcon} alt="saveIcon"/>
            </div>
            <span className={styles.tooltipText}>Save</span>
        </div>
        <div className={styles.tooltip}>
            <div onClick={props.download}>
                <img className={styles.tool} src={downloadIcon} alt="downloadIcon"/>
            </div>
            <span className={styles.tooltipText}>Download</span>
        </div>
    </div>);
};

export default Toolbox;
