import React, {useEffect, useRef, useState} from 'react';
import styles from './Editor.module.css';
import {useAuth0} from "@auth0/auth0-react";
import Toolbox from "../Toolbox/Toolbox";
import EditorPickFromDesktop from "../EditorPickFromDesktop/EditorPickFromDesktop";
import EditorPickFromUrl from "../EditorPickFromUrl/EditorPickFromUrl";
import axios from "axios";
import {encode} from "base64-arraybuffer";
import EditorPickFromCamera from '../EditorPickFromCamera/EditorPickFromCamera';
import audioIcon from "./audio.png"
import microphoneIcon from "./microphone.png"

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
const recognition = new SpeechRecognition()

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
    const [privateMeme, setPrivateMeme] = useState(false)
    const [mode, setMode] = useState({draw: false, desktop: true, url: false, camera: false})
    const [isDrawing, setIsDrawing] = useState(false)
    const canvasRef = useRef(0)
    const {isAuthenticated, user} = useAuth0()
    const mic = useRef(null)


    const clear = () => {
        setTemplates([])
    }

    const tts = (text) => {
        let tts = new SpeechSynthesisUtterance()
        tts.text = text
        window.speechSynthesis.speak(tts)
    }

    const stt = (index) => {
        recognition.interimResults = true
        recognition.lang = "en-US"
        recognition.start()
        recognition.onresult = e => {
            const transcript = Array.from(e.results)
                .map(result => result[0])
                .map(result => result.transcript)
                .join('')
            setText(index, transcript)
        }
        recognition.onend = () => {
            recognition.stop()
        }
    }

    useEffect(() => {
        if (canvasRef.current) {
            const context = canvasRef.current.getContext("2d")
            context.fillStyle = "black"
            context.fillRect(0, 0, canvasWidth, canvasHeight)
        }
    }, [templates])

    useEffect(() => {
        if (mode.draw) {
            const context = canvasRef.current.getContext("2d")
            context.fillStyle = "black"
            context.fillRect(0, 0, canvasWidth, canvasHeight)
            context.scale(1, 1);
            context.lineCap = "round";
            context.strokeStyle = "white";
            context.lineWidth = 3;
        }
    }, [canvasRef, mode])

    useEffect(() => {
        console.log(texts)
        if (templates.length > 0 && !mode.draw) {
            const context = canvasRef.current.getContext("2d")
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
    }, [mode, templates, texts, canvasRef, canvasWidth, canvasHeight, xPositions, yPositions, templateConfigs, textColor, textSize]);


    const startDrawing = ({nativeEvent}) => {
        if (mode.draw) {
            setIsDrawing(true);
            const {offsetX, offsetY} = nativeEvent;
            const context = canvasRef.current.getContext("2d")
            context.beginPath();
            context.moveTo(offsetX, offsetY);
        }
    }

    const finishDrawing = () => {
        if (mode.draw) {
            const context = canvasRef.current.getContext("2d")
            context.closePath();
            setIsDrawing(false)
        }
    }

    const draw = ({nativeEvent}) => {
        if (mode.draw && isDrawing) {
            const {offsetX, offsetY} = nativeEvent;
            const context = canvasRef.current.getContext("2d")
            context.lineTo(offsetX, offsetY);
            context.stroke();
        }
    }

    const addTextBox = () => {
        if (texts.length < 4 && templates.length > 0) setTexts([...texts, {text: ""}])
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

    if (!isAuthenticated) {
        return (<div>
            Please log in to create and upload memes.
        </div>)
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

    const exportCanvas = () => {
        let name = document.getElementById("title").value
        let templateData = []
        templates.forEach((template, index) => {
            templateData.push({
                url: template.image,
                x: templateConfigs[index].x,
                y: templateConfigs[index].y,
                width: templateConfigs[index].width,
                height: templateConfigs[index].height
            })
        })
        let textData = []
        texts.forEach((text, index) => {
            textData.push({text: text.text, x: xPositions[index].x, y: yPositions[index].y})
        })
        return {
            templates: templateData,
            texts: textData,
            canvasWidth: canvasWidth,
            canvasHeight: canvasHeight,
            color: textColor,
            size: textSize,
            author: user.name,
            name: name,
            private: privateMeme
        }
    }

    const download = () => {
        if (mode.draw) {
            const imageURL = canvasRef.current.toDataURL()
            const link = document.createElement('a')
            link.href = imageURL
            link.download = 'meme.png'
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
        } else {
            const canvasConfig = exportCanvas()
            axios
                .post("http://localhost:5001/download", canvasConfig, {responseType: 'blob'})
                .then(res => {
                    const url = window.URL.createObjectURL(new Blob([res.data]));
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', 'meme.png');
                    document.body.appendChild(link);
                    link.click();
                    link.remove()
                })
                .catch(error => console.log(error))
        }
    }

    const save = () => {
        if (mode.draw && templates.length < 3) {
            // set drawing as template
            let imageURL = canvasRef.current.toDataURL()
            setTemplates([...templates, {image: imageURL}])
            setMode({draw: false, desktop: true, url: false, camera: false})
        } else {
            let canvasConfig = exportCanvas()
            let name = canvasConfig.name
            if (!name.length > 0) return alert("Please give your Meme a title!")
            axios
                .post("http://localhost:5001/saveMeme", canvasConfig)
                .then(() => alert("Saved."))
                .catch(err => console.log(err))
        }
    }

    if (!isAuthenticated) return <div>Please log in.</div>

    return (<>
        <Toolbox setMode={setMode} mode={mode} randomTemplate={getRandomTemplate}
                 getTemplate={getTemplate} addCaption={addTextBox} removeCaption={removeTextBox}
                 download={download} save={save} clear={clear}/>
        <div className={styles.outerContainer}>
            <div className={styles.editorContainer}>
                <div className={styles.splitView}>
                    <div
                        className={mode.draw || mode.camera ? styles.drawModeLeft : styles.splitLeft}>
                        <EditorPickFromCamera setPrivateTemplate={setPrivateTemplate}
                                              privateTemplate={privateTemplate}
                                              templates={templates} setTemplates={setTemplates}
                                              visible={mode.camera} setMode={setMode}/>
                        <canvas id="canvas" ref={canvasRef} width={canvasWidth}
                                height={canvasHeight}
                                className={mode.camera ? styles.hidden : styles.canvas}
                                onMouseDown={startDrawing}
                                onMouseUp={finishDrawing} onMouseMove={draw}/>
                        <div
                            className={mode.draw || mode.camera ? styles.hidden : styles.rowCenter}>
                            <form>
                                <input id="title" type="text" placeholder="meme title"/>
                                <div className={styles.memeTitle}>
                                    <input id="private-meme" type="radio"
                                           onClick={() => setPrivateMeme(!privateMeme)}
                                           checked={privateMeme} readOnly={true}/>
                                    <label htmlFor="private-meme">private meme</label>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className={mode.draw ? styles.drawModeRight : styles.splitRight}>
                        <div className={styles.editor}>
                            <EditorPickFromDesktop setPrivateTemplate={setPrivateTemplate}
                                                   privateTemplate={privateTemplate}
                                                   templates={templates} setTemplates={setTemplates}
                                                   visible={mode.desktop}/>
                            <EditorPickFromUrl templates={templates} setTemplates={setTemplates}
                                               visible={mode.url}/>
                            <div className={templates.length > 0 ? styles.wrapper : styles.hidden}>
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
                                className={templates.length > 0 ? styles.wrapper : styles.hidden}
                                key={index + 1}>
                                <span className={styles.title}>{`Caption ${index + 1}`}</span>
                                <div className={styles.row}>
                                    <div className={styles.audio}>
                                        <input className={styles.item} type="text"
                                               placeholder={`text ${index + 1}`}
                                               onChange={e => setText(index, e.target.value)}
                                               value={texts[index].text}
                                        />
                                        <button className={styles.item}
                                                onClick={() => tts(texts[index].text)}>
                                            <img className={styles.item} src={audioIcon} alt="tts"/>
                                        </button>
                                        <button className={styles.item} ref={mic}
                                                onClick={() => stt(index)}>
                                        <img className={styles.item} src={microphoneIcon}
                                             alt="stt"/>
                                    </button>
                                </div>
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
                                <button className={styles.item} onClick={() => {setXForText(index, canvasWidth / 2)
                                setYForText(index, canvasHeight / 2)}}>center
                                </button>
                                <button className={styles.item} onClick={() => {setXForText(index, canvasWidth / 2)}}>center X
                                </button>
                                <button className={styles.item} onClick={() => {setYForText(index, canvasHeight / 2)}}>center Y
                                </button>
                                </div>
                                </div>)}
                            <div className={templates.length > 0 ? styles.wrapper : styles.hidden}>
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
