import React, {useEffect, useState} from 'react'
import imageSlider from './ImageSlider.module.css'
import {FaArrowAltCircleRight, FaArrowAltCircleLeft} from 'react-icons/fa'
import {encode} from "base64-arraybuffer";
import axios from "axios";
import {Link} from "react-router-dom";


const ImageSlider = ({user, sliderText, sliderButton}) => {

    const [slideIndex, setSlideIndex] = useState(0)
    const [memes, setMemes] = useState([])

    useEffect(() => {
        axios
            .get(`http://localhost:5001/allMemes?author=${user.name}`)
            .then(data => setMemes(data.data))
            console.log('Memes: ', memes)
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

    /* Show or not show a button inside the slider */
    function showButton(props) {
        if (props) {
            return <div className={imageSlider.sliderButton}><Link to="/gallery">Gallery</Link></div>
        } else {
            return ""
        }
    }


    if (memes.length > 0) 
        return (
            <div className={imageSlider.slider}>
                <div><FaArrowAltCircleLeft className={imageSlider.leftArrow}/></div>
                <div><FaArrowAltCircleRight className={imageSlider.rightArrow}/></div>

                <div className={imageSlider.sliderInner} key={memes[slideIndex]._id}>

                    <div className={imageSlider.slideActive}>
                        <img src={`data:image/png;base64,${encode(memes[slideIndex].template.data)}`} alt="Meme"
                            className={imageSlider.imageSmall}/>
                    </div>

                    <div className={imageSlider.containerDots}>
                        {Array.from({length: 5}).map((item, index) => (<div
                                className={slideIndex === index + 1 ? imageSlider.dotActive : imageSlider.dot}
                                key={index}>
                            </div>))}
                    </div>

                </div>
            </div>
        )
        return (
            <div className={imageSlider.emptySlider}>
                <div>Let's {sliderText} some Memes!</div>
                {showButton(sliderButton)} 
            </div>
        )
};

export default ImageSlider;
