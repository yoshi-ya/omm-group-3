import React, {useRef, useEffect, useState} from 'react';
import axios from 'axios';
import styles from '../Editor/Editor.module.css';

const PickFromCamera = () =>{

    const videoRef = useRef(null);
    const photoRef = useRef(null);

    const [hasPhoto, setHasPhoto] = useState(false);

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
        const width= 550;
        const height = 400;

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

  

    return(
        <div>
            <div className={styles.camera}>
                <video ref={videoRef}></video>
                <button onClick={takePhoto} className={styles.snapButton}>Snap</button>
            </div>
            <div className={styles.result + (hasPhoto ? styles.hasPhoto : '')}>
                <canvas ref={photoRef}></canvas>
                <button onClick={usePhoto} className={styles.useButton}>Use</button>
            </div>
        </div>
        )
}
export default PickFromCamera;