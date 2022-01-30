import React, { useState, Fragment } from 'react'
import imageSlider from './imageSlider.module.css'
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from 'react-icons/fa'
import Media from 'react-media';
import {encode} from "base64-arraybuffer";


const ImageSlider = ({slides}) => {

    const [slideIndex, setSlideIndex] = useState(0) 
    const length = slides.length

    const nextSlide = () => {
        setSlideIndex(slideIndex !== length ? slideIndex + 1 : 1)
    }

    const prevSlide = () => {
        setSlideIndex(slideIndex !== 1 ? slideIndex - 1 : length)
    }

    const moveDot = index => {
        setSlideIndex(index)
    }

    console.log(slides[0])
        

    const getLeftIndex = () => {
        let leftIndex = slideIndex;
        if (slideIndex === 1) {
            leftIndex = length;
        } 
        return leftIndex;
    }

    const getRightIndex = () => {
        let rightIndex = slideIndex;
        if (slideIndex === length) {
            rightIndex = 1;
        }
        return rightIndex;
    }

    
    // In case the middle img is the first/last one -> adjust the adjacent images/indecies
    const setIndex = () => {
        let rightIndex = slideIndex + 2;
        let leftIndex = slideIndex;
        if (slideIndex === 1) {
            leftIndex = length;
        } 
        if (slideIndex === length) {
            rightIndex = 1;
        }
    }

    
    return (

    <div className={imageSlider.slider}>
        <div><FaArrowAltCircleLeft className={imageSlider.leftArrow}  onClick={prevSlide} /> </div>
        <div><FaArrowAltCircleRight className={imageSlider.rightArrow} onClick={nextSlide} /></div>

        <div className={imageSlider.sliderInner} key={slides[slideIndex]._id}>
            
            <div className={imageSlider.slideActive} >
                <img src={`data:image/png;base64,${encode(slides[0].template.data)}`} alt="Meme" className={imageSlider.imageSmall}/> 
            </div>
  
            <div className={imageSlider.containerDots}>
            {Array.from({length: 5}).map((item, index) => (
                <div 
                    onClick={() => moveDot(index + 1)}
                    className={slideIndex === index + 1 ? imageSlider.dotActive : imageSlider.dot}
                    kex={index}>
                </div>
            ))}
            </div> 
        
            
        </div>
    </div>
)};

export default ImageSlider;
