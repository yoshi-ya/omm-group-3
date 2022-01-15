import React, {useEffect, useState} from 'react';
import styles from '../Meme/styles.module.css';

const PickFromURL = () =>{
    const [imageURL, setImageURL] = useState("");

    const updateURL = (e) =>{ 
        setImageURL(e.target.value);
    }

    return(
        <div>
            <input type="url" onChange={(e) => updateURL(e)} placeholder="https://i.insider.com/5485631e69bedda63303ed51"/>
            <img src={imageURL} />
        </div>
        )
}
export default PickFromURL;