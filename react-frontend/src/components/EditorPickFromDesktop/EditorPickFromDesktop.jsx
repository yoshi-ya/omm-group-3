import React from 'react';
import axios from "axios";
import {useAuth0} from "@auth0/auth0-react";
import {encode} from "base64-arraybuffer";



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
                props.setTemplate({image: `data:image/png;base64,${encode(data.data.image.data)}`})
            })
            .catch(error => console.log(error))
    }

    if (!props.visible) return <></>

    return (<>
            <div>
                <h2>Upload your template</h2>
                <form onSubmit={e => uploadTemplate(e)}>
                    <input type="file" name="template"
                           accept="image/png, image/jpg, image/jpeg"
                           required/>
                    <input type="text" name="name" placeholder="Template Name" required/>
                    <input type="radio" id="private" name="privacy" value="private"
                           onClick={() => props.setPrivateTemplate(!props.privateTemplate)}
                           checked={props.privateTemplate} readOnly={true}/>
                    <label htmlFor="private">Private</label>
                    <input type="submit" value="upload"/>
                </form>
            </div>
        </>)
}
export default EditorPickFromDesktop;