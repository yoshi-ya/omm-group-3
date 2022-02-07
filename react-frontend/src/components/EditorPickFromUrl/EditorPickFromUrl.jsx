import React, {useState} from 'react';
import styles from "./EditorPickFromUrl.module.css"


const EditorPickFromUrl = (props) => {

    const [imageURL, setImageURL] = useState("");

    if (!props.visible) return <></>

    return (<div className={styles.row}>
        <h2>Insert a URL</h2>
        <input className={styles.item} type="url" onChange={(e) => setImageURL(e.target.value)}
               placeholder="https://i.insider.com/5485631e69bedda63303ed51"/>
        <button className={styles.item} onClick={() => props.setTemplates([...props.templates, {image: imageURL}])}>Pick
            IMG
        </button>
    </div>)
}
export default EditorPickFromUrl;