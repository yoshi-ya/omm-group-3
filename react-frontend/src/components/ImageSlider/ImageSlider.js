import React, { useState, Fragment } from 'react'
import imageSlider from './imageSlider.module.css'
import { SliderData } from './SliderData'
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from 'react-icons/fa'
import Media from 'react-media';
import {encode} from "base64-arraybuffer";


const ImageSlider = ({slides}) => {

    const [slideIndex, setSlideIndex] = useState(1) 
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

    console.log(slides);

    
    return (

    <div className={imageSlider.slider}>
        
        <div><FaArrowAltCircleLeft className={imageSlider.leftArrow}  onClick={prevSlide} /> </div>
        <div><FaArrowAltCircleRight className={imageSlider.rightArrow} onClick={nextSlide} /></div>

        <div className={imageSlider.sliderInner}>
            {slides.map((obj,index) => {

                // In case the middle img is the first/last one -> adjust the adjacent images 
                let rightIndex = index + 2;
                let leftIndex = index;
                if (slideIndex === 1) {
                    leftIndex = length;
                } 
                if (slideIndex === length) {
                    rightIndex = 1;
                }

                return ( 
                    <div key={obj._id}>
                        <Media queries={{
                        small: "(max-width: 899px)",
                        medium: "(min-width: 900px) and (max-width: 1199px)",
                        large: "(min-width: 1200px)"
                        }}>

                        {matches => (
                            <Fragment>
                                {matches.small && 
                                <div className={slideIndex === index + 1 ? imageSlider.slideActive : imageSlider.slide} >
                                <img src={`data:image/png;base64,${encode(obj.template.data)}`} alt="Meme" className={imageSlider.imageSmall}/> 
                                </div>
                                }

                                {matches.medium && 
                                <div className={imageSlider.slides}>

                                <div className={slideIndex === index + 1 ? imageSlider.slideActive : imageSlider.slide} >
                                    <img src={`data:image/png;base64,${encode(obj.template.data)}`} alt="Meme" className={imageSlider.imageMedium} /> 
                                </div>

                                <div className={slideIndex === index + 1 ? imageSlider.slideActive: imageSlider.slide} >
                                    <img src={`data:image/png;base64,${encode(obj.template.data)}`} alt="Meme" className={imageSlider.imageMiddleMedium} /> 
                                </div>

                                <div className={slideIndex === index + 1 ? imageSlider.slideActive : imageSlider.slide} >
                                    <img src={`data:image/png;base64,${encode(obj.template.data)}`} alt="Meme" className={imageSlider.imageMedium} /> 
                                </div>

                                </div>}


                                {matches.large && 
                                <div className={imageSlider.slides}>

                                <div className={slideIndex === index + 1 ? imageSlider.slideActive : imageSlider.slide} >
                                    <img src={`data:image/png;base64,${encode(obj.template.data)}`} alt="Meme" className={imageSlider.imageLarge} /> 
                                </div>

                                <div className={slideIndex === index + 1 ? imageSlider.slideActive: imageSlider.slide} >
                                    <img src={`data:image/png;base64,${encode(obj.template.data)}`} alt="Meme" className={imageSlider.imageMiddleLarge} /> 
                                </div>

                                <div className={slideIndex === index + 1 ? imageSlider.slideActive : imageSlider.slide} >
                                    <img src={`data:image/png;base64,${encode(obj.template.data)}`} alt="Meme" className={imageSlider.imageLarge} /> 
                                </div>

                                </div>}
                            </Fragment>
                        )}
                        </Media>
                        
                         
                        <div className={imageSlider.containerDots}>
                        {Array.from({length: 5}).map((item, index) => (
                            <div 
                                onClick={() => moveDot(index + 1)}
                                className={slideIndex === index + 1 ? imageSlider.dotActive : imageSlider.dot}>
                            </div>
                        ))}
                        </div>

                    </div>
                    
                )  
            })}

            
        </div>

    </div>
)};

export default ImageSlider;
