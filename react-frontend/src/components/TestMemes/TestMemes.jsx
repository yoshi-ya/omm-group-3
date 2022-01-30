/**
 * Das ist ein Beispiel für eine React-Component, bei der man sowohl alle gespeicherten
 *  Memes sieht, als auch Memes hochladen kann und Live Veränderungen mitbekommt.
 */

import React, {useEffect, useState} from 'react';
import axios from "axios";
import {encode} from "base64-arraybuffer";


const TestMemes = () => {

    const [memes, setMemes] = useState([]);
    const [isPrivate, setIsPrivate] = useState(false)

    useEffect(() => {
        axios
            .get("http://localhost:5001/allMemes")
            .then(data => setMemes(data.data))
    }, []);

    return (<>
        <ul>
            {memes.map(meme => {
                return (<li key={meme._id}>
                    <img src={`data:image/png;base64,${encode(meme.template.data)}`}
                         alt={`meme_${meme._id}`}/>
                </li>)
            })}
        </ul>

        <form name="memeForm" action="http://localhost:5001/upload" method="POST"
              encType="multipart/form-data">
            <input type="file" name="meme" id="meme" accept="image/png, image/jpg, image/jpeg"/>
            <input type="text" name="author" id="author" placeholder="author"/>
            <input type="text" name="text1" id="text1" placeholder="text1"/>
            <input type="number" name="votes" id="votes" placeholder="votes"/>
            <label>
                <input type="radio" value="yes" onClick={() => setIsPrivate(!isPrivate)} checked={isPrivate}/>
                Set private?
            </label>
            <input type="submit" value="upload"/>
        </form>
    </>
);
};

export default TestMemes;
