import React, {useState, useEffect, useRef} from 'react';
import axios from "axios";
import {useAuth0} from '@auth0/auth0-react';
import userInfos from "./UserInfos.module.css"
import ImageSlider from '../ImageSlider/ImageSlider'; // For slide-show
import {encode} from "base64-arraybuffer";
import Editor from "../Editor/Editor";
import {Link} from "react-router-dom";
//import PopUp from '../PopUp/SharePopUp';

const UserInfos = () => {

    const {user} = useAuth0();
    const [avatar, setAvatar] = useState(null);
    const [myMemes, setMyMemes] = useState([]);
    const [otherMemes, setOtherMemes] = useState([]);
    const [allMemes, setAllMemes] = useState([]);
    const inputAvatar= useRef(null);  

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

    // Upload an image to set a new avatar picture 
    const fileUploadHandler = event => {
        event.preventDefault();
        let newAvatar = event.target.template.files[0]
        const avatarFormData = new FormData();
        avatarFormData.append("image", newAvatar)

        axios.post('', avatarFormData)
            .then(res => {
                console.log(res);
                setAvatar([avatar, {image: `data:image/png;base64,${encode(res.data.image.data)}`}])
            })
            .catch(error => console.log(error))
    }

    /*function showPopup() {
        return <PopUp/>;
        <div className={userInfos.button} onClick={showPopup}>Followers</div>
    }*/

    // Select an image from the desktop
    const fileSelectedHandler = (event) => {
        console.log(event.target.files[0]);
        //setAvatar(event.target.files[0]);
    }

    const handleClick = () => {
        inputAvatar.current.focus();
     }

    return (
        <div className={userInfos.container}>
            <div className={userInfos.card}>
                <div className={userInfos.imageArea}>
                    <div className={userInfos.avatar}/>
                    <div className={userInfos.avatarButton}>
                        <input type='file' name="chooseAvatar" // <div className={userInfos.cameraButton} onClick={handleClick}></div>
                            accept="image/png, image/jpg, image/jpeg" required 
                            onChange={fileSelectedHandler} onClick={fileUploadHandler}//e => fileUploadHandler(e) ???
                            //ref={fileInput => this.fileInput = fileInput}
                            ref={inputAvatar}
                            className={userInfos.cameraButton}
                        />
                    </div>
                </div>
                    
                <h3 style={{textAlign: "center"}}>User:</h3>
                <p className={{textAlign: "center"}}> {user.name} </p>

            </div>

            <div className={userInfos.verticalBox}>

                <div className={userInfos.card}>
                    <h3 className={userInfos.cardTitle}>My created memes</h3>
                    <ImageSlider memes={myMemes} sliderText={"Let's create a meme!"} sliderButton={'Editor'} deleteMeme={deleteMeme} author={true} />
                </div>
                
                <div className={userInfos.card}>
                    <h3 className={userInfos.cardTitle}>Memes I liked or commented</h3>
                    <ImageSlider memes={otherMemes} sliderText={"Let's search for some funny memes!"} sliderButton={'Gallery'} author={false}/>
                </div>
                
            </div>
        </div>
    );
}

export default UserInfos;

