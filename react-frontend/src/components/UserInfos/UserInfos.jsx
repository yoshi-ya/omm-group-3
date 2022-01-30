import React from 'react'
import {useAuth0} from '@auth0/auth0-react';
import styles from "./UserInfos.module.css"

// For button style
import styled from 'styled-components';

// For social share icons
import ShareButtons from '../ShareButtons/ShareButtons';

// For slide-show
import ImageSlider from '../ImageSlider/ImageSlider';


const UserInfos = () => {

    const {user} = useAuth0();

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
      box-shadow: 0 2px 2px grey;
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
            default: '#343434', hover: '#232323'
        }, pink: {
            default: '#e91e63', hover: '#ad1457'
        }
    }

    // Upload an image to set a new avatar picture 
    const chooseAvatar = () => {
        console.log("CLICKED");
    }

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <div className={styles.imageArea}>
                    <div className={styles.avatar}/>
                    <div className={styles.cameraButton} onClick={chooseAvatar}/>
                </div>
                <h3 style={{textAlign: "center"}}>{user.name}</h3>
                <a href="">Followers</a>
                <a href="">Following</a>
                <a href="">Edit Profile</a>
                <Button onClick={chooseAvatar}>Edit Profile</Button>
            </div>
            <div className={styles.verticalBox}>
                <div className={styles.card}>
                    <div className={styles.firstRow}>
                        <h3>My memes</h3>
                        <ShareButtons className={styles.shareButtons}/>
                    </div>
                    <ImageSlider user={user.name}/>
                </div>

                <div className={styles.card}>
                    <div className={styles.firstRow}>
                        <h3>Liked or commented memes</h3>
                        <ShareButtons className={styles.shareButtons}/>
                    </div>
                    <ImageSlider user={user.name}/>
                </div>
            </div>
        </div>
    );
}
export default UserInfos;