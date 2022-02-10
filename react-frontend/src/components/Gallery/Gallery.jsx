import React, {useEffect, useRef, useState} from 'react';
import SingleView from '../GallerySingleView/GallerySingleView'
import Overview from "../Overview/Overview";
import axios from "axios";
import styles from './Gallery.module.css'


const Gallery = () => {
    const [singleViewActive, setSingleViewActive] = useState(false)
    const [allMemes, setAllMemes] = useState([]);
    const memeNumber = useRef(0);
    const [sortBy, setSortBy] = useState('date')
    const [sortOrder, setSortOrder] = useState('asc')

    useEffect(() => {
        fetchData()
            .then(res => {
                setAllMemes(res.data)
            }).catch((error) => {
            error.toString();
        })
    }, [])

    const fetchData = async () => {
        return await axios.get('http://localhost:5001/allMemes?private=false')
    }

    const handleSortChange = (value, order) => {
        setSortBy(value)
        setSortOrder(order)
        if (sortOrder === 'asc') {
            switch (value) {
                case 'date': allMemes.sort((a,b) => (a.date - b.date))
                case 'author': allMemes.sort((a,b) => (a.author.localeCompare(b.author)))
                case 'votes': allMemes.sort((a,b) => (a.votes.length - b.votes.length))
            }} 
        else if (sortOrder === 'desc') {
            switch (value) {
                case 'date': allMemes.sort((a,b) => (b.date - a.date))
                case 'author': allMemes.sort((a,b) => (b.author.localeCompare(a.author)))
                case 'votes': allMemes.sort((a,b) => (b.votes.length - a.votes.length))
            }}
        console.log("Current states", sortBy, sortOrder)
    }


    return <div>
        <div className={styles.container}>
            Sort by:
            <select id="sort" onChange={(e) => handleSortChange(e.target.value, sortOrder)}>
            <option value="date">Creation Date</option>
            <option value="votes">Votes</option>
            <option value="author">Author</option>
            </select>
            <select id="order" onChange={(e) => handleSortChange(sortBy, e.target.value)}>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
            </select>
            Filter:
            <select>
            <option value="filtervotes">Votes</option>
            <option value="format">Format</option>
            <option value="template">Template</option>
            <option value="text">Text</option>
            </select>
        </div>
        {!singleViewActive ?
        <Overview memesList={allMemes} setMemes={setAllMemes} memeNumber={memeNumber} active={setSingleViewActive}/> :
        <SingleView memesList={allMemes} memeNumber={memeNumber}
                    active={setSingleViewActive}/>}</div>
}

export default Gallery;
