import React, {useEffect, useReducer, useState} from 'react';
import { MemeGenerated } from '../MemeGenerated/MemeGenerated';
import {Route, Routes, BrowserRouter as Router, Link} from "react-router-dom";
import axios from 'axios';
import {encode} from "base64-arraybuffer";
import { Meme } from '../Meme/Meme';
import styles from './Gallery.module.css';
import like from './like.png'
import comment from './comment.png'
import share from './share.png'
import SingleView from '../GallerySingleView/GallerySingleView'
import { useRef } from 'react';


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
    const resultMemes = await axios.get('http://localhost:5001/allMemes', 
    ).then((res) => {
        if(res.data){
            return res.data
        }
    }).catch((error) => {
        error.toString();
    })
    setAllMemes(resultMemes);
  }

  const Overview = (props) => {

    const memesArray = allmemes.map((meme, i) => (
    <div className={styles.item} key={i}>
      <img width='250px' height='250px' alt={`meme_${i}`} src={`data:image/png;base64,${encode(meme.template.data)}`} onClick={()=>{memeNumber.current = i;setPage('singleview')}}/>
      <div className={styles.iconbox}>
        <div className={styles.iconbox}>{meme.votes}<img src={like} alt={`like_${i}`} className={styles.icons} onClick={() => { handleLikeClick() }}></img></div>
        <div className={styles.iconbox}><img src={comment} alt={`like_${i}`} className={styles.icons}></img></div>
        <div className={styles.iconbox}><img src={share} alt={`like_${i}`} className={styles.icons}></img></div>
      </div>
    </div>
    )); 

    function handleLikeClick() {
      console.log('LIKED')
    }

    return (
      <div>
      <h2>Overview</h2>
      <button className={styles.button} onClick={()=>{setPage('singleview')}}>Switch to Single View</button>
      <div className={styles.container}>{memesArray}</div> 
      </div>
    );
  }

  const SingleViewOld = (props) => {
  
    const memesArray = allmemes.map((meme, i) => (
    <div className={styles.slide} key={i}>
      <img width='1000px' height='1000px' alt="meme" src={`data:image/png;base64,${encode(meme.template)}`}/>
    </div>
    )); 
    
    const slideDotsArray = allmemes.map((meme, i) => (
        <div key={i} className={styles.dot}></div>
    ));

    const [index, setIndex] = useState(0)
    const delay = 2500;

    return (
      <div>
      <h2>Single View</h2>
      <button className={styles.button} onClick={()=>{setPage('overview')}}>Switch to  Overview</button>
      <div className={styles.slideshow}>
        <div 
          className={styles.slideshowSlider}
          style={{ transform: `translate3d(${-index * 100}%, 0, 0)`}}
        >
        {memesArray}
        </div>
        <div className={styles.slideshowDots}>
          {slideDotsArray}
        </div>
      </div>
      Votes
      Comments 
      </div>
    );
  }

    return (
      <div>{content()}</div>
    );
};

export default Gallery;
