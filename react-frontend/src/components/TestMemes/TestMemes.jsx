/**
 * Das ist ein Beispiel für eine React-Component, bei der man sowohl alle gespeicherten
 *  Memes sieht, als auch Memes hochladen kann und Live Veränderungen mitbekommt.
 */

import React, {useEffect, useState} from 'react';
import axios from "axios";
import {encode} from "base64-arraybuffer";


const TestMemes = () => {

    const [memes, setMemes] = useState([]);
    const [templates, setTemplates] = useState([])

    useEffect(() => {
        axios
            .get("http://localhost:5001/allMemes")
            .then(data => setMemes(data.data))
    }, []);

    useEffect(() => {
        axios
            .get("http://localhost:5001/allTemplates")
            .then(data => setTemplates(data.data))
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

        <ul>
            {templates.map(template => {
                return (<li key={template._id}>
                    <img src={`data:image/png;base64,${encode(template.image.data)}`}
                         alt={`meme_${template._id}`}/>
                </li>)
            })}
        </ul>

        <h1>Upload Memes</h1>
        <form name="memeForm" action="http://localhost:5001/upload" method="POST"
              encType="multipart/form-data">
            <input type="file" name="meme" id="meme" accept="image/png, image/jpg, image/jpeg" required/>
            <input type="text" name="text1" id="text1" placeholder="text1" required/>
            <input type="text" name="author" id="author" placeholder="author"/>
            <input type="submit" value="upload"/>
        </form>
        <h1>Upload templates</h1>
        <form name="memeForm" action="http://localhost:5001/uploadTemplate" method="POST"
              encType="multipart/form-data">
            <input type="file" name="template" id="template" accept="image/png, image/jpg, image/jpeg" required/>
            <input type="text" name="name" id="name" placeholder="Template Name" required/>
            <input type="text" name="author" id="author" placeholder="Author"/>
            <input type="submit" value="upload"/>
        </form>
    </>);
};

export default TestMemes;
