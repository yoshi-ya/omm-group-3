import React, {useState} from 'react'
import {useAuth0} from "@auth0/auth0-react";
import styles from '../Editor/Editor.module.css';
import {Outlet} from 'react-router-dom'
import {encode} from "base64-arraybuffer";
import Toolbox from "../Toolbox/Toolbox";


const Editor = () => {

    const {isAuthenticated} = useAuth0();
    const [memes, setMemes] = useState([]);
    const [currTemplate, setcurrTemplate] = useState(null);

   /* if (!isAuthenticated) {
        return (<div>
            Please log in to create and upload memes.
        </div>)
    }*/

    const handleMeme = (_meme) => {
        if (currTemplate == null) {
            setcurrTemplate(_meme);
        }
    }

    return (<>
        <Toolbox />
        <div className={styles.outerContainer}>
            <div className={styles.editorContainer}>
                <div className={styles.images}>
                    <div className={styles.container}>
                        {memes.map(meme => {
                            return (<div className={styles.templates} key={meme._id}>
                                <img className={styles.meme} width='50px' height='50px'
                                     onClick={() => handleMeme(meme)}
                                     src={`data:image/png;base64,${encode(meme.template.data)}`}
                                     alt={`meme_${meme._id}`}/>
                            </div>)
                        })}
                    </div>
                    {currTemplate !== null ?
                        <div className={styles.singleIMG} key={currTemplate._id}>
                            <img className={styles.meme} width='400px' height='400px'
                                 src={`data:image/png;base64,${encode(currTemplate.template.data)}`}
                                 alt={`meme_${currTemplate._id}`}/>
                        </div> : <></>}
                </div>
                <Outlet/>
            </div>
        </div>
    </>);
};

export default Editor;
