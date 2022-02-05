import React, {useEffect, useRef, useState} from 'react';
import axios from 'axios';
import styles from './EditorPickFromDesktop.module.css';
import {useAuth0} from "@auth0/auth0-react";
import {encode} from "base64-arraybuffer";


const EditorPickFromDesktop = () => {
    const [template, setTemplate] = useState({})
    const [numberOfTextBoxes, setNumberOfTextBoxes] = useState(1);
    const {user} = useAuth0()
    const canvas = useRef(null)


    useEffect(() => {
        if (template.image) {
            const templateImage = new Image()
            templateImage.src = `data:image/png;base64,${encode(template.image.data)}`

            templateImage.onload = () => {
                const context = canvas.current.getContext("2d")
                context.fillStyle = "black"
                context.fillRect(0,0,500, 500)
                context.drawImage(templateImage, 75, 75, 350, 350)
            }
        }
    }, [template]);


    const addTextBox = () => {
        if (numberOfTextBoxes < 4) setNumberOfTextBoxes(numberOfTextBoxes + 1)
    }

    const removeTextBox = () => {
        if (numberOfTextBoxes > 1) {
            setNumberOfTextBoxes(numberOfTextBoxes - 1)
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

    return (<div>
        <div className={styles.uploadForm}>
            <h2>Upload your template</h2>
            <form onSubmit={e => uploadTemplate(e)}>
                <input type="file" name="template" accept="image/png, image/jpg, image/jpeg" required/>
                <input type="text" name="name" placeholder="Template Name" required/>
                <input type="submit" value="upload"/>
            </form>
        </div>
        <div className={template.image ? styles.editorActive : styles.editorHidden}>
            <h2>Editor</h2>
            <button onClick={addTextBox}>Add</button>
            <button onClick={removeTextBox}>Remove</button>
            {Array.from({length: numberOfTextBoxes}).map((i, index) => <div key={index + 1}>
                <input type="text" placeholder={`text ${index + 1}`}/>
            </div>)}
            <canvas ref={canvas} width="500" height="500px"/>
        </div>
    </div>)
}
export default EditorPickFromDesktop;