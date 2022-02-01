import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './CommentSection.module.css'
const CommentSection = (props) => {
    const [newComment, setNewComment] = useState("")
    const [sendText, setSendText] = useState("Send comment")
    const [comments, setCommments] = useState([{content: "What is this???"},{content: "Nice meme wow"},{content: "Wow nice"},{content: "Reeee"}])

    const handleSendComment = async e => {
        await axios.post('http://localhost:5001/addComment',
        {
            meme: props.id,
            content: newComment,
            date: Date.now
        })
        setNewComment("");
        setSendText("Sending...")
        const timer = setTimeout(() => {
            setSendText("Send comment")
        }, 750);

    }

    return(
        <div className={styles.commentSection}>
            Comments
        <div className={styles.allComments}>
        {comments.map((comment,i) =>
            <div key={i} className={styles.oneComment}>Author: {comment.content}</div>
        )}
        </div>
        <div className={styles.writeCommentBox}> 
        <input className={styles.commentInput}type="text" value={newComment} onChange={(e) => setNewComment(e.target.value)}></input>
        <button className={styles.sendButton} onClick={handleSendComment}>{sendText}</button>
        </div>
        </div>
    )
}

export default CommentSection;