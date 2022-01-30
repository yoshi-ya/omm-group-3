import React, {useEffect, useState} from 'react';
import userInfos from './userInfos.module.css';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import ShareButtons from '../ShareButtons/ShareButtons'; // For social share icons
import ImageSlider from '../ImageSlider/ImageSlider'; // For slide-show



export const UserInfos = () => {

    //const [buttonPopup, setButtonPopup] = useState(false);
    const {user} = useAuth0();
    const [userMemes, setUserMemes] = useState([]);

    /*
    useEffect(async() => {
        let data = await axios
            .get(`http://localhost:5001/allMemes?author=${user.name}`)
        setUserMemes(data.data)
    }, []);
    */

    useEffect(() => {
        axios
            .get("http://localhost:5001/allMemes")
            .then(data => setUserMemes(data.data))
    }, []);
    

    // Upload an image to set a new avatar picture 
    const chooseAvatar = () => {
        console.log("CLICKED");
    }



    return(
        
        <div className={userInfos.container}>
            <h1>{user.name}</h1>

            <div className={userInfos.card}>
                <div className={userInfos.imageArea}>
                    <div className={userInfos.avatar}></div>
                    <div className={userInfos.cameraButton} alt="Choose your avatar!" onClick={chooseAvatar}></div>
                </div>
                <h3 style={{ textAlign: "center" }} >Max Mustermann</h3>
                <a href="">Followers</a>
                <a href="">Following</a>
                <a href="">Edit Profile</a>
                <div className={userInfos.button} onClick={chooseAvatar}>Edit Profile</div>
            </div>

            
            <div className={userInfos.verticalBox}>
                <div className={userInfos.card}>
                    <div className={userInfos.firstRow}>
                        <h3>My memes</h3>
                        <ShareButtons className={userInfos.shareButtons}/>
                    </div>
                    <ImageSlider slides={userMemes}/>
                </div>

                <div className={userInfos.card}>
                    <div className={userInfos.firstRow}>
                        <h3>Liked or commented memes</h3>
                        <ShareButtons className={userInfos.shareButtons}/>
                    </div>
                    <ImageSlider slides={userMemes}/>
                    
                </div>
            </div>

        </div>

    ); 
}