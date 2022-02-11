import React, {useState, useRef} from 'react';
import axios from "axios";
import {useAuth0} from '@auth0/auth0-react';
import userInfos from "./UserInfos.module.css"
import ShareButtons from '../ShareButtons/ShareButtons'; // For social share icons
import ImageSlider from '../ImageSlider/ImageSlider'; // For slide-show
import {Link} from "react-router-dom";
import {encode} from "base64-arraybuffer";
//import PopUp from '../PopUp/SharePopUp';

const UserInfos = () => {

    const {user} = useAuth0();
    const mySliderText='create';
    const otherSliderText='search for';
    const [avatar, setAvatar] = useState(null);

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

    const inputAvatar= useRef(null);

    const handleClick = () => {
        inputAvatar.current.focus();
     }

    return (
        <div className={userInfos.container}>
            <div className={userInfos.card}>
                <div className={userInfos.imageArea}>
                    <div className={userInfos.avatar}/>
                    <input  type='file' name="chooseAvatar" // style={{display: 'none'}}, <div className={userInfos.cameraButton} onClick={handleClick}></div>
                            accept="image/png, image/jpg, image/jpeg" required 
                            onChange={fileSelectedHandler} onClick={fileUploadHandler}//e => fileUploadHandler(e) ???
                            //ref={fileInput => this.fileInput = fileInput}
                            ref={inputAvatar}
                            className={userInfos.cameraButton}
                    />
                    
                </div>
                <h3 style={{textAlign: "center"}}>{user.name}</h3>
                <a href="">Followers</a>
                <a href="">Following</a>
                <a href="">Edit Profile</a>
                
                <div className={userInfos.button} >Edit Profile</div>
            </div>
            <div className={userInfos.verticalBox}>

                <div className={userInfos.card}>
                    <h3 className={userInfos.cardTitle}>My memes</h3>
                    <ImageSlider user={user.name} sliderText={mySliderText} sliderButton={'Editor'}/>
                </div>

                <div className={userInfos.card}>
                    <h3 className={userInfos.cardTitle}>Liked or commented memes</h3>
                    <ImageSlider user={user.name} sliderText={otherSliderText} sliderButton={'Gallery'}/>
                </div>
                
            </div>
        </div>
    );
}
export default UserInfos;

