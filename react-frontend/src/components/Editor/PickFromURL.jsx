import React, {useEffect, useState} from 'react';
import styles from '../Meme/styles.module.css';
import axios from 'axios';

const PickFromURL = () =>{
    const [imageURL, setImageURL] = useState("");
    const [texts, setTexts] = useState(['','']);

    const updateURL = (e) =>{ 
        setImageURL(e.target.value);
    }

    /**
     * sends the canvas meme to the backend
     * @param {event} param0 
     */
     const handleNewMeme = () =>{
        // event.preventDefault();
        const memeURL = localStorage.getItem('MemeURL');
         const meme = {
             template: imageURL,
             texts: texts
         }
         axios.post('http://localhost:5001/newMeme',meme).then(res=>{ //send POST-request to /newMeme
             console.log(res.data)
     })}

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

    return(
        <div>
            <input type="url" onChange={(e) => updateURL(e)} placeholder="https://i.insider.com/5485631e69bedda63303ed51"/>
            {
                texts.map((c, index) => (
                    <input onChange={(e) => updateTexts(e,index)} key={index}/>
                ))
            }
            <button className={styles.generate} onClick={handleNewMeme}>Pick IMG</button>
 
            <div><img src={imageURL} /></div>
            </div>   
        )
}
export default PickFromURL;