import React from 'react'
import {useAuth0} from '@auth0/auth0-react';
import userInfos from "./UserInfos.module.css"
import ShareButtons from '../ShareButtons/ShareButtons'; // For social share icons
import ImageSlider from '../ImageSlider/ImageSlider'; // For slide-show
import {Link} from "react-router-dom";
//import PopUp from '../PopUp/SharePopUp';

const UserInfos = () => {

    const {user} = useAuth0();
    const mySliderText='create';
    const otherSliderText='search for'; 

    // Upload an image to set a new avatar picture 
    const chooseAvatar = () => {
        console.log("CLICKED");
    }

    /*function showPopup() {
        return <PopUp/>;
        <div className={userInfos.button} onClick={showPopup}>Followers</div>
    }*/

    return (
        <div className={userInfos.container}>
            <div className={userInfos.card}>
                <div className={userInfos.imageArea}>
                    <div className={userInfos.avatar}/>
                    <div className={userInfos.cameraButton} onClick={chooseAvatar}/>
                </div>
                <h3 style={{textAlign: "center"}}>{user.name}</h3>
                <a href="">Followers</a>
                <a href="">Following</a>
                <a href="">Edit Profile</a>
                
                <div className={userInfos.button} onClick={chooseAvatar}>Edit Profile</div>
            </div>
            <div className={userInfos.verticalBox}>
                <div className={userInfos.card}>
                    <div className={userInfos.firstRow}>
                        <h3>My memes</h3>
                    </div>
                    <ImageSlider user={user.name} sliderText={mySliderText} sliderButton={'Editor'}/>
                </div>

                <div className={userInfos.card}>
                    <div className={userInfos.firstRow}>
                        <h3>Liked or commented memes</h3>
                    </div>
                    <ImageSlider user={user.name} sliderText={otherSliderText} sliderButton={'Gallery'}/>
                </div>
            </div>
        </div>
    );
}
export default UserInfos;

