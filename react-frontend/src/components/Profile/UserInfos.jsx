import React, {useEffect, useState, Component} from 'react';
import userInfos from './userInfos.module.css';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';

// For button style
import styled from 'styled-components';

// For social share icons
import ShareButtons from '../ShareButtons/ShareButtons';

// For slide-show
import ImageSlider from '../ImageSlider/ImageSlider';



export const UserInfos = () => {

    //const [buttonPopup, setButtonPopup] = useState(false);
    const {user} = useAuth0();
    const [userMemes, setUserMemes] = useState([]) 


    useEffect(async() => {
        let data = await axios
            .get(`http://localhost:5001/allMemes?author=${user.name}`)
        setUserMemes(data.data)
    }, []);


    
        // CSS for the default button theme 
        const Button = styled.button`
        background-color: ${props => theme[props.theme].default};
        width: 50%;
        overflow: hidden;
        color: white;
        padding: 5px 15px;
        margin-top: 20px;
        border-radius: 5px;
        outline: 0;
        text-transform: uppercase;
        cursor: pointer;
        box-shadow: 0px 2px 2px grey;
        transition: ease background-color 250ms;
        &:hover {
            background-color: #232323;
        }
        &:disabled {
            cursor: default;
            opacity: 0.7;
        }
        `
        // Default theme object 
        Button.defaultProps = {
        theme: 'grey'
        }

        // Theme-specific color effects 
        const theme = {
        grey: {
            default: '#343434',
            hover: '#232323'
        },
        pink: {
            default: '#e91e63',
            hover: '#ad1457'
        }
        }
    

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
                <Button onClick={chooseAvatar}>Edit Profile</Button>
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