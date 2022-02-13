import React, {useEffect,useState, useRef} from 'react';
import {Bar} from 'react-chartjs-2';
import styles from "./CanvasMeme.module.css";
import Chart from 'chart.js/auto'
import axios from 'axios';


const CanvasMeme = ({meme}) => {

    const canvasRef = useRef(0)
    const [comments, setComments] = useState([]);
    const [numOfVotes, setNumOfVotes] = useState(0);

    useEffect(() =>{
        if(meme && meme.votes){ setNumOfVotes(meme.votes.length)
            localStorage.setItem('votes', meme.votes.length)
}
            
        else{
            setNumOfVotes(localStorage.getItem('votes'));
        }
    
       
},[])

    useEffect(() => {
        if (meme._id) {
            fetchComments()
                .then(data => {
                    setComments(data.data)
                    console.log(comments);
                })
                .catch(error => console.log(error))
        }
    }, [meme])

    const fetchComments = async () => {
        return await axios.get(`http://localhost:5001/allComments?meme=${meme._id}`)
    }


    useEffect(() => {
        if (meme && meme.templates && meme.templates.length > 0) {
            console.log(meme);
            const context = canvasRef.current.getContext("2d")
            context.fillStyle = "black"
            context.fillRect(0, 0, meme.canvasWidth, meme.canvasHeight)
            for (let i = 0; i < meme.templates.length; i++) {
                const templateImage = new Image()
                templateImage.src = meme.templates[i].url
                templateImage.onload = () => {
                    context.drawImage(templateImage, meme.templates[i].x, meme.templates[i].y, meme.templates[i].width, meme.templates[i].height)
                    if (i === meme.templates.length - 1) {
                        context.font = `${meme.size}px Comic Sans MS`
                        context.fillStyle = meme.color
                        context.textAlign = "center"
                        for (let j = 0; j < meme.texts.length; j++) {
                            context.fillText(meme.texts[j].text, meme.texts[j].x, meme.texts[j].y)
                        }
                    }
                }
            }
        }
    }, [meme]);

    if (!meme) return <div/>

return (
        <div>
        <canvas ref={canvasRef} width={meme.canvasWidth ? meme.canvasWidth : 400} height={meme.canvasHeight ? meme.canvasHeight : 400}
                className={styles.canvas}/>
                
        <div className={styles.smallgraph}> 
        <Bar
            data={{
            labels: ['Votes/Comments'],
            datasets: [
                {
                  id: 1,
                  label: '# of votes',
                  data: [numOfVotes],
                  backgroundColor: 'blue'
                },
                {
                  id: 2,
                  label: '# of comments',
                  data: [comments.length],
                  backgroundColor: 'red'
                },
              ],
              options: {
                responsive: true,
                maintainAspectRatio: false
            }
 }} 
 
       
    
/></div> </div>
                );
                
};

export default CanvasMeme;
