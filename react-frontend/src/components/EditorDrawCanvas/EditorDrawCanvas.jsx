import React, {useEffect, useState, useRef} from 'react'
import styles from './EditorDrawCanvas.module.css';
import axios from 'axios';

/***
 * handles the Drawing Canvas 
 * Source: https://www.youtube.com/watch?v=FLESHMJ-bI0
 */

function EditorDrawCanvas() {
    const canvasRef = useRef(null);
    const contextRef = useRef(null);

    const [isDrawing, setIsDrawing] = useState(false);
    const [showInputFields, setShowInputFields] = useState(false);
    const [texts, setTexts] = useState(['','']);
    const [template, setTemplate] = useState([]);

    useEffect(() =>{
        console.log(texts);
    }, [texts])

    /**
     * set the neccessary canvas values
     */
    useEffect(() =>{
        const canvas = canvasRef.current;
        canvas.width = 300;
        canvas.height = 300;
        canvas.style.width = `${300}px`;
        canvas.style.height = `${300}px`;

        const context = canvas.getContext("2d");
        context.scale(1,1);
        context.lineCap = "round";
        context.strokeStyle ="black";
        context.lineWidth = 3;
        contextRef.current = context;
    },[])


    /**
     * sends the canvas meme to the backend
     * @param {event}
     */
     const handleNewMeme = () =>{
        const memeURL = localStorage.getItem('MemeCanvasURL');
        const meme = {
            template: memeURL,
            text1: texts[0],
            text2: texts[1]
        }
        axios.post('http://localhost:5001/addMeme',meme).then(res=>{ //send POST-request to /newMeme
            console.log(res.data)
    })
    
    }
    /**
     * updates the meme texts live
     * @param {*} e 
     * @param {*} index 
     */
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
    /**
     * handles when the user starts drawing on the canvas
     * @param {*} param0 
     */
    const startDrawing = ({nativeEvent}) => {
        const {offsetX, offsetY} = nativeEvent;

        contextRef.current.beginPath();
        contextRef.current.moveTo(offsetX,offsetY);
        setIsDrawing(true);
    }
    /**
     * handles when the user finishes drawing on the canvas
     */
    const finishDrawing = () =>{
        contextRef.current.closePath();
        setIsDrawing(false);
    }

    /**
     * handles the drawing
     * @param {*} param0 
     * @returns 
     */
    const draw = ({nativeEvent}) =>{
        if(!isDrawing){
            return;
        }
        const {offsetX, offsetY} = nativeEvent;
        contextRef.current.lineTo(offsetX,offsetY);
        contextRef.current.stroke();

    }

    /**
     * saves the drawing to the local storage and calls
     * the function to send the drawing to the backend
     */
    const useDrawingAsMeme = () =>{
        var canvas = document.getElementById("currentCanvas");
        var img = canvas.toDataURL("image/png");
        localStorage.setItem( 'MemeCanvasURL', img ); 
        document.write('<img style="width:600px" src="'+img+'"/>');
        if(img!= null){
            setShowInputFields(true);
        }
        handleNewMeme();
    }

    return(
        <div>
            {
                texts.map((c, index) => (
                    <input onChange={(e) => updateTexts(e,index)} key={index}/>
                ))
            }
        <button onClick={useDrawingAsMeme} className={styles.use}>Use Drawing as Meme</button>

        <canvas 
            className={styles.drawingCanvas}
            id="currentCanvas"
            onMouseDown={startDrawing}
            onMouseUp={finishDrawing}
            onMouseMove={draw}
            ref={canvasRef}
        />
        
        </div>
    
        );
}
export default EditorDrawCanvas;