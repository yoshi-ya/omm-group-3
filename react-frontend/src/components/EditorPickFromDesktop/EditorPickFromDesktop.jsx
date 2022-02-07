import React from 'react';
import axios from "axios";
import {useAuth0} from "@auth0/auth0-react";
import {encode} from "base64-arraybuffer";
import styles from "./EditorPickFromDesktop.module.css"



const EditorPickFromDesktop = (props) => {

    const {user} = useAuth0()

    const uploadTemplate = event => {
        event.preventDefault()
        let template = event.target.template.files[0]
        const templateFormData = new FormData()
        templateFormData.append("image", template)
        templateFormData.append("author", user.name)
        templateFormData.append("name", event.target.name.value)
        templateFormData.append("private", props.privateTemplate.toString())

        axios({
            method: "post",
            url: "http://localhost:5001/addTemplate",
            data: templateFormData,
            headers: {"content-type": "multipart/form-data"}
        })
            .then(data => {
                if (props.templates.length < 3) {
                    props.setTemplates([...props.templates, {image: `data:image/png;base64,${encode(data.data.image.data)}`}])
                }
            })
            .catch(error => console.log(error))
    }

    if (!props.visible) return <></>

    return (<>
            <div className={styles.wrapper}>
                <h2>Upload your template</h2>
                <form onSubmit={e => uploadTemplate(e)}>
                    <div className={styles.row}>
                        <input className={styles.item} type="file" name="template"
                               accept="image/png, image/jpg, image/jpeg"
                               required/>
                    </div>
                    <div className={styles.row}>
                        <span className={styles.item}>Template name</span>
                        <input className={styles.item} type="text" name="name" placeholder="name" required/>
                    </div>
                    <div className={styles.row}>
                        <input className={styles.rowItem} type="radio" id="private" name="privacy" value="private"
                               onClick={() => props.setPrivateTemplate(!props.privateTemplate)}
                               checked={props.privateTemplate} readOnly={true}/>
                        <label className={styles.rowItem} htmlFor="private">Private</label>
                    </div>
                    <div className={styles.row}>
                        <input className={styles.submit} type="submit" value="upload"/>
                    </div>
                </form>
            </div>
        </>)
}
export default EditorPickFromDesktop;