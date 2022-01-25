import React, {useEffect, useState, useRef} from 'react'
import styles from '../Meme/styles.module.css';

function DrawingCanvas() {
    const canvasRef = useRef(null);
    const contextRef = useRef(null);

    const [isDrawing, setIsDrawing] = useState(false);
    const [showInputFields, setShowInputFields] = useState(false);
    const [texts, setTexts] = useState([]);
    const [template, setTemplate] = useState([]);

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
        document.write('<img style="width:600px" src="'+img+'"/>');
        if(img!= null){
            setShowInputFields(true);
        }
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
        <input></input>
        <input></input>
        <button onClick={useDrawingAsMeme} className={styles.use}>Use Drawing as Meme</button>

        </div>
    
        );
}
export default DrawingCanvas;