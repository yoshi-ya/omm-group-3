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
    const [templateConfigs, setTemplateConfigs] = useState([{
        x: 40, y: 40, width: 300, height: 300
    }, {x: 80, y: 80, width: 300, height: 300}, {x: 120, y: 120, width: 300, height: 300}])
    const [textColor, setTextColor] = useState("#fff")
    const [textSize, setTextSize] = useState(22)
    const [privateTemplate, setPrivateTemplate] = useState(false)
    const [mode, setMode] = useState({draw: false, desktop: false, url: false})

    const canvas = useRef(null)
    const {isAuthenticated} = useAuth0()

    useEffect(() => {
        if (templates.length > 0) {
            const context = canvas.current.getContext("2d")
            context.fillStyle = "black"
            context.fillRect(0, 0, canvasWidth, canvasHeight)
            for (let i = 0; i < templates.length; i++) {
                const templateImage = new Image()
                templateImage.src = templates[i].image
                templateImage.onload = () => {
                    context.drawImage(templateImage, templateConfigs[i].x, templateConfigs[i].y, templateConfigs[i].width, templateConfigs[i].height)
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
    }, [templates, texts, canvas, canvasWidth, canvasHeight, xPositions, yPositions, templateConfigs, textColor, textSize]);


    const addTextBox = () => {
        if (texts.length < 4) setTexts([...texts, {text: ""}])
    }

    const removeTextBox = () => {
        if (texts.length > 1) {
            setTexts(texts.slice(0, texts.length - 1))
        }
    }

    const setText = (index, content) => {
        let result = [...texts]
        if (index >= result.length) {
            setTexts([...texts, {text: content}])
        } else {
            result[index] = {text: content}
            setTexts(result)
        }
    }

    const setXForText = (index, xPos) => {
        let result = [...xPositions]
        result[index] = {x: parseInt(xPos)}
        setXPositions(result)
    }

    const setYForText = (index, yPos) => {
        let result = [...yPositions]
        result[index] = {y: parseInt(yPos)}
        setYPositions(result)
    }

    const setConfigForTemplate = (index, config) => {
        let result = [...templateConfigs]
        if (index >= result.length) {
            setTemplateConfigs([...templateConfigs, config])
        } else {
            result[index] = config
            setTemplateConfigs(result)
        }
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
                 getTemplate={getTemplate} addCaption={addTextBox} removeCaption={removeTextBox}/>
        <div className={styles.outerContainer}>
            <div className={styles.editorContainer}>
                <div className={styles.splitView}>
                    <div className={styles.splitLeft}>
                        <canvas ref={canvas} width={canvasWidth} height={canvasHeight}
                                className={styles.canvas}/>
                        <div className={styles.rowCenter}>
                            <button>Save</button>
                            <button>Download</button>
                        </div>
                    </div>
                    <div className={styles.splitRight}>
                        <div className={styles.editor}>
                            <EditorPickFromDesktop setPrivateTemplate={setPrivateTemplate}
                                                   privateTemplate={privateTemplate}
                                                   templates={templates} setTemplates={setTemplates}
                                                   visible={mode.desktop}/>
                            <EditorPickFromUrl templates={templates} setTemplates={setTemplates}
                                               visible={mode.url}/>
                            <h2>Editor</h2>
                            <div className={styles.wrapper}>
                                {templates.map((_, i) => <div key={i}>
                                    <span className={styles.title}>{`Image ${i + 1}`}</span>
                                    <div className={styles.row}>
                                        <span className={styles.item}>x</span>
                                        <input className={styles.item} type="number"
                                               onChange={e => setConfigForTemplate(i, {
                                                   x: parseInt(e.target.value),
                                                   y: templateConfigs[i].y,
                                                   width: templateConfigs[i].width,
                                                   height: templateConfigs[i].height
                                               })} value={templateConfigs[i].x}/>
                                        <span className={styles.item}>y</span>
                                        <input className={styles.item} type="number"
                                               onChange={e => setConfigForTemplate(i, {
                                                   x: templateConfigs[i].x,
                                                   y: parseInt(e.target.value),
                                                   width: templateConfigs[i].width,
                                                   height: templateConfigs[i].height
                                               })} value={templateConfigs[i].y}/>
                                    </div>
                                    <div className={styles.row}>
                                        <span className={styles.item}>width</span>
                                        <input className={styles.item} type="number"
                                               onChange={e => setConfigForTemplate(i, {
                                                   x: templateConfigs[i].x,
                                                   y: templateConfigs[i].y,
                                                   width: parseInt(e.target.value),
                                                   height: templateConfigs[i].height
                                               })} value={templateConfigs[i].width}/>
                                        <span className={styles.item}>height</span>
                                        <input className={styles.item} type="number"
                                               onChange={e => setConfigForTemplate(i, {
                                                   x: templateConfigs[i].x,
                                                   y: templateConfigs[i].y,
                                                   width: templateConfigs[i].width,
                                                   height: parseInt(e.target.value)
                                               })} value={templateConfigs[i].height}/>
                                    </div>
                                </div>)}
                                <div className={styles.row}>
                                    <span className={styles.item}>color</span>
                                    <input className={styles.item} type="text"
                                           onChange={e => setTextColor(e.target.value)}
                                           placeholder="#fff, black, ..."
                                           value={textColor}/>
                                    <span className={styles.item}>font-size</span>
                                    <input className={styles.item} type="number"
                                           onChange={e => setTextSize(parseInt(e.target.value))}
                                           placeholder="text size" value={textSize}/>
                                </div>
                            </div>
                            {texts.map((i, index) => <div
                                className={styles.wrapper} key={index + 1}>
                                <span className={styles.title}>{`Caption ${index + 1}`}</span>
                                <div className={styles.row}>
                                    <input className={styles.item} type="text"
                                           placeholder={`text ${index + 1}`}
                                           onChange={e => setText(index, e.target.value)}/>
                                    <span className={styles.item}>x</span>
                                    <input className={styles.item} type="number"
                                           value={xPositions[index].x}
                                           onChange={e => setXForText(index, e.target.value)}/>
                                    <span className={styles.item}>y</span>
                                    <input className={styles.item} type="number"
                                           value={yPositions[index].y}
                                           onChange={e => setYForText(index, e.target.value)}/>
                                </div>
                                <div className={styles.row}>
                                    <button className={styles.item} onClick={() => {
                                        setXForText(index, canvasWidth / 2)
                                        setYForText(index, canvasHeight / 2)
                                    }}>center
                                    </button>
                                    <button className={styles.item} onClick={() => {
                                        setXForText(index, canvasWidth / 2)
                                    }}>center X
                                    </button>
                                    <button className={styles.item} onClick={() => {
                                        setYForText(index, canvasHeight / 2)
                                    }}>center Y
                                    </button>
                                </div>
                            </div>)}
                            <div className={styles.wrapper}>
                                <span className={styles.title}>Canvas</span>
                                <div className={styles.row}>
                                    <span className={styles.item}>width</span>
                                    <input className={styles.item} type="number"
                                           placeholder="canvas width"
                                           value={canvasWidth}
                                           onChange={e => setCanvasWidth(parseInt(e.target.value))}/>
                                    <span className={styles.item}>height</span>
                                    <input type="number" placeholder="canvas height"
                                           value={canvasHeight}
                                           onChange={e => setCanvasHeight(parseInt(e.target.value))}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>)
}
export default Editor;