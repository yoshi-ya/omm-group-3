import styles from './EditorPickFromCamera.module.css';
import React, {useRef, useEffect, useState} from 'react';
import axios from 'axios';
import {useAuth0} from "@auth0/auth0-react";

/**
 * Allows the User to take a picture with the webcam
 * Source: https://www.youtube.com/watch?v=4sLUfUGLEp0
 * @param {*} props 
 * @returns 
 */
const EditorPickFromCamera = (props) => {

    const videoRef = useRef(null);
    const photoRef = useRef(null);

    const [photo, setPhoto] = useState(false)
    const [name, setName] = useState("")

    const {user} = useAuth0()


    useEffect(() => {
        if (videoRef.current) getVideo()
    }, [props.visible])

    /**
     * get access to the user's camera and start playing the video
     */
    const getVideo = () => {
        navigator.mediaDevices
            .getUserMedia({
                video: true
            })
            .then(stream => {
                let video = videoRef.current;
                video.srcObject = stream;
                video.play();
            })
            .catch(err => {
                console.error(err);
            })
    }

    /**
     * take a photo of the current webcam state
     */
    const takePhoto = () => {
        const width = 450;
        const height = 300;

        let video = videoRef.current;
        let photo = photoRef.current;

        photo.width = width;
        photo.height = height;

        let context = photo.getContext('2d');
        context.drawImage(video, 0, 0, width, height);
        setPhoto(true)
    }

    /**
     * send the taken photo to the backend to use as template
     * @param {*} event 
     */
    const uploadTemplate = event => {
        event.preventDefault()
        let templateUrl = photoRef.current.toDataURL()
        let payload = {
            author: user.name,
            image: templateUrl,
            name: name,
            private: props.privateTemplate
        }

        axios
            .post("http://localhost:5001/addTemplate", payload)
            .then(() => {
                if (props.templates.length < 3) {
                    props.setTemplates([...props.templates, {url: templateUrl}])
                    props.setMode({draw: false, desktop: true, url: false, camera: false})
                }
            })
            .catch(error => console.log(error))
    }

    if (!props.visible) return <></>

    return (<div className={styles.wrapper}>
        <h2>Take a photo</h2>
        <form onSubmit={e => uploadTemplate(e)}>
            <div className={styles.preview}>
                <video ref={videoRef}/>
                <canvas ref={photoRef} className={photo ? styles.photo : styles.hidden}/>
            </div>
            <div className={styles.controlPanel}>
                <input className={styles.controlPanelItem} type="text" name="name"
                       placeholder="template name" value={name} onChange={e => setName(e.target.value)} required/>
                <label className={styles.controlPanelItem}>
                    private template
                    <input type="radio" id="private" name="privacy" value="private"
                           onClick={() => props.setPrivateTemplate(!props.privateTemplate)}
                           checked={props.privateTemplate} readOnly={true}/>
                </label>
                <input className={styles.useButton} type="submit" value="use as template"/>
            </div>
        </form>
        <button className={styles.snapButton} onClick={takePhoto}>Snap</button>
    </div>)
}
export default EditorPickFromCamera;