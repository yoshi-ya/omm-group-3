import React, {useEffect, useRef, useState} from 'react';
import SingleView from '../GallerySingleView/GallerySingleView'
import Overview from "../Overview/Overview";
import Graphs from "../Graphs/Graphs";
import axios from "axios";
import styles from './Gallery.module.css'
import filterimg from './filter.png'
import sortimg from './sort.png'

/**
 * Gallery component that includes the Search/Sorting/Filter feature, Overview and Singleview
 * @returns Search/Sorting/Filter container, Overview or SingleView
 */
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

    useEffect(() => {
        fetchData()
            .then(res => {
                setAllMemes(res.data)
            }).catch((error) => {
            error.toString();
        })
    }, [])

    /**
     * Fetches all Memes
     * @returns all Memes
     */
    const fetchData = async () => {
        return await axios.get('http://localhost:5001/allMemes?private=false')
    }

    /**
     * Fetches all Memes and reassigns them
     */
    const fetchMemes = () => {
        fetchData()
            .then(res => {
                setAllMemes(res.data)
            }).catch((error) => {
            error.toString();
        })
    }

    /**
     * Event handler for selection of Sort/Filter options
     * @param {string} value
     * @param {string} order
     * @param {string} filtervotes
     */
    const handleSortChange = (value, order, filtervotes) => {

        /**
         * Fetches all memes and filters according to filtervote selection
         */
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

        /**
         * Sort the memes according to the sort values(date, author, votes) and the order ascending/descending
         */
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

        /**
         * Set sortfilter state with new values of sort and filter
         */
        setSortFilter({
            sortvalue: value,
            sortorder: order,
            filtervotes: filtervotes,
        })
    }

    /**
     * Takes input term and searches term inside the of all memes
     * @param {string} term
     */
    function search(term) {
        let searched = allMemes.filter( (meme) => {
            for(let i = 0; i < meme.texts.length; i++ ) {
                if(meme.texts[i].text.toLowerCase().includes(term.toLowerCase())) {
                    return meme
                }
            }
            if(meme.author.toLowerCase().includes(term.toLowerCase()) || meme.name.toLowerCase().includes(term.toLowerCase())){
                return meme
            }
        })
        setAllMemes(searched)
    }

    /**
     * Shows the filter component
     * @returns filter component
     */
    const showFilter = () => {
        if(showfilterbool === true) {
        return(
            <div className={styles.filter}>
                <span>Votes:</span>
                <select id="votesfilter" onChange={(e) => handleSortChange(sortfilter.sortvalue, sortfilter.sortorder, e.target.value)}>
                    <option value="none">All Vote Numbers</option>
                    <option value='least' placeholder='least'>Less than 3</option>
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
        <input type="text" id="meme-search" placeholder="Name, Author or Text" name="s" onChange={(e) => search(e.target.value)}/>
        <button onClick={() => fetchMemes()}>Clear Search</button>
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
        {!singleViewActive ? (
        <>
        <Graphs memesList={allMemes} setMemes={setAllMemes} memeNumber={memeNumber}/>
        <Overview memesList={allMemes} setMemes={setAllMemes} memeNumber={memeNumber} active={setSingleViewActive}/> </>)
         : <SingleView memesList={allMemes} memeNumber={memeNumber}
                    active={setSingleViewActive}/>}</div>
}

export default Gallery;
