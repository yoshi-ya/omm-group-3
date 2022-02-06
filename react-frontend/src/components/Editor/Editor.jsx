import React, {useEffect, useRef, useState} from 'react';
import styles from './Editor.module.css';
import {useAuth0} from "@auth0/auth0-react";
import {encode} from "base64-arraybuffer";
import Toolbox from "../Toolbox/Toolbox";
import EditorPickFromDesktop from "../EditorPickFromDesktop/EditorPickFromDesktop";


const Editor = () => {
    const [template, setTemplate] = useState({})
    const [numberOfTextBoxes, setNumberOfTextBoxes] = useState(1);
    const [canvasWidth, setCanvasWidth] = useState(400)
    const [canvasHeight, setCanvasHeight] = useState(400)
    const [text1, setText1] = useState("")
    const [text2, setText2] = useState("")
    const [text3, setText3] = useState("")
    const [text4, setText4] = useState("")
    const [text1X, setText1X] = useState(canvasWidth / 2)
    const [text2X, setText2X] = useState(canvasWidth / 2)
    const [text3X, setText3X] = useState(canvasWidth / 2)
    const [text4X, setText4X] = useState(canvasWidth / 2)
    const [text1Y, setText1Y] = useState(30)
    const [text2Y, setText2Y] = useState(60)
    const [text3Y, setText3Y] = useState(90)
    const [text4Y, setText4Y] = useState(120)
    const [textColor, setTextColor] = useState("#fff")
    const [textSize, setTextSize] = useState(22)
    const [privateTemplate, setPrivateTemplate] = useState(false)
    const [mode, setMode] = useState({draw: false, desktop: false, url: false, random: false, browse: false})


    const canvas = useRef(null)

    const {isAuthenticated} = useAuth0()
    // todo: upload multiple images inside canvas -> resize images

    useEffect(() => {
        if (template.image) {
            const context = canvas.current.getContext("2d")
            context.fillStyle = "black"
            context.fillRect(0, 0, canvasWidth, canvasHeight)
            const templateImage = new Image()
            templateImage.src = `data:image/png;base64,${encode(template.image.data)}`
            templateImage.onload = () => {
                context.drawImage(templateImage, 50, 50, 300, 300)
                context.font = `${textSize}px Comic Sans MS`
                context.fillStyle = textColor
                context.textAlign = "center"
                context.fillText(text1, text1X, text1Y)
                context.fillText(text2, text2X, text2Y)
                context.fillText(text3, text3X, text3Y)
                context.fillText(text4, text4X, text4Y)
            }
        }
    }, [template, canvas, canvasWidth, canvasHeight, text1, text2, text3, text4, text1X, text2X, text3X, text4X, text1Y, text2Y, text3Y, text4Y, textColor, textSize]);


    const addTextBox = () => {
        if (numberOfTextBoxes < 4) setNumberOfTextBoxes(numberOfTextBoxes + 1)
    }

    const removeTextBox = () => {
        if (numberOfTextBoxes > 1) {
            switch (numberOfTextBoxes) {
                case 1:
                    setText1("")
                    break
                case 2:
                    setText2("")
                    break
                case 3:
                    setText3("")
                    break
                case 4:
                    setText4("")
                    break
                default:
            }
            setNumberOfTextBoxes(numberOfTextBoxes - 1)
        }
    }

    const setText = (boxNumber, content) => {
        switch (boxNumber) {
            case 1:
                setText1(content)
                break
            case 2:
                setText2(content)
                break
            case 3:
                setText3(content)
                break
            case 4:
                setText4(content)
                break
            default:
        }
    }

    const setXForText = (boxNumber, xPos) => {
        switch (boxNumber) {
            case 1:
                setText1X(xPos)
                break
            case 2:
                setText2X(xPos)
                break
            case 3:
                setText3X(xPos)
                break
            case 4:
                setText4X(xPos)
                break
            default:
        }
    }

    const setYForText = (boxNumber, yPos) => {
        switch (boxNumber) {
            case 1:
                setText1Y(yPos)
                break
            case 2:
                setText2Y(yPos)
                break
            case 3:
                setText3Y(yPos)
                break
            case 4:
                setText4Y(yPos)
                break
            default:
        }
    }

    const getXFor = (boxNumber) => {
        switch (boxNumber) {
            case 1:
                return text1X
            case 2:
                return text2X
            case 3:
                return text3X
            case 4:
                return text4X
            default:
        }
    }

    const getYFor = (boxNumber) => {
        switch (boxNumber) {
            case 1:
                return text1Y
            case 2:
                return text2Y
            case 3:
                return text3Y
            case 4:
                return text4Y
            default:
        }
    }

    if (!isAuthenticated) return <div>Please log in.</div>

    return (<>
            <Toolbox setMode={setMode} mode={mode} />
            <div className={styles.outerContainer}>
                <div className={styles.editorContainer}>
                    <div className={styles.splitView}>
                        <div className={styles.splitLeft}>
                            <canvas ref={canvas} width={canvasWidth} height={canvasHeight} className={styles.canvas}/>
                        </div>
                        <div className={styles.splitRight}>
                            <EditorPickFromDesktop setPrivateTemplate={setPrivateTemplate} privateTemplate={privateTemplate} template={template} setTemplate={setTemplate} visible={mode.desktop}/>
                            <div>
                                <h2>Editor</h2>
                                <button onClick={addTextBox}>Add</button>
                                <button onClick={removeTextBox}>Remove</button>
                                <input type="text" onChange={e => setTextColor(e.target.value)}
                                       placeholder="#fff"
                                       value={textColor}/>
                                <input type="number" onChange={e => setTextSize(parseInt(e.target.value))}
                                       placeholder="22" value={textSize}/>
                                {Array.from({length: numberOfTextBoxes}).map((i, index) => <div
                                    className={styles.memeTools} key={index + 1}>
                                    <input type="text" placeholder={`text ${index + 1}`}
                                           onChange={e => setText(index + 1, e.target.value)}/>
                                    <input type="number"
                                           onChange={e => setXForText(index + 1, e.target.value)}
                                           value={getXFor(index + 1)}/>
                                    <input type="number"
                                           onChange={e => setYForText(index + 1, e.target.value)}
                                           value={getYFor(index + 1)}/>
                                    <button onClick={() => {
                                        setXForText(index + 1, canvasWidth / 2)
                                        setYForText(index + 1, canvasHeight / 2)
                                    }}>center
                                    </button>
                                    <button onClick={() => {
                                        setXForText(index + 1, canvasWidth / 2)
                                    }}>center X
                                    </button>
                                    <button onClick={() => {
                                        setYForText(index + 1, canvasHeight / 2)
                                    }}>center Y
                                    </button>
                                </div>)}
                                <div>
                                    <input type="number" placeholder="canvas width" value={canvasWidth}
                                           onChange={e => setCanvasWidth(parseInt(e.target.value))}/>
                                    <input type="number" placeholder="canvas height" value={canvasHeight}
                                           onChange={e => setCanvasHeight(parseInt(e.target.value))}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Editor;