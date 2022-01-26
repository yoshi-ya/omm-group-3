import React, {useEffect, useReducer, useState} from 'react';
import { MemeGenerated } from '../MemeGenerated/MemeGenerated';
import {Route, Routes, BrowserRouter as Router, Link} from "react-router-dom";
import axios from 'axios';


const Gallery = () => {
  const [allmemes, setAllMemes] = useState([]);
  const [data, setData] = useState([]);
  const [votes, setVotes] = useState([])

  useEffect(() => {
    fetchMemes()
}, )
  
  const fetchMemes = async () => {
    const resultMemes = await axios.get('http://localhost:5001/allMemes'
    ).then((res) => {
        if(res.data){
            return res.data
        }
    }).catch((error) => {
        error.toString();
    })
    setAllMemes(resultMemes);
    //let image = URL.createObjectUrl(allmemes[1].template.toString()).toString();
    setData(resultMemes[0].template);
    setVotes(resultMemes[0].votes)
    //allmemes.forEach(image => {
    //    setData(data => [...data, image.template])
    //});
  }


    return (
    <div>
      <div>
          Overview
      </div>
      <div>
        {data ? <img width='150px' height='150px' alt="pic" src={`data:image/png;base64,${data}`}/>: ''}
        {votes} Likes
      </div>
    </div>
    );
};

export default Gallery;
