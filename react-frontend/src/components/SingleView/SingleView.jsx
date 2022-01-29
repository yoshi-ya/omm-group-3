import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import axios from "axios";
import {encode} from "base64-arraybuffer";

const SingleView = () => {

    let {id} = useParams()

    const [memeData, setMemeData] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:5001/fetchMeme?id=${id}`)
            .then(data => {
                setMemeData(data.data.template.data)
            })
            .catch(error => console.log(error))

    }, [id]);


    return (<div>
        <img src={`data:image/png;base64,${encode(memeData)}`} alt="meme"/>
    </div>);
};

export default SingleView;
