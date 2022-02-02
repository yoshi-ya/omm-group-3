import React, {useEffect, useState} from 'react';
import styles from './PopUp.module.css'
import {encode} from "base64-arraybuffer";
import axios from "axios";


const CommentsPopUp = (props) => {

    const [comments, setComments] = useState([])

    useEffect(() => {
        console.log(props.meme)
        fetchComments()
            .then(data => {
                setComments(data.data)
            })
            .catch(error => console.log(error))
    }, [])

    const fetchComments = async () => {
        return await axios.get(`http://localhost:5001/allComments?meme=${props.meme._id}`)
    }

    if (!props.visible) return <></>

    return (<div className={styles.popup}>
        <div className={styles.popupInner}>
            <button className={styles.closeButton} onClick={() => props.setVisible(false)}/>
            <div className={styles.flexBoxComments}>
                <img className={styles.meme} width='500px' height='500px'
                     alt={`meme_${props.meme._id}`}
                     src={`data:image/png;base64,${encode(props.meme.template.data)}`}
                />
                <ul>
                    {comments.map((comment, i) => (<li key={i}>{comment.author ? comment.author : "Anonym"} : {comment.content}</li>))}
                </ul>
            </div>
        </div>
    </div>)
}
export default CommentsPopUp;