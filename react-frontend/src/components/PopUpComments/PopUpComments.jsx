import React, {useEffect, useState} from 'react';
import styles from './PopUpComments.module.css'
import {encode} from "base64-arraybuffer";
import axios from "axios";


const PopUpComments = (props) => {

    const [comments, setComments] = useState([])

    useEffect(() => {
        fetchComments()
            .then(data => {
                setComments(data.data)
            })
            .catch(error => console.log(error))
    }, [props.meme])

    const fetchComments = async () => {
        return await axios.get(`http://localhost:5001/allComments?meme=${props.meme._id}`)
    }

    const addComment = event => {
        event.preventDefault()
        let comment = event.target.comment
        console.log(comment)
    }

    if (!props.visible) return <></>

    return (<div className={styles.popup}>
        <div className={styles.popupInner}>
            <div className={styles.closeButton} onClick={() => props.setVisible(false)}/>
            <div className={styles.flexBoxComments}>
                <img className={styles.meme}
                     alt={`meme_${props.meme._id}`}
                     src={`data:image/png;base64,${encode(props.meme.template.data)}`}
                />
                <div className={styles.comments}>
                    <ul className={styles.commentBox}>
                        {comments.map((comment, i) => (
                            <li key={i}>{comment.author ? comment.author : "Anonym"} : {comment.content}</li>))}
                    </ul>
                    <form onSubmit={addComment} className={styles.commentForm}>
                        <div className={styles.submitRow}>
                            <input type="text" name="comment" className={styles.commentInput} placeholder="write a comment"/>
                            <input type="submit" className={styles.submitArrow} value=""/>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>)
}
export default PopUpComments;