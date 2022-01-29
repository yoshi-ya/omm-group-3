import React, {useEffect, useState} from 'react';
import axios from 'axios';
import styles from '../Meme/styles.module.css';

const PickFromDesktop = () =>{
    const [imagePicked, setImagePicked] = useState();
    const [texts, setTexts] = useState(['','']);


    const handleImagePicked = (event) =>{
        setImagePicked(event.target.files[0]);
    }

    const updateTexts = (e, index) =>{
        const text = e.target.value || '';
        setTexts(
            texts.map((c, i) =>{
                if(index === i){
                    return text
                }else{
                    return c;
                }
            })
        )
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
            {
                texts.map((c, index) => (
                    <input onChange={(e) => updateTexts(e,index)} key={index}/>
                ))
            }
            <form onSubmit={handleImageUpload}>
                <input type="file" name="photo" onChange={handleImagePicked}/>
                <button type="submit" className={styles.use} >Upload</button>
            </form>
            
        </div>
        )
}
export default PickFromDesktop;