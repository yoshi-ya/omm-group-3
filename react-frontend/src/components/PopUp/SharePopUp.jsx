import React, { useEffect } from 'react';
import styles from './PopUp.module.css'
import {encode} from "base64-arraybuffer";

const SharePopUp = (props) => {

    return (props.trigger) ? (
        <div className={styles.popup}>
            <div className={styles.popupInner}>
                <button className={styles.closeButton} onClick={()=> props.setTrigger(false)}></button>
            Share
            <button onClick={() => {navigator.clipboard.writeText(this.state.textToCopy)}}>Save the URL</button>
            {props.children}
            </div>
        </div>
    ) : "";
}

export default SharePopUp;