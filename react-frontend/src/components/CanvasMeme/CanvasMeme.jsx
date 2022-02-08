import React, {useEffect, useRef, useState} from 'react';
import styles from "./CanvasMeme.module.css";
import axios from "axios";


const CanvasMeme = ({id}) => {

    const canvasRef = useRef(0)
    const [meme, setMeme] = useState({})


    useEffect(() => {
        axios
            .get(`http://localhost:5001/fetchMeme?id=${id}`)
            .then(result => {
                setMeme(result.data)
            })
            .catch(error => console.log(error))

    }, []);

    useEffect(() => {
        if (meme && meme.templates && meme.templates.length > 0) {
            const context = canvasRef.current.getContext("2d")
            context.fillStyle = "black"
            context.fillRect(0, 0, meme.canvasWidth, meme.canvasHeight)
            for (let i = 0; i < meme.templates.length; i++) {
                const templateImage = new Image()
                templateImage.src = meme.templates[i].url
                templateImage.onload = () => {
                    context.drawImage(templateImage, meme.templates[i].x, meme.templates[i].y, meme.templates[i].width, meme.templates[i].height)
                    if (i === meme.templates.length - 1) {
                        context.font = `${meme.size}px Comic Sans MS`
                        context.fillStyle = meme.color
                        context.textAlign = "center"
                        for (let j = 0; j < meme.texts.length; j++) {
                            context.fillText(meme.texts[j].text, meme.texts[j].x, meme.texts[j].y)
                        }
                    }
                }
            }
        }
    }, [meme]);



    return (<canvas ref={canvasRef} width={meme ? meme.canvasWidth : 400} height={meme ? meme.canvasHeight : 400}
                    className={styles.canvas}/>);
};

export default CanvasMeme;
