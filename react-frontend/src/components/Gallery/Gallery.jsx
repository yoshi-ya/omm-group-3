import React, {useEffect, useRef, useState} from 'react';
import SingleView from '../GallerySingleView/GallerySingleView'
import Overview from "../Overview/Overview";
import axios from "axios";


const Gallery = () => {
    const [singleViewActive, setSingleViewActive] = useState(false)
    const [allMemes, setAllMemes] = useState([]);
    const memeNumber = useRef(0);

    useEffect(() => {
        fetchData()
            .then(res => {
                setAllMemes(res.data)
            }).catch((error) => {
            error.toString();
        })
    }, [])

    const fetchData = async () => {
        return await axios.get('http://localhost:5001/allMemes')
    }

    return !singleViewActive ?
        <Overview memesList={allMemes} setMemes={setAllMemes} memeNumber={memeNumber} active={setSingleViewActive}/> :
        <SingleView memesList={allMemes} memeNumber={memeNumber}
                    active={setSingleViewActive}/>
}

export default Gallery;
