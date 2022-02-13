import styles from "./GallerySingleView.module.css"
import React, {useEffect, useState} from 'react';
import playImg from "./play.png"
import shuffleImg from "./shuffle.png"
import CanvasMeme from "../CanvasMeme/CanvasMeme";
import Chart from 'chart.js/auto'
import axios from 'axios';
import {Bar} from 'react-chartjs-2';

const GallerySingleView = (props) => {
    const defaultMeme = "https://via.placeholder.com/256?text=no%20meme%20found"
    const [currentMemeIndex, setCurrentMemeIndex] = useState(0);
    const [current, setCurrent] = useState({});
    const [autoPlay, setAutoPlay] = useState(false);
    const [comments, setComments] = useState([]);
    const [numOfVotes, setNumOfVotes] = useState(0);

    useEffect(() => {
        setCurrentMemeIndex(props.memeNumber.current)
    }, [])

    useEffect(() => {
        console.log("2")
        setCurrent(props.memesList[currentMemeIndex])
    }, [currentMemeIndex])

    useEffect(() => {
        if (props.memesList[currentMemeIndex]._id) {
            fetchComments()
                .then(data => {
                    setComments(data.data)
                    console.log(comments);
                })
                .catch(error => console.log(error))
        }
    }, [props.memesList[currentMemeIndex]])

    const fetchComments = async () => {
        return await axios.get(`http://localhost:5001/allComments?meme=${props.memesList[currentMemeIndex]._id}`)
    }

    useEffect(() => {
        toggleVisibility()
        if (autoPlay) {
            const interval = setInterval(() => {
                setCurrentMemeIndex(nextIndex())
            }, 3000);
            return () => clearInterval(interval);
        }
    }, [currentMemeIndex, autoPlay]);

    const toggleVisibility = () => {
        let elements = [
            document.getElementById("next"),
            document.getElementById("previous"),
            document.getElementById("random")
        ]

        for (let element of elements) {
            element.style.display = autoPlay ? "none" : "block"
        }
    }

    useEffect(() =>{
        if(props.memesList[currentMemeIndex] && props.memesList[currentMemeIndex].votes){ setNumOfVotes(props.memesList[currentMemeIndex].votes.length)
        } 
       },[])

    useEffect(() =>{
        if (numOfVotes === 0 && props.memesList[currentMemeIndex].votes){
            setNumOfVotes(props.memesList[currentMemeIndex].votes.length)
        }
    })

    const randomIndex = () => {
        if (props.memesList.length > 1 && !autoPlay) {
            let memeIndex = Math.floor(Math.random() * props.memesList.length)
            return currentMemeIndex !== memeIndex ? memeIndex : randomIndex()
        }
        return 1
    }

    const previousIndex = () => {
        return currentMemeIndex === 0 ? props.memesList.length - 1 : currentMemeIndex - 1
    }

    const nextIndex = () => {
        return currentMemeIndex === props.memesList.length - 1 ? 0 : currentMemeIndex + 1
    }

    if (props.memesList.length < 1) {
        return (<div>
            <img src={defaultMeme} alt="meme"/>
        </div>)
    }

    return (<>
        <div className={styles.wrapper}>
            <div className={styles.memeWrapper}>
                <div className={styles.closeView} onClick={() => {
                    props.active(false)
                }}/>
                <div className={styles.meme}>
                    <CanvasMeme meme={current}/>
                </div>
                <div className={styles.sliderButtonsWrapper}>
                    <div className={styles.sliderButtons}>
                        <img className={styles.buttonLeft} src={playImg}
                             onClick={() => setAutoPlay(!autoPlay)} alt="play"/>
                        <img id="random" className={styles.buttonRight} src={shuffleImg}
                             onClick={() => setCurrentMemeIndex(randomIndex)} alt="shuffle"/>
                    </div>
                    <div className={styles.sliderButtons}>
                        <div id="previous" className={styles.sliderButtonLeft}
                             onClick={() => setCurrentMemeIndex(previousIndex)}/>
                        <div id="next" className={styles.sliderButtonRight}
                             onClick={() => {
                                 console.log("1")
                                 setCurrentMemeIndex(nextIndex)
                             }}/>
                    </div>
                </div>

                <Bar
            data={{
            labels: ['Votes/Comments'],
            datasets: [
                {
                  id: 1,
                  label: '# of votes',
                  data: [numOfVotes],
                  backgroundColor: '#ff4f84'
                },
                {
                  id: 2,
                  label: '# of comments',
                  data: [comments.length],
                  backgroundColor: '#844fff'
                },
              ],
              options: {
                responsive: true,
                maintainAspectRatio: false
            }
 }} /></div>
            </div>
    </>);
};

export default GallerySingleView;
