import React, {useRef, useEffect, useState} from 'react';
import axios from 'axios';
import styles from '../Editor/Editor.module.css';
import {useAuth0} from "@auth0/auth0-react";
import {encode} from "base64-arraybuffer";

const EditorPickFromCamera = (props) =>{

    const videoRef = useRef(null);
    const photoRef = useRef(null);

    const [hasPhoto, setHasPhoto] = useState(false);
    const {user} = useAuth0()

    const getVideo = () =>{
        navigator.mediaDevices
            .getUserMedia({
                video: true
            })
            .then(stream =>{
                let video = videoRef.current;
                video.srcObject = stream; 
                video.play();
            })
            .catch(err =>{
                console.error(err);
            })
    }

    const takePhoto = () =>{
        const width= 450;
        const height = 300;

        let video = videoRef.current;
        let photo = photoRef.current;

        photo.width = width;
        photo.height = height;

        let context = photo.getContext('2d');
        context.drawImage(video, 0, 0, width, height);
        setHasPhoto(true);

    }

    const usePhoto = () =>{
        //use Photo as meme
    }

    useEffect(() =>{
        getVideo();
    },[videoRef]);

    const uploadTemplate = event => {
        event.preventDefault()
        let template = event.target.template.files[0]
        const templateFormData = new FormData()
        templateFormData.append("image", template)
        templateFormData.append("author", user.name)
        templateFormData.append("name", event.target.name.value)
        templateFormData.append("private", props.privateTemplate)

        axios({
            method: "post",
            url: "http://localhost:5001/addTemplate",
            data: templateFormData,
            headers: {"content-type": "multipart/form-data"}
        })
            .then(data => {
                if (props.templates.length < 3) {
                    props.setTemplates([...props.templates, {image: `data:image/png;base64,${encode(data.data.image.data)}`}])
                }
            })
            .catch(error => console.log(error))
    }

    if (!props.visible) return <></>

    return(
        <div>
            <h2>Take a photo</h2>
            <form onSubmit={e => uploadTemplate(e)}>
            <div className={styles.camera}>
                <p>Please reload if not asked for camera access</p>
                <video ref={videoRef}></video>
                <button onClick={takePhoto} className={styles.snapButton}>Snap</button>
            </div>
            <div className={styles.result + (hasPhoto ? styles.hasPhoto : '')}>
                <canvas ref={photoRef}></canvas>
                <button onClick={usePhoto} className={styles.useButton}>Use</button>
            </div>
            </form>
        </div>
        )
}
export default EditorPickFromCamera;