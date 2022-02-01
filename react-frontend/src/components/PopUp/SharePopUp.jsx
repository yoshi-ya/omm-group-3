import React, { useEffect, useState } from 'react';
import styles from './PopUp.module.css'
import {encode} from "base64-arraybuffer";
import ShareButtons from '../ShareButtons/ShareButtons';

const SharePopUp = (props) => {

    // URL of the Meme
    const url = "www.memegenerator.de/" + props.meme._id
    const [copyText, setCopyText] = useState("Copy link")

    // Copies URL of Meme
    function copyLink() {
        navigator.clipboard.writeText(url)
        setCopyText("Copied")
        const timer = setTimeout(() => {
            setCopyText("Copy Link")
        }, 750);
    }

    return (props.trigger) ? (
        <div className={styles.popup}>
            <div className={styles.popupInner}>
                <button className={styles.closeButton} onClick={()=> props.setTrigger(false)}></button>
            Share the Meme
            <div className={styles.flexBoxShare}>
            <button className={styles.shareLink} onClick={() => {copyLink()}}>{url}</button>
                <button className={styles.copyButton} onClick={() => {copyLink()}}>{copyText}</button>

                {props.children}
            </div>
            <ShareButtons></ShareButtons>
            </div>
        </div>
    ) : "";
}

export default SharePopUp;