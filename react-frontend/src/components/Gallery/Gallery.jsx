import React, {useEffect, useRef, useState} from 'react';
import SingleView from '../GallerySingleView/GallerySingleView'
import Overview from "../Overview/Overview";
import axios from "axios";
import styles from './Gallery.module.css'
import filterimg from './filter.png'
import sortimg from './sort.png'


const Gallery = () => {
    const [singleViewActive, setSingleViewActive] = useState(false)
    const [allMemes, setAllMemes] = useState([]);
    const memeNumber = useRef(0);
    const [sortfilter, setSortFilter] = useState({
        sortvalue: 'date',
        sortorder: 'asc',
        filtervotes: 'none',
    })
    const [showfilterbool, setShowFilterBool] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')

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

    // Handles the Sort Event
    const handleSortChange = (value, order, filtervotes) => {
        // Filter the memes array according to filtervotes(votes number), for that fetchData each time
        switch (filtervotes) {
            case 'none':
                fetchData()
                .then(res => {
                setAllMemes(res.data)
                 }).catch((error) => {
                error.toString();
            })
            break
            case 'least':   
            fetchData()
                .then(res => {
                    let least = res.data.filter(meme => meme.votes.length < 3)
                    setAllMemes(least)
                }).catch((error) => {
                    error.toString();
                    })
                break
            case 'more':    
            fetchData()
                .then(res => {
                    let more = res.data.filter(meme => meme.votes.length >= 3)
                    setAllMemes(more)
                }).catch((error) => {
                    error.toString();
                    })
                break
            case 'most':    
            fetchData()
                .then(res => {
                    let most = res.data.filter(meme => meme.votes.length >= 6)
                    setAllMemes(most)
                }).catch((error) => {
                    error.toString();
                    })
                break
            default: console.log("no filter votes value")
        }

        //Sort the Memes array according to sort values selected
        if (order === 'asc') {
            switch (value) {
                case 'date': allMemes.sort((a,b) => (new Date(a.date) - new Date(b.date)))
                    break
                case 'author': allMemes.sort((a,b) => (a.author.localeCompare(b.author)))
                    break
                case 'votes': allMemes.sort((a,b) => (a.votes.length - b.votes.length))
                    break
                default: console.log("no sort value")
            }} 
        else if (order === 'desc') {
            switch (value) {
                case 'date': allMemes.sort((a,b) => (new Date(b.date) - new Date(a.date)))
                    break
                case 'author': allMemes.sort((a,b) => (b.author.localeCompare(a.author)))
                    break
                case 'votes': allMemes.sort((a,b) => (b.votes.length - a.votes.length))
                    break
                default: console.log("no sort value")
            }}

        // Update the state with current values of sort and filter
        setSortFilter({
            sortvalue: value,
            sortorder: order,
            filtervotes: filtervotes,
            filtercreated: 'none',
        })
    }

    // Filter component that shows when clicking on the filter image button
    const showFilter = () => {
        if(showfilterbool === true) {
        return(
            <div className={styles.filter}>
            Votes:
            <select id="votesfilter" onChange={(e) => handleSortChange(sortfilter.sortvalue, sortfilter.sortorder, e.target.value)}>
            <option value="none">All Vote Numbers</option>
            <option value='least'>Less than 3</option>
            <option value='more'>3 or more</option>
            <option value='most'>6 or more</option>
            </select>
            </div>
        )
        }
    }


    return <div>
        <form className={styles.container}>
            <span className="visually-hidden">Search: </span>
        <input type="text" id="meme-search" placeholder="Name, Author or Text" name="s" onChange={(e) => setSearchTerm(e.target.value)}/>
        </form>
        <div id="sortandfilter" className={styles.container}>
            <img src={sortimg} className={styles.sorticon} alt="filterimg"/>
            <select id="sort" onChange={(e) => handleSortChange(e.target.value, sortfilter.sortorder, sortfilter.filter)}>
            <option value="date">Creation Date</option>
            <option value="votes">Votes</option>
            <option value="author">Author</option>
            </select>
            <select id="order" onChange={(e) => handleSortChange(sortfilter.sortvalue, e.target.value, sortfilter.filter)}>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
            </select>
            <img src={filterimg} className={styles.icons} alt="filterimg" onClick={()=> setShowFilterBool(!showfilterbool)}/>
            {showFilter()}
        </div>
        {!singleViewActive ?
        <Overview memesList={allMemes} setMemes={setAllMemes} memeNumber={memeNumber} active={setSingleViewActive}/> :
        <SingleView memesList={allMemes} memeNumber={memeNumber}
                    active={setSingleViewActive}/>}</div>
}

export default Gallery;
