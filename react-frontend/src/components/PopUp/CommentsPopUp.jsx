import React, { useEffect } from 'react';
import styles from './PopUp.module.css'
import {encode} from "base64-arraybuffer";
import CommentSection from '../CommentSection/CommentSection';

const CommentsPopUp = (props) => {

    return (props.trigger) ? (
        <div className={styles.popup}>
            <div className={styles.popupInner}>
            <button className={styles.closeButton} onClick={()=> props.setTrigger(false)}></button>
            <div className={styles.flexBoxComments}>
            <img className={styles.memepng} width='500px' height='500px' alt={`meme_${props.meme._id}`}
                     src={`data:image/png;base64,${encode(props.meme.template.data)}`}
            />
            <CommentSection id={props.meme._id}></CommentSection>
            {props.children}
            </div>
            </div>
        </div>
    ) : "";
}

export default CommentsPopUp;