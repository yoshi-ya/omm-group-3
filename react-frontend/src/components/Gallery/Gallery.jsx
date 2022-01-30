import React, {useEffect, useReducer, useState, useRef} from 'react';
import { MemeGenerated } from '../MemeGenerated/MemeGenerated';
import {Route, Routes, BrowserRouter as Router, Link} from "react-router-dom";
import { usePromiseTracker, trackPromise } from "react-promise-tracker";
import axios from 'axios';
import {encode} from "base64-arraybuffer";
import { Meme } from '../Meme/Meme';
import styles from './Gallery.module.css';
import like from './like.png'
import comment from './comment.png'
import share from './share.png'
import SingleView from '../GallerySingleView/GallerySingleView'


const Gallery = () => {
  const [page, setPage] = useState('overview')
  const [allmemes, setAllMemes] = useState([]);
  const memeNumber = useRef(0);

  const content = () => {
    if (page === 'overview') {
      return (<Overview></Overview>);
    } else if (page === 'singleview') {
      return (<SingleView memesList={allmemes} memeNumber={memeNumber.current}></SingleView>)
    }
  }

  useEffect(() => {
    fetchMemes()
  }, [])
  
  const fetchMemes = async() => {
    const resultMemes = await axios.get('http://localhost:5001/allMemes',).then((res) => {
        if(res.data){
            return res.data
        }
    }).catch((error) => {
        error.toString();
    });
    setAllMemes(resultMemes);
  }

  const Overview = (props) => {

    const memesArray = allmemes.map((meme, i) => (
    <div className={styles.item} key={i}>
      <img width='250px' height='250px' alt={`meme_${i}`} src={`data:image/png;base64,${encode(meme.template.data)}`} onClick={()=>{memeNumber.current = i;setPage('singleview')}}/>
      Created by: {meme.author}
      <div className={styles.iconbox}>
        <div className={styles.iconbox}>{meme.votes}<img src={like} alt={`like_${i}`} className={styles.icons} onClick={() => { handleLikeClick() }}></img></div>
        <div className={styles.iconbox}><img src={comment} alt={`like_${i}`} className={styles.icons} onClick={() => { handleCommentClick() }}></img></div>
        <div className={styles.iconbox}><img src={share} alt={`like_${i}`} className={styles.icons} onClick={() => { handleShareClick() }}></img></div>
      </div>
    </div>
    )); 

    function handleLikeClick() {
      console.log('LIKED')
    }

    function handleCommentClick() {
      console.log('COMMENT')
    }

    function handleShareClick() {
      console.log('SHARE')
    }

    return (
      <div>
      <h2>Overview</h2>
      <button className={styles.button} onClick={()=>{setPage('singleview')}}>Switch to Single View</button>
      <div className={styles.container}>{memesArray}</div> 
      </div>
    );
  }

    return (
      <div>{content()}</div>
    );
};

export default Gallery;
