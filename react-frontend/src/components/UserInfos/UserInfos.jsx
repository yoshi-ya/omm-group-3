import React, {useState, useEffect, useRef} from 'react';
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

    //---------------------------

    const [myMemes, setMyMemes] = useState([])
    const [otherMemes, setOtherMemes] = useState([])

    // Get all memes from server that are create by logged in user
    const fetchMyMemes = async () => {
        return await axios.get(`http://localhost:5001/allMemes?author=${user.name}`)
    }

    // Get all memes from server that are liked or commented by logged in user
    const fetchOtherMemes = async () => {
        return await axios.get(`http://localhost:5001/allMemes?votes=${user.name}`)
    }

    // Handle state changes of myMemes and otherMemes
    useEffect(() => {

        fetchMyMemes()
        .then(myMemes => {
            console.log('Fetched data (my memes): ', myMemes)
            setMyMemes(myMemes.data) })

        fetchOtherMemes()
        .then(otherMemes => {
            console.log('Fetched data (other Memes): ', otherMemes)
            setOtherMemes(otherMemes.data) })

        .catch(error => console.log(error))

        console.log('MyMemes: ', myMemes)
        console.log('OtherMemes: ', otherMemes)
        console.log('Username: ', user.name)

    }, [])

    /*
    useEffect(() => {
        const getMemes = async () => {
            const memesFromServer = await fetchMyMemes()
            setMemes(memesFromServer)
        }
        getMemes()
    }, [])

    // Fetch data
    const fetchMyMemes = async () => {
        const data = await axios.get(`http://localhost:5001/allMemes?author=${user.name}`) 

        console.log('Data: ', data)
        console.log('Memes: ', memes)
        console.log('User: ', user)

        return data;
    }*/

    // Delete selected meme
    function deleteMeme(memeID) {
        if (myMemes.length > 0) {
            axios 
                .delete("http://localhost:5001/deleteMeme", {data: {meme: memeID}})
                .then(data => setMyMemes(data.data))
                .catch(err => console.log(err))
        }
    }

    // Delete selected meme
    function deleteMeme2(memeID) {
        axios 
            .delete("http://localhost:5001/deleteMeme", {data: {meme: memeID}})
            .then(data => setMyMemes(myMemes.filter( (meme) => meme._id !== memeID) ))
            .catch(err => console.log(err))
    }

    const filterAllMemes = (id) => {
        setOtherMemes(myMemes.filter((meme) => meme._id !== id))
    }

    //---------------------------

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
                    <h3 className={userInfos.cardTitle}>My created memes</h3>
                    {/* <ImageSlider user={user.name} sliderText={mySliderText} sliderButton={'Editor'} /> */}
                    <ImageSlider memes={myMemes} sliderText={mySliderText} sliderButton={'Editor'} deleteMeme={deleteMeme}/>
                </div>

                <div className={userInfos.card}>
                    <h3 className={userInfos.cardTitle}>Memes I liked or commented</h3>
                    {/* <ImageSlider user={user.name} sliderText={otherSliderText} sliderButton={'Gallery'}/> */}
                    <ImageSlider memes={otherMemes} sliderText={otherSliderText} sliderButton={'Gallery'} deleteMeme={deleteMeme2}/>
                </div>
                
            </div>
        </div>
    );
}
export default UserInfos;

