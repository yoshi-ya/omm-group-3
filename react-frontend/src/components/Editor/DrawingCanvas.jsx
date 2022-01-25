import React, {useEffect, useState, useRef} from 'react'
import styles from '../Meme/styles.module.css';
import axios from 'axios';

function DrawingCanvas() {
    const canvasRef = useRef(null);
    const contextRef = useRef(null);

    const [isDrawing, setIsDrawing] = useState(false);
    const [showInputFields, setShowInputFields] = useState(false);
    const [texts, setTexts] = useState(['','']);
    const [template, setTemplate] = useState([]);

    useEffect(() =>{
        console.log(texts);
    }, [texts])

    useEffect(() =>{
        const canvas = canvasRef.current;
        canvas.width = window.innerWidth *2;
        canvas.height = window.innerHeight *2;
        canvas.style.width = `${window.innerWidth}px`;
        canvas.style.height = `${window.innerHeight}px`;

        const context = canvas.getContext("2d");
        context.scale(2,2);
        context.lineCap = "round";
        context.strokeStyle ="black";
        context.lineWidth = 5;
        contextRef.current = context;
    },[])


    /**
     * sends the canvas meme to the backend
     * @param {event}
     */
     const handleNewMeme = () =>{
        const memeURL = localStorage.getItem('MemeCanvasURL');
        const meme = {
            templ: memeURL,
            texts: texts
        }
        axios.post('http://localhost:5001/newMeme',meme).then(res=>{ //send POST-request to /newMeme
            console.log(res.data)
    })
    
    }

    const updateTexts = (e, index) =>{
        const text = e.target.value || '';
        setTexts(
            texts.map((c, i) =>{
                if(index === i){
                    return text
                }else{
                    return c;
                }
            })
        )
    }

    const startDrawing = ({nativeEvent}) => {
        const {offsetX, offsetY} = nativeEvent;

        contextRef.current.beginPath();
        contextRef.current.moveTo(offsetX,offsetY);
        setIsDrawing(true);
    }

    const finishDrawing = () =>{
        contextRef.current.closePath();
        setIsDrawing(false);
    }

    const draw = ({nativeEvent}) =>{
        if(!isDrawing){
            return;
        }
        const {offsetX, offsetY} = nativeEvent;
        contextRef.current.lineTo(offsetX,offsetY);
        contextRef.current.stroke();

    }

    const useDrawingAsMeme = () =>{
        var canvas = document.getElementById("currentCanvas");
        var img = canvas.toDataURL("image/png");
        localStorage.setItem( 'MemeCanvasURL', img ); 
        document.write('<img style="width:600px" src="'+img+'"/>');
        if(img!= null){
            setShowInputFields(true);
        }
        handleNewMeme();
       // var image = new Image();
       // image.src = canvas.toDataURL();
        //console.log(image.src);
    }

    return(
        <div>
        <canvas
            id="currentCanvas"
            onMouseDown={startDrawing}
            onMouseUp={finishDrawing}
            onMouseMove={draw}
            ref={canvasRef}
        />
        {
                texts.map((c, index) => (
                    <input onChange={(e) => updateTexts(e,index)} key={index}/>
                ))
            }
        <button onClick={useDrawingAsMeme} className={styles.use}>Use Drawing as Meme</button>

        </div>
    
        );
}
export default DrawingCanvas;