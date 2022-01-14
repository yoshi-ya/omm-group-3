import React, {useEffect, useState} from 'react'
import axios from 'axios';
import {useAuth0} from "@auth0/auth0-react";
import {Meme} from '../Meme/Meme';
import {Route, Routes, BrowserRouter as Router, Link} from "react-router-dom";
import styles from '../Meme/styles.module.css';
import {Outlet} from 'react-router-dom'
import { MemeGenerated } from '../MemeGenerated/MemeGenerated'
import DrawingCanvas from './DrawingCanvas';


const Editor = () => {
    const {isAuthenticated} = useAuth0();

    const [imagePicked, setImagePicked] = useState();
    const [imageURL, setImageURL] = useState("");
    const [showCanvas, setShowCanvas] = useState(false);

    if (!isAuthenticated) {
        return (
            <div>
                Please log in to create and upload memes.
            </div>
        )
    }

    const handleImagePicked = (event) =>{
        setImagePicked(event.target.files[0]);
    }

    const handleImageUpload = (event) =>{
        console.log(imagePicked);
        event.preventDefault();

        const formData = new FormData();
        formData.append('photo', imagePicked);
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        }

        axios.post('http://localhost:5001/user/upload', formData, config)
            .then((res) =>{
                alert('Image uploaded successfully');
        })
            .catch((err) =>{
            console.log('err',err);
        });
    }

    const updateURL = (e) =>{ 
        setImageURL(e.target.value);
    }

    const openCanvas = () =>{
        setShowCanvas(true);
    }

    return (<div>
        <div>
            <button className={styles.upload} onClick={openCanvas}>Open drawing canvas</button>
            {showCanvas ? <DrawingCanvas/> : null}
            <p>Upload template file from your desktop:</p>
            <form onSubmit={handleImageUpload}>
                <input type="file" name="photo" onChange={handleImagePicked}/>
                <button type="submit" className={styles.upload} >Upload</button>
            </form>
        </div>
        <div>
            <input type="url" onChange={(e) => updateURL(e)} placeholder="https://i.insider.com/5485631e69bedda63303ed51"/>
            <button className={styles.upload} >Use image URL as template</button>
            <img src={imageURL} />
        </div>
        <Routes>
            <Route exact path='/' element={<Meme/>}/>
        </Routes>
        <Outlet/>
        
    </div>);
};

export default Editor;
