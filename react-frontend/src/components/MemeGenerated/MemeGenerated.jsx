import {React, useState} from 'react';
import styles from './styles.module.css';
import { useNavigate, useLocation } from 'react-router-dom';

export const MemeGenerated = () => {

    const [copied, setCopied] = useState(false);

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