import React, {useEffect, useState} from 'react'
import styles from './styles.module.css';
import { useNavigate } from 'react-router-dom';

export const Meme = () => {

    const [memes, setMemes] = useState([]);
    const [memeIndex, setMemeIndex] = useState(0);
    const [texts, setTexts] = useState([]);

    const navigate = useNavigate();


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

    const generateMeme = () => {
        const currMeme = memes[memeIndex];
        const formData = new FormData();
        //ogw95766@boofx.com (10min mail)
        formData.append('username','ommwise');
        formData.append('password','omm123456');
        formData.append('template_id', currMeme.id);
        texts.forEach((c,index) => formData.append(`boxes[${index}][text]`, c))

        fetch('https://api.imgflip.com/caption_image', {
            method: 'POST',
            body: formData
        }).then(res => {
            res.json().then(res =>{
                navigate(`/generated?url=${res.data.url}`);
            })
        })
    }

    const shuffleMemes = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * i);
          const temp = array[i];
          array[i] = array[j];
          array[j] = temp;
        }
      };

    useEffect(() => {
        fetch('https://api.imgflip.com/get_memes').then(res => {
            res.json().then(res => {
                console.log(res);
                const _memes = res.data.memes;
                shuffleMemes(_memes);
                setMemes(_memes);
            });
        });
    },[]);

    useEffect(() => {
        if(memes.length){
            setTexts(Array(memes[memeIndex].box_count).fill(''));
        }
    }, [memeIndex, memes])


    useEffect(() =>{
        console.log(texts);
    }, [texts])

    return(
        memes.length ? 
        <div className={styles.container}>
            <button onClick={generateMeme} className={styles.generate}>Generate</button>
            <button onClick={() => setMemeIndex(memeIndex + 1)} className={styles.skip}>Skip</button>
            {
                texts.map((c, index) => (
                    <input onChange={(e) => updateTexts(e,index)} key={index}/>
                ))
            }
        <div>
            <img alt='meme' src={memes[memeIndex].url}/>
            <h2 className="top">{texts[0]}</h2>
            <h2 className="bottom">{texts[1]}</h2>
        </div>
        </div>
        
         : <></>
    );
}