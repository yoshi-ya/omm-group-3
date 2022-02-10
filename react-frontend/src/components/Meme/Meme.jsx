import React, {useEffect, useState} from 'react'
import styles from './styles.module.css';
import {useNavigate} from 'react-router-dom';
import MovableTextBox from '../MovableTextBox/MovableTextBox';
import axios from 'axios';

export const Meme = () => {

    const [memes, setMemes] = useState([]);
    const [memeIndex, setMemeIndex] = useState(0);
    const [texts, setTexts] = useState(() => {
        const saved = localStorage.getItem('Captions');
        const iniVal = JSON.parse(saved);
        return iniVal || [];
    });
    const [template, setTemplate] = useState("");


    const moveRef = React.useRef(null);
    const [style, setStyle] = React.useState("");


    const navigate = useNavigate();

    useEffect(() => {
        localStorage.setItem('Captions', JSON.stringify(texts));
    }, [texts])

    const updateTexts = (e, index) => {
        const text = e.target.value || '';
        setTexts(texts.map((c, i) => {
            if (index === i) {
                return text
            } else {
                return c;
            }
        }))
    }

    const generateMeme = () => {
        const posText1 = document.getElementById("text1");
        const xpos = posText1.getBoundingClientRect().x;
        const ypos = posText1.getBoundingClientRect().y;
        console.log(posText1.getBoundingClientRect())
        const currMeme = memes[memeIndex];
        const formData = new FormData();
        //ogw95766@boofx.com (10min mail)
        formData.append('username', 'ommwise');
        formData.append('password', 'omm123456');
        formData.append('template_id', currMeme.id);

        texts.forEach((c, index) => {
            formData.append(`boxes[${index}][text]`, c);
        })
        formData.append(`boxes[0][x],`, currMeme.width / 3);
        formData.append(`boxes[0][y]`, 10);
        formData.append(`boxes[0][width],`, 100);
        formData.append(`boxes[0][height]`, 50);

        fetch('https://api.imgflip.com/caption_image', {
            method: 'POST', body: formData
        }).then(res => {
            res.json().then(res => {
                const url = JSON.stringify(res.data.url);
                localStorage.setItem('MemeURL', res.data.url);
                handleNewMeme();
                navigate(`/editor/generated?url=${res.data.url}`);
            })
        })
    }

    /**
     * sends the canvas meme to the backend
     * @param {event} param0
     */
    const handleNewMeme = () => {
        // event.preventDefault();
        const memeURL = localStorage.getItem('MemeURL');
        const meme = {
            template: memeURL, text1: texts[1], text2: texts[2]
        }
        axios.post('http://localhost:5001/addMeme', meme).then(res => { //send POST-request to /newMeme
            console.log(res.data)
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
    }, []);

    useEffect(() => {
        if (memes.length) {
            setTexts(Array(memes[memeIndex].box_count).fill(''));
        }
    }, [memeIndex, memes])


    useEffect(() => {
        console.log(texts);
    }, [texts])

    return (memes.length ? <div>
            <button onClick={generateMeme} className={styles.generate}>Generate</button>
            <button onClick={() => setMemeIndex(memeIndex + 1)} className={styles.skip}>Skip
            </button>
            {texts.map((c, index) => (
                <input onChange={(e) => updateTexts(e, index)} key={index}/>))}
            <div className={styles.meme}>
                <img alt={memes[memeIndex].name} src={memes[memeIndex].url}/>
                <h2
                    ref={moveRef}
                    style={{transform: style}}
                    className={styles.top}
                    id="text1"
                >{texts[0]}
                </h2>
                <MovableTextBox moveRef={moveRef} setStyle={setStyle}/>
                <h2
                    ref={moveRef}
                    style={{transform: style}}
                    className={styles.bottom}
                    id="text2"
                >{texts[1]}</h2>

            </div>
        </div> : <></>);
}