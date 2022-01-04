import {React, useState} from 'react';
import styles from './styles.module.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { useClipboard} from 'use-clipboard-copy';

export const MemeGenerated = () => {

    const [copied, setCopied] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();
    const clipboard = useClipboard();
    const url = new URLSearchParams(location.search).get('url');

    const copyLink = () => {
        clipboard.copy(url);
        setCopied(true);
    }

    return(
        <div className={styles.container}>
        <button onClick={() => navigate('/')} className={styles.home} >
            Make more Memes
        </button>
            {url && <img alt='meme' src={url}/>}

        <button onClick={copyLink} className={styles.copy}>
          {copied ? 'Link copied' : 'Copy Link'}
        </button>
        </div>
        )
}