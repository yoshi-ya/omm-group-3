import styles from "../Gallery/Gallery.module.css";
import {encode} from "base64-arraybuffer";
import React, { useState } from "react";
import {useAuth0} from "@auth0/auth0-react";
import comment from "./comment.png"
import share from "./share.png"
import heart from "./heart.png"
import heartRed from "./heartRed.png"
import axios from "axios";
import CommentsPopUp from "../PopUp/CommentsPopUp";
import SharePopUp from "../PopUp/SharePopUp";


const Overview = (props) => {

    const {user, isAuthenticated} = useAuth0()
    const [commentPopUp, setCommentPopUp] = useState(false)
    const [sharePopUp, setSharePopUp] = useState(false)
    const [allComments, setAllComments] = useState([])

    const fetchData = async () => {
        return await axios.get('http://localhost:5001/allMemes')
    }

    const handleLikeClick = async e => {
        let meme = props.memesList.filter(m => m._id === e.target.dataset.meme)
        let updatedListOfVotes = []
        if (meme.length > 0) {
            if (meme[0].votes.includes(user.email)) {
                let indexOfUser = meme[0].votes.indexOf(user.email)
                updatedListOfVotes = [...meme[0].votes]
                updatedListOfVotes.splice(indexOfUser, 1)
            }
            else {
                updatedListOfVotes.push(user.email)
            }
            await axios
                .post("http://localhost:5001/addLike", {id: meme, votes: updatedListOfVotes})
                .then(fetchData)
                .then(data => props.setMemes(data.data))
                .catch(err => console.log(err))
        }
    }

    const handleCommentClick = (async () => {
        const comments = await axios
                    .get("http://localhost:5001/allComments")
                    .then((res) => 
                        {if(res.data) {
                            console.log("result", res.data)
                            return res.data
                        }}
                    )
                    .catch(err => console.log(err))
        setAllComments(comments)
        console.log("all comments",comments)
        console.log("all comments",allComments)
        setCommentPopUp(true)
    });

    if (isAuthenticated) {
        return (<div className={styles.container}>

            {props.memesList.map((meme, i) => <div className={styles.item} key={i}>
                <img width='250px' height='250px' alt={`meme_${i}`}
                     src={`data:image/png;base64,${encode(meme.template.data)}`}
                     onClick={() => {
                         props.memeNumber.current = i;
                         props.active(true)
                     }}
                />
                <div className={styles.createdByBox}>Created by: {meme.author}</div>
                <div className={styles.iconBox}>
                    <div className={styles.iconBox}>
                        <span>{meme.votes.length}</span>
                        <img src={meme.votes.includes(user.email) ? heartRed : heart}
                             alt={`like_${i}`} className={styles.icons} data-meme={meme._id}
                            onClick={handleLikeClick}
                        />
                    </div>
                    <div className={styles.iconBox}>
                        <img src={comment} alt={`comment_${i}`} className={styles.icons} onClick={handleCommentClick}/>
                    </div>
                    <div className={styles.iconBox}>
                        <img src={share} alt={`share_${i}`} className={styles.icons} onClick={()=> setSharePopUp(true)}/>
                    </div>
                </div>
                <CommentsPopUp trigger={commentPopUp} setTrigger={setCommentPopUp} meme={meme} comments={allComments}>
                </CommentsPopUp>
                <SharePopUp trigger={sharePopUp} setTrigger={setSharePopUp} meme={meme}>
                </SharePopUp>
            </div>)}
        </div>)
    }

    return (<div className={styles.container}>
        {props.memesList.map((meme, i) => <div className={styles.item} key={i}>
            <img width='250px' height='250px' alt={`meme_${i}`}
                 src={`data:image/png;base64,${encode(meme.template.data)}`}
                 onClick={() => {
                     props.memeNumber.current = i;
                     props.active(true)
                 }}
            />
        </div>)}
    </div>)
};

export default Overview;

