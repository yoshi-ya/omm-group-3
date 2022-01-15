import React, {useEffect, useState} from 'react';
import axios from 'axios';
import styles from '../Meme/styles.module.css';

const PickFromDesktop = () =>{
    const [imagePicked, setImagePicked] = useState();

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

    return(
        <div>
            <form onSubmit={handleImageUpload}>
                <input type="file" name="photo" onChange={handleImagePicked}/>
                <button type="submit" className={styles.use} >Upload</button>
            </form>
        </div>
        )
}
export default PickFromDesktop;