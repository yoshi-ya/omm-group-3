import styles from "./GallerySingleView.module.css"
import React, {useEffect, useState} from 'react';
import playImg from "./play.png"
import shuffleImg from "./shuffle.png"

const GallerySingleView = ({memesList}) => {
    const defaultMeme = "https://via.placeholder.com/256?text=no%20meme%20found"
    const [currentMeme, setCurrentMeme] = useState(0);
    const [autoPlay, setAutoPlay] = useState(false)

    useEffect(() => {
        toggleVisibility()
        if (autoPlay) {
            const interval = setInterval(() => {
                setCurrentMeme(nextIndex);
            }, 3000);

            return () => clearInterval(interval);
        }
    }, [currentMeme, autoPlay]);

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

    const randomIndex = () => {
        if (memesList.length > 1 && !autoPlay) {
            let memeIndex = Math.floor(Math.random() * memesList.length)
            return currentMeme !== memeIndex ? memeIndex : randomIndex()
        }
        return 1
    }

    const previousIndex = () => {
        return currentMeme === 0 ? memesList.length - 1 : currentMeme - 1
    }

    const nextIndex = () => {
        return currentMeme === memesList.length - 1 ? 0 : currentMeme + 1
    }

    if (memesList.length < 1) {
        return (<div>
            <img src={defaultMeme} alt="meme"/>
        </div>)
    }

    return (<>
        <div className={styles.memeWrapper}>
            <img src={memesList[currentMeme].template} alt="meme"/>
        </div>
        <div className={styles.sliderButtonsWrapper}>
            <div className={styles.sliderButtons}>
                <img className={styles.buttonLeft} src={playImg}
                     onClick={() => setAutoPlay(!autoPlay)} alt="play"/>
                <img id="random" className={styles.buttonRight} src={shuffleImg}
                     onClick={() => setCurrentMeme(randomIndex)} alt="shuffle"/>
            </div>
            <div className={styles.sliderButtons}>
                <div id="previous" className={styles.sliderButtonLeft}
                     onClick={() => setCurrentMeme(previousIndex)}/>
                <div id="next" className={styles.sliderButtonRight}
                     onClick={() => setCurrentMeme(nextIndex)}/>
            </div>
        </div>
    </>);
};

export default GallerySingleView;