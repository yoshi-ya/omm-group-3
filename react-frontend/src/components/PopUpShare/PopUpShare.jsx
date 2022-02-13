import React, {useState} from 'react';
import styles from './PopUpShare.module.css'
import ShareButtons from '../ShareButtons/ShareButtons';


const PopUpShare = (props) => {

    // URL of the Meme-SingleView
    const url = `http://localhost:3000/view/${props.meme._id}`
    const [copyText, setCopyText] = useState("Copy link")

    // Copies URL of Meme
    function copyLink() {
        navigator.clipboard.writeText(url).then(() => {
            setCopyText("Copied")
            setTimeout(() => {
                setCopyText("Copy Link")
            }, 1000);
        })
    }

    if (!props.visible) return <></>

    return (<div className={styles.popup}>
            <div className={styles.popupInner}>
                <div className={styles.closeButton} onClick={() => props.setVisible(false)}/>
                <span>{copyText}</span>
                <div className={styles.flexBoxShare}>
                    <button className={styles.shareLink} onClick={() => {
                        copyLink()
                    }}>{url}</button>
                </div>
                <span>Or share directly</span>
                <ShareButtons/>
            </div>
        </div>);
}

export default PopUpShare;