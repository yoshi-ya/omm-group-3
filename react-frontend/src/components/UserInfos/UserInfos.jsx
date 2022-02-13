import React, {useState, useEffect} from 'react';
import axios from "axios";
import {useAuth0} from '@auth0/auth0-react';
import userInfos from "./UserInfos.module.css"
import ImageSlider from '../ImageSlider/ImageSlider'; // For slide-show


const UserInfos = () => {

    const {user} = useAuth0();
    const [avatar, setAvatar] = useState(null);
    const [myMemes, setMyMemes] = useState([]);
    const [otherMemes, setOtherMemes] = useState([]);
    const [allMemes, setAllMemes] = useState([]);

    // Set the initial state of the profile picture 
    useEffect(() => {
        setAvatar(user.picture);
    }, [])

    // Handle state changes of memes that the logged in user has created
    useEffect(() => {
        fetchMyMemes()
            .then(myMemes => {
                //console.log('Fetched data (my memes): ', myMemes)
                setMyMemes(myMemes.data)
            })
    }, [])

    // Handle state changes of all memes in database
    useEffect(() => {
        fetchAllMemes()
            .then(allMemes => {
                //console.log('Fetched data (all Memes): ', allMemes)
                setAllMemes(allMemes.data)
            })
    }, [])

    // Handle state changes of memes that the logged in user has liked
    useEffect(() => {
        getVotedMemes()
            .then(result => {
                //console.log('Result: ', result)
                setOtherMemes(result)
            })
    }, [allMemes])


    // Get all memes from server that are created by the logged in user
    const fetchMyMemes = async () => {
        return await axios.get(`http://localhost:5001/allMemes?author=${user.name}`)
    }

    // Get all memes from server 
    const fetchAllMemes = async () => {
        return await axios.get('http://localhost:5001/allMemes')
    }

    // Search for memes that the logged in user has voted for
    const getVotedMemes = async () => {
        let votedMemes = [];
        let listOfAllMemes = [...allMemes]
        //console.log('listOfAllMemes: ', listOfAllMemes)

        // Loop through the votes of all memes
        for (let i = 0; i < allMemes.length - 1; i++) {
            let listOfVotes = [...allMemes[i].votes]
            //console.log('listOfVotes :', listOfVotes)

            // Compare the names of the votes with the logged in user
            if (listOfVotes.includes(user.email) || listOfVotes.includes(user.name)) {
                votedMemes.push(listOfAllMemes[i])
            }
        }
        //console.log('votedMemes: ', votedMemesLocal)
        return votedMemes
    }

    // Delete selected meme
    function deleteMeme(memeID) {
        axios
            .delete("http://localhost:5001/deleteMeme", {data: {meme: memeID}})
            .then(() => setMyMemes(myMemes.filter((meme) => meme._id !== memeID)))
            .catch(err => console.log(err))
    }


    return (<div className={userInfos.container}>
        <div className={userInfos.card}>
            <div className={userInfos.imageArea}>
                <img src={avatar} alt="profile-pic" className={userInfos.profilePicture}/>
            </div>
            <div className={userInfos.welcome}>
                <span style={{textAlign: "center"}}>Welcome back</span>
                <h2 style={{textAlign: "center"}}> {user.name} </h2>
            </div>
        </div>
        <div className={userInfos.verticalBox}>
            <div className={userInfos.card}>
                <h3 className={userInfos.cardTitle}>My created memes</h3>
                <ImageSlider memes={myMemes} sliderText={"Let's create a meme!"}
                             sliderButton={'Editor'} deleteMeme={deleteMeme} author={true}/>
            </div>
            <div className={userInfos.card}>
                <h3 className={userInfos.cardTitle}>Memes I liked :) </h3>
                <ImageSlider memes={otherMemes} sliderText={"Let's search for some funny memes!"}
                             sliderButton={'Gallery'} author={false}/>
            </div>
        </div>
    </div>);
}

export default UserInfos;

