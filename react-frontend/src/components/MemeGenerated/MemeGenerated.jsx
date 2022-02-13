import {React, useState} from 'react';
import styles from './styles.module.css';
import { useNavigate, useLocation } from 'react-router-dom';

/**
 * Meme generation with Imgflip API (not used anymore in main application)
 * Source: https://www.youtube.com/watch?v=SMzAcBEc6Zk&t=2113s
 * @returns 
 */
export const MemeGenerated = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const url = new URLSearchParams(location.search).get('url');


    return(
        <div className={styles.container}>
        <button onClick={() => navigate('/editor')} className={styles.home} >
            Make more Memes
        </button>
            {url && <img alt='meme' src={url}/>}
        </div>
        )
        
}