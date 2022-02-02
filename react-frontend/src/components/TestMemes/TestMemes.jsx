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
        fetchData()
            .then(data => {
                setMemes(data[0].data)
                setTemplates(data[1].data)
            })
            .catch(error => console.log(error))

    }, []);

    const fetchData = async () => {
        return await Promise.all([
            axios.get("http://localhost:5001/allMemes"),
            axios.get("http://localhost:5001/allTemplates")
        ])
    }

    const upload = (event, route) => {
        event.preventDefault()
        const memeFormData = new FormData()
        let image = event.target.image.files[0]
        memeFormData.append("image", image)
        Array.from(event.target).forEach(elem => {
            if (elem.name && elem.name !== "image") memeFormData.append(elem.name, elem.value)
        })

        axios({
            method: "post",
            url: `http://localhost:5001/${route}`,
            data: memeFormData,
            headers: {"content-type": "multipart/form-data"}
        })
            .then(fetchData)
            .then(data => {
                setMemes(data[0].data)
                setTemplates(data[1].data)
            })
            .catch(error => console.log(error))
    }


    return (<>
        <h3>memes</h3>
        <ul>
            {memes.map(meme => {
                return (<li key={meme._id}>
                    <img src={`data:image/png;base64,${encode(meme.template.data)}`}
                         alt={`meme_${meme._id}`}/>
                </li>)
            })}
        </ul>
        <h3>templates</h3>
        <ul>
            {templates.map(template => {
                return (<li key={template._id}>
                    <img src={`data:image/png;base64,${encode(template.image.data)}`}
                         alt={`meme_${template._id}`}/>
                </li>)
            })}
        </ul>

        <h1>Upload Memes</h1>
        <form onSubmit={e => upload(e, "addMeme")}>
            <input type="file" name="image" accept="image/png, image/jpg, image/jpeg"
                   required/>
            <input type="text" name="text1" placeholder="text1" required/>
            <input type="text" name="author" placeholder="author"/>
            <input type="submit" value="upload"/>
        </form>
        <h1>Upload templates</h1>
        <form onSubmit={e => upload(e, "addTemplate")}>
            <input type="file" name="image" accept="image/png, image/jpg, image/jpeg" required/>
            <input type="text" name="name" placeholder="Template Name" required/>
            <input type="text" name="author" placeholder="Author"/>
            <input type="submit" value="upload"/>
        </form>
    </>);
};

export default TestMemes;
