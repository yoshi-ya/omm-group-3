import React, {useState} from 'react';


const EditorPickFromUrl = (props) => {

    const [imageURL, setImageURL] = useState("");

    if (!props.visible) return <></>

    return (<div>
            <input type="url" onChange={(e) => setImageURL(e.target.value)}
                   placeholder="https://i.insider.com/5485631e69bedda63303ed51"/>
            <button onClick={() => props.setTemplates([...props.templates, {image: imageURL}])}>Pick IMG</button>
        </div>)
}
export default EditorPickFromUrl;