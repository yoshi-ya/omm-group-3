import React, {useEffect, useReducer, useState} from 'react';
import { MemeGenerated } from '../MemeGenerated/MemeGenerated';
import {Route, Routes, BrowserRouter as Router, Link} from "react-router-dom";
import axios from 'axios';
import { Meme } from '../Meme/Meme';
import styles from './Gallery.module.css';
import like from './like.png'
import comment from './comment.png'
import share from './share.png'


const Gallery = () => {
  const [page, setPage] = useState('overview')
  const [allmemes, setAllMemes] = useState([]);
  const [data, setData] = useState([]);
  const [votes, setVotes] = useState([])

  const content = () => {
    if (page === 'overview') {
      return (<Overview></Overview>);
    } else if (page === 'singleview') {
      return (<SingleView></SingleView>)
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
    allmemes.forEach(element => {
      element.template = window.URL.createObjectURL(element.template);
    });
    //setData(resultMemes[0].template);
    //setVotes(resultMemes[0].votes)
  }

  const Overview = (prop) => {

    const memesArray = allmemes.map((meme, i) => (
    <div className={styles.item} key={i}>
      <img width='250px' height='250px' alt="meme" src={meme.template}/>
      <div className={styles.iconbox}>
        <div className={styles.iconbox}>{meme.votes}<img src={like} className={styles.icons}></img></div>
        <div className={styles.iconbox}><img src={comment} className={styles.icons}></img></div>
        <div className={styles.iconbox}><img src={share} className={styles.icons}></img></div>
      </div>
    </div>
    )); // `.map()` creates/returns a new array from calling a function on every element in the array it's called on

    return (
      <div>
      <h2>Overview</h2>
      <div className={styles.container}>{memesArray}</div> 
      </div>
    );
  }

  const SingleView = () => {

    const memesArray = allmemes.map((meme, i) => (
    <div className={styles.slide}>
      <img width='1000px' height='1000px' alt="meme" src={`data:image/png;base64,${meme.template}`}/>
    </div>
    )); // `.map()` creates/returns a new array from calling a function on every element in the array it's called on
    
    const slideDotsArray = allmemes.map((meme, i) => (
      <div key={i} className={styles.dot}></div>
    ));

    const [index, setIndex] = useState(0)

    return (
      <div>
      <h2>Single View</h2>
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
      </div>
    );
  }

    return (
      <div>{content()}</div>
    );
};

export default Gallery;
