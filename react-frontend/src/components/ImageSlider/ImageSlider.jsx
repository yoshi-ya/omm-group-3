import React, {useEffect, useState} from 'react'
import styles from './ImageSlider.module.css'
import {FaArrowAltCircleRight, FaArrowAltCircleLeft} from 'react-icons/fa'
import {encode} from "base64-arraybuffer";
import axios from "axios";


const ImageSlider = ({user}) => {

    const [slideIndex, setSlideIndex] = useState(0)
    const [memes, setMemes] = useState([])

    useEffect(() => {
        axios
            .get(`http://localhost:5001/allMemes?author=${user.name}`)
            .then(data => setMemes(data.data))
    }, [])

    const nextSlide = () => {
        setSlideIndex(slideIndex !== memes.length ? slideIndex + 1 : 1)
    }

    const prevSlide = () => {
        setSlideIndex(slideIndex !== 1 ? slideIndex - 1 : memes.length)
    }

    const moveDot = index => {
        setSlideIndex(index)
    }

    if (memes.length > 0) return (<div className={styles.slider}>
            <div><FaArrowAltCircleLeft className={styles.leftArrow}/></div>
            <div><FaArrowAltCircleRight className={styles.rightArrow}/></div>

            <div className={styles.sliderInner} key={memes[slideIndex]._id}>

                <div className={styles.slideActive}>
                    <img src={`data:image/png;base64,${encode(memes[slideIndex].template.data)}`} alt="Meme"
                         className={styles.imageSmall}/>
                </div>

                <div className={styles.containerDots}>
                    {Array.from({length: 5}).map((item, index) => (<div
                            className={slideIndex === index + 1 ? styles.dotActive : styles.dot}
                            key={index}>
                        </div>))}
                </div>

            </div>
        </div>)
    return <div>Lets create some Memes!</div>
};

export default ImageSlider;
