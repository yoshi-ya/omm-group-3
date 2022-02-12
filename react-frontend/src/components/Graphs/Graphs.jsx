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

        

const Graphs = (props) => {

    const [comments, setComments] = useState([])
    const [memes, setMemes] = useState([]);
    const [numOfComments, setNumOfComments] = useState([])
    const memeNames = props.memesList.map(meme => meme.name);
    const votes = props.memesList.map(meme => meme.votes);
    const numOfVotes = votes.map(votes => votes.length);
    const userComments = comments.map(comments => comments.author)
    const memeIds = props.memesList.map(meme => meme._id);
    const memeComments = [];
    console.log(memeIds)


    useEffect(() => {
            fetchComments()
                .then(data => {
                    setComments(data.data)
                    setMemes(props.memesList)
                })
                .catch(error => console.log(error))
    }, [props.visible])

    const fetchComments = async () => {
        return await axios.get(`http://localhost:5001/allCommentsFromAll`)
    }
    

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
                  backgroundColor: 'blue'
                },
                {
                  id: 2,
                  label: '# of comments',
                  data: [3, 2, 0, 1, 2, 1, 0, 0, 2],
                  backgroundColor: 'red'
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