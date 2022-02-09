import React, {useEffect, useState} from 'react';
import styles from './PopUpComments.module.css'
import axios from "axios";
import {useAuth0} from "@auth0/auth0-react";
import CanvasMeme from "../CanvasMeme/CanvasMeme";


const PopUpComments = (props) => {

    const [comments, setComments] = useState([])
    const { user } = useAuth0()

    useEffect(() => {
        fetchComments()
            .then(data => {
                setComments(data.data)
            })
            .catch(error => console.log(error))
    }, [props.visible])

    const fetchComments = async () => {
        return await axios.get(`http://localhost:5001/allComments?meme=${props.meme._id}`)
    }

    const addComment = event => {
        event.preventDefault()
        let commentData = {
            content: event.target.comment.value,
            author: user.name,
            meme: props.meme._id
        }
        event.target.comment.value = ""
        axios
            .post("http://localhost:5001/addComment", commentData)
            .then(() => fetchComments())
            .then(data => setComments(data.data))
            .catch(error => console.log(error))
    }

    if (!props.visible) return <></>

    return (<div className={styles.popup}>
        <div className={styles.popupInner}>
            <div className={styles.closeButton} onClick={() => props.setVisible(false)}/>
            <div className={styles.flexBoxComments}>
                <div className={styles.meme}>
                    <CanvasMeme meme={props.meme}/>
                </div>
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