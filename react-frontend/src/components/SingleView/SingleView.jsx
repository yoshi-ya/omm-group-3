import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import axios from "axios";
import CanvasMeme from "../CanvasMeme/CanvasMeme";
import styles from "./SingleView.module.css"


const SingleView = () => {

    let {id} = useParams()
    const [meme, setMeme] = useState({});

    useEffect(() => {
        axios.get(`http://localhost:5001/fetchMeme?id=${id}`)
            .then(data => {
                setMeme(data.data)
            })
            .catch(error => console.log(error))

    }, [id]);


    if (!meme) return <img src="https://via.placeholder.com/256?text=no%20meme%20found" alt="meme"/>

    return <div className={styles.meme}>
        <CanvasMeme meme={meme}/>
    </div>

};

export default SingleView;
