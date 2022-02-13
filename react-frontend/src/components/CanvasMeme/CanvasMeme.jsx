import React, {useEffect, useRef} from 'react';
import styles from "./CanvasMeme.module.css";


const CanvasMeme = ({meme}) => {
    const canvasRef = useRef(0)

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
                        context.font = `${meme.size}px Impact`
                        context.shadowColor = "#000"
                        context.shadowOffsetX = 2
                        context.shadowOffsetY = 2
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

    return (<div>
            <canvas ref={canvasRef} width={meme.canvasWidth ? meme.canvasWidth : 400}
                    height={meme.canvasHeight ? meme.canvasHeight : 400}
                    className={styles.canvas}/>
        </div>);

};

export default CanvasMeme;
