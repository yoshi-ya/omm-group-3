import React, { useEffect } from 'react';
import styles from './PopUp.module.css'
import {encode} from "base64-arraybuffer";

const CommentsPopUp = (props) => {

    return (props.trigger) ? (
        <div className={styles.popup}>
            <div className={styles.popupInner}>
                <button className={styles.closeButton} onClick={()=> props.setTrigger(false)}></button>
            Comments
            <img width='250px' height='250px' alt={`meme_${props.meme._id}`}
                     src={`data:image/png;base64,${encode(props.meme.template.data)}`}
            />
            {props.children}
            </div>
        </div>
    ) : "";
}

export default CommentsPopUp;