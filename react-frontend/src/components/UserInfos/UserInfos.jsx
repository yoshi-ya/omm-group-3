import React, {useState, useEffect} from 'react';
import axios from "axios";
import {useAuth0} from '@auth0/auth0-react';
import userInfos from "./UserInfos.module.css"
import ImageSlider from '../ImageSlider/ImageSlider'; // For slide-show
import profilePicture from './ProfilePicture.png'; // Source: <a href="https://www.flaticon.com/free-icons/user" title="user icons">User icons created by Becris - Flaticon</a>


const UserInfos = () => {

    const {user} = useAuth0();
    const [myMemes, setMyMemes] = useState([]);
    const [otherMemes, setOtherMemes] = useState([]);
    const [allMemes, setAllMemes] = useState([]);
    const [profilePic, setprofilePic] = useState(null);

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

    
    useEffect(() => {
        let img = document.getElementById(`${userInfos.profilePicture}`); // profile picture html element
        console.log('img (id: profilePicture): ', img);

        /* Check whether img html element was found -> store it in state*/
        img ? setprofilePic(img) : console.log('document.getElementById not found')
    }, []);

    function handleChange(event) {
        const file = event.target.files[0]; //console.log(file)
        if(file && profilePic) {
            profilePic.src = URL.createObjectURL(file); // set source to file url
        } else {
            console.log('Either chosen file or html img element equals null')
        }
    }

    // Get all memes from server that are createb by the logged in user
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
        for (var i = 0; i < allMemes.length-1; i++) {
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
            .then(setMyMemes(myMemes.filter( (meme) => meme._id !== memeID) ))
            .catch(err => console.log(err))
    }

    // Edit selected meme
    function editMeme(memeID) {

        // Automaticically link to the editor page (vllt dabei noch das meme als Payload mitgeben, aber wie?)
        const link = document.createElement('a')
        link.href = "/editor" 
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }

    return (
        <div className={userInfos.container}>
            <div className={userInfos.card}>

                <div className={userInfos.imageArea}>
                    <img src={profilePicture} id={userInfos.profilePicture} alt={'My profile pic'} /> 
                </div>
                    
                <h3 style={{textAlign: "center"}}>User:</h3>
                <p className={{textAlign: "center"}}> {user.name} </p>
                
                <input type='file' 
                    accept="image/png, image/jpg, image/jpeg" required
                    id={userInfos.imageInput}
                    onChange={handleChange}
                />
                <label htmlFor={userInfos.imageInput} id={userInfos.uploadBtn} >Choose a profile picture</label>
            </div>

            <div className={userInfos.verticalBox}>

                <div className={userInfos.card}>
                    <h3 className={userInfos.cardTitle}>My created memes</h3>
                    <ImageSlider memes={myMemes} sliderText={"Let's create a meme!"} sliderButton={'Editor'} deleteMeme={deleteMeme} editMeme={editMeme} author={true} />
                </div>
                
                <div className={userInfos.card}>
                    <h3 className={userInfos.cardTitle}>Memes I liked :) </h3>
                    <ImageSlider memes={otherMemes} sliderText={"Let's search for some funny memes!"} sliderButton={'Gallery'} author={false}/>
                </div>
                
            </div>
        </div>
    );
}

export default UserInfos;

