import React, {useEffect, useState} from 'react'
import imageSlider from './ImageSlider.module.css'
import {FaArrowAltCircleRight, FaArrowAltCircleLeft} from 'react-icons/fa'
import {encode} from "base64-arraybuffer";


const ImageSlider = ({slides}) => {

    const [slideIndex, setSlideIndex] = useState(0)

    // const nextSlide = () => {
    //     setSlideIndex(slideIndex !== slides. ? slideIndex + 1 : 1)
    // }
    //
    // const prevSlide = () => {
    //     setSlideIndex(slideIndex !== 1 ? slideIndex - 1 : length)
    // }
    //
    // const moveDot = index => {
    //     setSlideIndex(index)
    // }
    //
    // const getLeftIndex = () => {
    //     let leftIndex = slideIndex;
    //     if (slideIndex === 1) {
    //         leftIndex = length;
    //     }
    //     return leftIndex;
    // }
    //
    // const getRightIndex = () => {
    //     let rightIndex = slideIndex;
    //     if (slideIndex === length) {
    //         rightIndex = 1;
    //     }
    //     return rightIndex;
    // }

    return (

        <div className={imageSlider.slider}>
            <div><FaArrowAltCircleLeft className={imageSlider.leftArrow}  /> </div>
            <div><FaArrowAltCircleRight className={imageSlider.rightArrow} /></div>

            <div className={imageSlider.sliderInner} key={slides[slideIndex]._id}>

                <div className={imageSlider.slideActive} >
                    <img src={`data:image/png;base64,${encode(slides[0].template.data)}`} alt="Meme" className={imageSlider.imageSmall}/>
                </div>

                <div className={imageSlider.containerDots}>
                {Array.from({length: 5}).map((item, index) => (
                    <div
                        className={slideIndex === index + 1 ? imageSlider.dotActive : imageSlider.dot}
                        key={index}>
                    </div>
                ))}
                </div>


            </div>
        </div>
    )
};

export default ImageSlider;
