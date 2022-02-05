import React, {useEffect, useRef, useState} from 'react';
import axios from 'axios';
import styles from './EditorPickFromDesktop.module.css';
import {useAuth0} from "@auth0/auth0-react";
import {encode} from "base64-arraybuffer";


const EditorPickFromDesktop = () => {
    const [template, setTemplate] = useState({})
    const [numberOfTextBoxes, setNumberOfTextBoxes] = useState(1);
    const [canvasWidth, setCanvasWidth] = useState(400)
    const [canvasHeight, setCanvasHeight] = useState(400)
    const [text1, setText1] = useState("")
    const [text2, setText2] = useState("")
    const [text3, setText3] = useState("")
    const [text4, setText4] = useState("")
    const [text1X, setText1X] = useState(canvasWidth/2)
    const [text2X, setText2X] = useState(canvasWidth/2)
    const [text3X, setText3X] = useState(canvasWidth/2)
    const [text4X, setText4X] = useState(canvasWidth/2)
    const [text1Y, setText1Y] = useState(30)
    const [text2Y, setText2Y] = useState(60)
    const [text3Y, setText3Y] = useState(90)
    const [text4Y, setText4Y] = useState(120)

    const canvas = useRef(null)

    const {user} = useAuth0()

    // todo: text font, color, size, background customizable
    // todo: text on top of image -> z-index??
    // todo: upload multiple images inside canvas -> resize images
    useEffect(() => {
        setText1X(text1X)
        setText2X(text2X)
        setText3X(text3X)
        setText4X(text4X)
        setText1Y(text1Y)
        setText2Y(text2Y)
        setText3Y(text3Y)
        setText4Y(text4Y)
    }, [text1Y, text2Y, text3Y, text4Y])

    useEffect(() => {
        setText1(text1)
        setText2(text2)
        setText3(text3)
        setText4(text4)
    }, [text1, text2, text3, text4])

    useEffect(() => {
        const context = canvas.current.getContext("2d")
        context.fillStyle = "black"
        context.fillRect(0, 0, canvasWidth, canvasHeight)
        if (template.image) {
            const templateImage = new Image()
            templateImage.src = `data:image/png;base64,${encode(template.image.data)}`
            templateImage.onload = () => {
                context.drawImage(templateImage, 50, 50, 300, 300)
            }
        }
        context.font = "24px Comic Sans MS"
        context.fillStyle = "white"
        context.textAlign = "center"
        context.fillText(text1, text1X, text1Y)
        context.fillText(text2, text2X, text2Y)
        context.fillText(text3, text3X, text3Y)
        context.fillText(text4, text4X, text4Y)
    }, [template, canvas, canvasWidth, canvasHeight, text1, text2, text3, text4, text1X, text2X, text3X, text4X, text1Y, text2Y, text3Y, text4Y]);


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
        }
    }

    const uploadTemplate = event => {
        event.preventDefault()
        let template = event.target.template.files[0]
        const templateFormData = new FormData()
        templateFormData.append("image", template)
        templateFormData.append("author", user.name)
        templateFormData.append("name", event.target.name.value)

        axios({
            method: "post",
            url: "http://localhost:5001/addTemplate",
            data: templateFormData,
            headers: {"content-type": "multipart/form-data"}
        })
            .then(data => {
                setTemplate(data.data)
            })
            .catch(error => console.log(error))
    }

    return (<div className={styles.splitView}>
        <div className={styles.splitLeft}>
                <canvas ref={canvas} width={canvasWidth} height={canvasHeight}/>
        </div>
        <div className={styles.splitRight}>
            <div className={styles.uploadForm}>
                <h2>Upload your template</h2>
                <form onSubmit={e => uploadTemplate(e)}>
                    <input type="file" name="template" accept="image/png, image/jpg, image/jpeg" required/>
                    <input type="text" name="name" placeholder="Template Name" required/>
                    <input type="submit" value="upload"/>
                </form>
            </div>
            <div className={styles.editor}>
                <h2>Editor</h2>
                <button onClick={addTextBox}>Add</button>
                <button onClick={removeTextBox}>Remove</button>
                {Array.from({length: numberOfTextBoxes}).map((i, index) => <div className={styles.memeTools} key={index + 1}>
                    <input type="text" placeholder={`text ${index + 1}`} onChange={e => setText(index+1, e.target.value)}/>
                    <input type="number" onChange={e => setXForText(index+1, e.target.value)} value={getXFor(index+1)}/>
                    <input type="number" onChange={e => setYForText(index+1, e.target.value)} value={getYFor(index+1)}/>
                    <button onClick={() => {
                        setXForText(index+1, canvasWidth/2)
                        setYForText(index+1, canvasHeight/2)
                    }}>center</button>
                    <button onClick={() => {
                        setXForText(index+1, canvasWidth/2)
                    }}>center X</button>
                    <button onClick={() => {
                        setYForText(index+1, canvasHeight/2)
                    }}>center Y</button>
                </div>)}
                <div>
                    <input type="number" placeholder="canvas width" value={canvasWidth} onChange={e => setCanvasWidth(parseInt(e.target.value))}/>
                    <input type="number" placeholder="canvas height" value={canvasHeight} onChange={e => setCanvasHeight(parseInt(e.target.value))}/>
                </div>
            </div>
        </div>
    </div>)
}
export default EditorPickFromDesktop;