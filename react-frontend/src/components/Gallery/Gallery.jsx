import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {encode} from "base64-arraybuffer";
import styles from './Gallery.module.css';
import like from './like.png'
import comment from './comment.png'
import share from './share.png'
import SingleView from '../GallerySingleView/GallerySingleView'
import {useRef} from 'react';


const Gallery = () => {
    const [singleViewActive, setSingleViewActive] = useState(false)
    const [allMemes, setAllMemes] = useState([]);
    const memeNumber = useRef(0);

    const content = () => {
        return !singleViewActive ? <Overview/> :
            <SingleView memesList={allMemes} memeNumber={memeNumber.current} active={setSingleViewActive}/>
    }

    useEffect(() => {
        axios
            .get('http://localhost:5001/allMemes')
            .then(res => {
                if (res.data) {
                    setAllMemes(res.data)
                }
            }).catch((error) => {
            error.toString();
        })
    }, [])

    const toggleView = () => {
        setSingleViewActive(!singleViewActive)
    }

    const Overview = () => {

        const memesArray = allMemes.map((meme, i) => (<div className={styles.item} key={i}>
            <img width='250px' height='250px' alt={`meme_${i}`}
                 src={`data:image/png;base64,${encode(meme.template.data)}`} onClick={() => {
                memeNumber.current = i;
                toggleView()
            }}/>
            <div className={styles.iconBox}>
                <div className={styles.iconBox}>{meme.votes}
                    <img src={like} alt={`like_${i}`} className={styles.icons} onClick={() => {
                        handleLikeClick()
                    }}/>
                </div>
                <div className={styles.iconBox}>
                    <img src={comment} alt={`like_${i}`} className={styles.icons}/>
                </div>
                <div className={styles.iconBox}>
                    <img src={share} alt={`like_${i}`} className={styles.icons}/>
                </div>
            </div>
        </div>));

        function handleLikeClick() {
            console.log('LIKED')
        }

        return (<div>
            <h2>Overview</h2>
            <button className={styles.button} onClick={() => {
                toggleView()
            }}>Switch Views
            </button>
            <div className={styles.container}>{memesArray}</div>
        </div>);
    }

    return (<div>{content()}</div>);
};

export default Gallery;
