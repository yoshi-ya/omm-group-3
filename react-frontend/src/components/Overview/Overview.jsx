import styles from "./Overview.module.css";
import {encode} from "base64-arraybuffer";
import React, {useState} from "react";
import {useAuth0} from "@auth0/auth0-react";
import comment from "./comment.png"
import share from "./share.png"
import heart from "./heart.png"
import heartRed from "./heartRed.png"
import axios from "axios";
import PopUpComments from "../PopUpComments/PopUpComments";
import PopUpShare from "../PopUpShare/PopUpShare";


const Overview = (props) => {

    const {user, isAuthenticated} = useAuth0()
    const [commentPopUp, setCommentPopUp] = useState(false)
    const [sharePopUp, setSharePopUp] = useState(false)
    const [currentMeme, setCurrentMeme] = useState({});

    const fetchData = async () => {
        return await axios.get('http://localhost:5001/allMemes')
    }

    const handleLikeClick = async e => {
        let meme = props.memesList.filter(m => m._id === e.target.dataset.meme)
        if (meme.length > 0) {
            let listOfVotes = [...meme[0].votes]
            // user wants to undo like
            let email = String(user.email)
            if (listOfVotes.includes(email)) {
                let indexOfUser = listOfVotes.indexOf(email)
                listOfVotes.splice(indexOfUser, 1)
            }
            // user wants to like
            else {
                listOfVotes.push(email)
            }

            axios
                .post("http://localhost:5001/addLike", {id: meme, votes: listOfVotes})
                .then(fetchData)
                .then(data => props.setMemes(data.data))
                .catch(err => console.log(err))
        }
    }

    const showComments = e => {
        let meme = props.memesList.filter(m => m._id === e.target.dataset.meme)
        if (meme.length > 0) setCurrentMeme(meme[0])
        setCommentPopUp(true)
    }

    const showShareOptions = e => {
        let meme = props.memesList.filter(m => m._id === e.target.dataset.meme)
        if (meme.length > 0) setCurrentMeme(meme[0])
        setSharePopUp(true)
    }

    if (isAuthenticated) {
        return <div className={styles.container}>

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
                        <img src={comment} data-meme={meme._id} alt={`comment_${i}`}
                             className={styles.icons} onClick={showComments}/>
                    </div>
                    <div className={styles.iconBox}>
                        <img src={share} data-meme={meme._id} alt={`share_${i}`}
                             className={styles.icons} onClick={showShareOptions}/>
                    </div>
                </div>
            </div>)}
            <PopUpComments visible={commentPopUp} setVisible={setCommentPopUp} meme={currentMeme}/>
            <PopUpShare visible={sharePopUp} setVisible={setSharePopUp} meme={currentMeme}/>
        </div>
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

