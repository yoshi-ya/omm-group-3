import React, {useEffect, useReducer, useState} from 'react';
import { MemeGenerated } from '../MemeGenerated/MemeGenerated';
import {Route, Routes, BrowserRouter as Router, Link} from "react-router-dom";


const Gallery = () => {
  const [allmemes, setAllMemes] = useState([]);

  useEffect(() => {
    fetchMemes()
    }, )
  
  const fetchMemes = async () => {
    const resultMemes = fetch('/allMemes', {
      method: 'get',
      }).then(res => {
      res.json()
      })
    setAllMemes(resultMemes);
    console.log(resultMemes)
  }



    return (
    <div>
      <div>
          Overview
      </div>
      <div>
        Memes
      </div>
    </div>
    );
};

export default Gallery;
