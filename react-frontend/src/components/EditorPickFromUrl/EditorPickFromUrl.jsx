import React, {useState} from 'react';
import styles from "./EditorPickFromUrl.module.css"


const EditorPickFromUrl = (props) => {

    const [imageURL, setImageURL] = useState("");

    /**
     * checks if picked URL is actually an URL
     * @returns 
     */
    const isValidUrl = () => {
        try {
            let url = new URL(imageURL)
            return (url.protocol === "http:" || url.protocol === "https:")
        } catch {
            return false
        }
    }

    /**
     * adds the picked image URL to the current templates
     */
    const pickFromUrl = () => {
        if (isValidUrl() && props.templates.length < 3) {
            props.setTemplates([...props.templates, {url: imageURL}])
        }
    }

    if (!props.visible) return <></>

    return (<div className={styles.row}>
        <h2>Insert a URL</h2>
        <input className={styles.item} type="url" onChange={(e) => setImageURL(e.target.value)}
               placeholder="https://i.insider.com/5485631e69bedda63303ed51"/>
        <button className={styles.item} onClick={pickFromUrl}>Pick
            IMG
        </button>
    </div>)
}
export default EditorPickFromUrl;