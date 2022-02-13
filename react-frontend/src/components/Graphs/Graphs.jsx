import React, {useEffect, useRef, useState} from 'react';
import {Line} from 'react-chartjs-2';
import axios from 'axios';
import {useAuth0} from "@auth0/auth0-react";
import styles from "./Graphs.module.css";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    } from 'chart.js';


ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend
        );

/**
 * Draws the main Graph
 * Library: https://www.chartjs.org/docs/latest/
 * @param {*} props
 * @returns
 */

const Graphs = (props) => {

    const [comments, setComments] = useState([])
    const [memes, setMemes] = useState([]);
    const [numOfComments, setNumOfComments] = useState([])
    const [memeIDs, setMemeIDs] = useState([]);
    const memeNames = props.memesList.map(meme => meme.name);
    const votes = props.memesList.map(meme => meme.votes);
    const numOfVotes = votes.map(votes => votes.length);


    useEffect(() =>{
        if(props && props.memesList && memeIDs === []){
        setMemeIDs(props.memesList.map(meme => meme._id))
        }
    }
    ,[])
    
    /**
     * fetch the current comments from all memes on component load
     */
    useEffect(() => {
            fetchComments()
                .then(data => {
                    setComments(data.data)
                    setMemes(props.memesList)
                })
                .catch(error => console.log(error))
    }, [props.visible])

    /**
     * fetches all comments from the backend
     * @returns the current comments
     */
    const fetchComments = async () => {
        return await axios.get(`http://localhost:5001/allCommentsFromAll`)
    }
    /**
     * creates an array that holds the amount of comments for every meme
     */
    const readCommentsForMeme = () =>{
        console.log(memes)
        if(memes !== []){
        for(let i = 0; i< memes.length; i++){
            numOfComments.push(comments.filter(comment => comment.meme === memes[i]._id).length)
        }}
    }
    readCommentsForMeme();


/**
 * draw the graph with current votes of every meme and the comments
 */
return(
    <div className={styles.graph}>
        <Line
            datasetIdKey='id'

            data={{
            labels: memeNames,
            datasets: [
                {
                  id: 1,
                  label: '# of votes',
                  data: numOfVotes,
                  backgroundColor: '#ff4f84'
                },
                {
                  id: 2,
                  label: '# of comments',
                  data: numOfComments,
                  backgroundColor: '#844fff'
                },
              ],
              options: {
                responsive: true,
                maintainAspectRatio: false
            }
 }}



/></div>
    )
}
export default Graphs;
