import React, {useEffect, useRef, useState} from 'react';
import styles from './Editor.module.css';
import {useAuth0} from "@auth0/auth0-react";
import Toolbox from "../Toolbox/Toolbox";
import EditorPickFromDesktop from "../EditorPickFromDesktop/EditorPickFromDesktop";
import EditorPickFromUrl from "../EditorPickFromUrl/EditorPickFromUrl";
import axios from "axios";
import {encode} from "base64-arraybuffer";


const Editor = () => {
    const [templates, setTemplates] = useState([])
    const [canvasWidth, setCanvasWidth] = useState(400)
    const [canvasHeight, setCanvasHeight] = useState(400)
    const [texts, setTexts] = useState([{text: ""}])
    const [xPositions, setXPositions] = useState([{x: canvasWidth / 2}, {x: canvasWidth / 2}, {x: canvasWidth / 2}, {x: canvasWidth / 2}])
    const [yPositions, setYPositions] = useState([{y: 30}, {y: 60}, {y: 90}, {y: 120}])
    const [textColor, setTextColor] = useState("#fff")
    const [textSize, setTextSize] = useState(22)
    const [privateTemplate, setPrivateTemplate] = useState(false)
    const [mode, setMode] = useState({
        draw: false, desktop: false, url: false, random: false, browse: false
    })

    const canvas = useRef(null)
    const {isAuthenticated} = useAuth0()
    // todo: resize images, move images

    useEffect(() => {
        console.log("updating")
        if (templates.length > 0) {
            const context = canvas.current.getContext("2d")
            context.fillStyle = "black"
            context.fillRect(0, 0, canvasWidth, canvasHeight)
            for (let i = 0; i < templates.length; i++) {
                const templateImage = new Image()
                templateImage.src = templates[i].image
                templateImage.onload = () => {
                    context.drawImage(templateImage, 50 + i * 20, 50 + i * 20, 300, 300)
                    if (i === templates.length - 1) {
                        context.font = `${textSize}px Comic Sans MS`
                        context.fillStyle = textColor
                        context.textAlign = "center"
                        for (let j = 0; j < texts.length; j++) {
                            context.fillText(texts[j].text, xPositions[j].x, yPositions[j].y)
                        }
                    }
                }
            }
        }
    }, [templates, texts, canvas, canvasWidth, canvasHeight, xPositions, yPositions, textColor, textSize]);


    const addTextBox = () => {
        if (texts.length < 4) setTexts([...texts, {text: ""}])
    }

    const removeTextBox = () => {
        if (texts.length > 1) {
            setTexts(texts.slice(0, texts.length - 1))
        }
    }

    const setText = (index, content) => {
        setTexts([...texts.slice(0, index), {text: content}, ...texts.slice(index + 1, texts.length - 1)])
        console.log(texts)
    }

    const setXForText = (index, xPos) => {
        setXPositions([...xPositions.slice(0, index), {x: parseInt(xPos)}, ...xPositions.slice(index + 1, xPositions.length - 1)])
    }

    const setYForText = (index, yPos) => {
        setYPositions([...yPositions.slice(0, index), {y: parseInt(yPos)}, ...yPositions.slice(index + 1, yPositions.length - 1)])
    }

    const getRandomTemplate = () => {
        axios
            .get("http://localhost:5001/anyTemplate")
            .then(data => {
                if (templates.length < 3) {
                    setTemplates([...templates, {image: `data:image/png;base64,${encode(data.data.image.data)}`}])
                }
            })
            .catch(error => console.log(error))
    }

    const getTemplate = (name) => {
        axios
            .get(`http://localhost:5001/template?name=${name}`)
            .then(data => {
                if (templates.length < 3) {
                    setTemplates([...templates, {image: `data:image/png;base64,${encode(data.data.image.data)}`}])
                }
            })
            .catch(error => console.log(error))
    }

    if (!isAuthenticated) return <div>Please log in.</div>

    return (<>
        <Toolbox setMode={setMode} mode={mode} randomTemplate={getRandomTemplate}
                 getTemplate={getTemplate}/>
        <div className={styles.outerContainer}>
            <div className={styles.editorContainer}>
                <div className={styles.splitView}>
                    <div className={styles.splitLeft}>
                        <canvas ref={canvas} width={canvasWidth} height={canvasHeight}
                                className={styles.canvas}/>
                    </div>
                    <div className={styles.splitRight}>
                        <EditorPickFromDesktop setPrivateTemplate={setPrivateTemplate}
                                               privateTemplate={privateTemplate}
                                               templates={templates} setTemplates={setTemplates}
                                               visible={mode.desktop}/>
                        <EditorPickFromUrl templates={templates} setTemplates={setTemplates}
                                           visible={mode.url}/>
                        <div>
                            <h2>Editor</h2>
                            <button onClick={addTextBox}>Add</button>
                            <button onClick={removeTextBox}>Remove</button>
                            <input type="text" onChange={e => setTextColor(e.target.value)}
                                   placeholder="#fff"
                                   value={textColor}/>
                            <input type="number"
                                   onChange={e => setTextSize(parseInt(e.target.value))}
                                   placeholder="22" value={textSize}/>
                            {texts.map((i, index) => <div
                                className={styles.memeTools} key={index + 1}>
                                <input type="text" placeholder={`text ${index + 1}`}
                                       onChange={e => setText(index, e.target.value)}/>
                                <input type="number" value={xPositions[index].x}
                                       onChange={e => setXForText(index, e.target.value)}/>
                                <input type="number" value={yPositions[index].y}
                                       onChange={e => setYForText(index, e.target.value)}/>
                                <button onClick={() => {
                                    setXForText(index, canvasWidth / 2)
                                    setYForText(index, canvasHeight / 2)
                                }}>center
                                </button>
                                <button onClick={() => {
                                    setXForText(index, canvasWidth / 2)
                                }}>center X
                                </button>
                                <button onClick={() => {
                                    setYForText(index, canvasHeight / 2)
                                }}>center Y
                                </button>
                            </div>)}
                            <div>
                                <input type="number" placeholder="canvas width"
                                       value={canvasWidth}
                                       onChange={e => setCanvasWidth(parseInt(e.target.value))}/>
                                <input type="number" placeholder="canvas height"
                                       value={canvasHeight}
                                       onChange={e => setCanvasHeight(parseInt(e.target.value))}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>)
}
export default Editor;