import React, {useEffect, useState} from 'react'
import imageSlider from './ImageSlider.module.css'
import {FaArrowAltCircleRight, FaArrowAltCircleLeft} from 'react-icons/fa'
import {encode} from "base64-arraybuffer";
import axios from "axios";
import {Link} from "react-router-dom";
import ShareButtons from '../ShareButtons/ShareButtons'; // For social share icons
import CanvasMeme from '../CanvasMeme/CanvasMeme';

const ImageSlider = ({user, sliderText, sliderButton}) => {

    const [slideIndex, setSlideIndex] = useState(0)
    const [memes, setMemes] = useState([])

    const fetchData = async () => {
        return await axios.get(`http://localhost:5001/allMemes?author=${user}`)
    }

    useEffect(() => {
        fetchData()
        .then(data => {
            console.log(data)
            setMemes(data.data) })
        .catch(error => console.log(error))
        console.log('Memes: ', memes)
        console.log('User: ', user)
    }, [])

    
    // Delete selected meme
    function deleteMeme(memeID) {
        if (memes.length > 0) {
            axios 
                .delete("http://localhost:5001/deleteMeme", {data: {meme: memeID}})
                .then(data => setMemes(data.data))
                .catch(err => console.log(err))
        }
    }

    // Go further to next meme
    const nextSlide = () => {
        setSlideIndex(slideIndex !== memes.length - 1 ? slideIndex + 1 : 0)
    }

    // Go to previous meme
    const prevSlide = () => {
        setSlideIndex(slideIndex !== 0 ? slideIndex - 1 : memes.length - 1)
    }

    const moveDot = index => {
        setSlideIndex(index)
    }

    /* Dynamic button with link to gallery or editor */
    function showButton(sliderButton) {
        if (sliderButton === 'Gallery') {
            return <div className={imageSlider.sliderButton}><Link to="/">{sliderButton}</Link></div>
        } else {
            return <div className={imageSlider.sliderButton}><Link to="/editor">{sliderButton}</Link></div>
        }
    }

    /* Show 1-3 memes next to each other */
    if (memes.length > 0 && memes.length <= 3) 
            return (
                <div className={imageSlider.slider}>
                    <div className={imageSlider.verticalContainer}>

                        <ShareButtons slideIndex={slideIndex}/>
                        <div className={imageSlider.horizontalContainer}>
                            {memes.map((meme, i) => {
                                console.log('Memes: ', memes)
                                return (
                                    <div className={imageSlider.slideActive} key={meme._id}>
                                        <div className={imageSlider.image}>
                                            <CanvasMeme meme={meme} />{/* <div className={imageSlider.imageLarge}>, memes[i]} */} 
                                            <div className={imageSlider.trashIcon} onClick={() => deleteMeme(memes[i]._id)}></div>
                                        </div>
                                    </div>
                                )}
                            )}
                        </div>

                    </div>
                </div>
            )
 
            
    /* Show 1-3 memes next to each other - with arrows on the right/left to slide to the next/previous image */
    if (memes.length > 3) {
        return (
            <div className={imageSlider.slider}>
                <div onClick={prevSlide}><FaArrowAltCircleLeft className={imageSlider.leftArrow}/></div>
                <div onClick={nextSlide}><FaArrowAltCircleRight className={imageSlider.rightArrow}/></div>

                <div className={imageSlider.verticalContainer} >
                    <ShareButtons slideIndex={slideIndex}/>
                    
                    {memes.map((meme, i) => {

                        // For slider functionality: determine the indecies of the 3 visible images
                        let firstIndex = slideIndex;
                        let secondIndex = slideIndex + 1;
                        let thirdIndex = slideIndex + 2;

                        // Adjust the indecies near the start/end of the meme
                        if (secondIndex === 0) {
                            firstIndex = memes.length-1;
                        } else if (thirdIndex === 0) {
                            firstIndex = memes.length-2;
                            secondIndex = memes.length-1;
                        } else if (slideIndex === memes.length-1) {
                            secondIndex = 0;
                            thirdIndex = 1;
                        } else if (secondIndex === memes.length-1) {
                            thirdIndex = 0;
                        }   

                        // Only render 3 memes that are currently in focus (no need to render all memes of array)
                        if(slideIndex === i) {
                            return (
                                <div className={imageSlider.horizontalContainer}>

                                    <div className={imageSlider.image} key={memes[firstIndex]._id}>
                                        <CanvasMeme meme={memes[firstIndex]} />
                                        <div className={imageSlider.trashIcon} onClick={() => deleteMeme(memes[firstIndex]._id)} ></div>
                                    </div>

                                    <div className={imageSlider.image} key={memes[secondIndex]._id}>
                                        <CanvasMeme meme={memes[secondIndex]} />
                                        <div className={imageSlider.trashIcon} onClick={() => deleteMeme(memes[secondIndex]._id)} ></div>
                                    </div>

                                    <div className={imageSlider.image} key={memes[thirdIndex]._id}>
                                        <CanvasMeme meme={memes[thirdIndex]} />
                                        <div className={imageSlider.trashIcon} onClick={() => deleteMeme(memes[thirdIndex]._id)}></div>
                                    </div>

                                </div>
                            )
                        } else return ""
                    })}
                
                    
                    {/* Dots not necessary:
                    <div className={imageSlider.containerDots}>
                        {Array.from({length: 5}).map((item, dotIndex) => ( 
                            <div className={slideIndex === dotIndex ? imageSlider.dotActive : imageSlider.dot} key={dotIndex} onClick={() => moveDot(dotIndex)}></div>
                        ))}
                    </div>
                    */}

                </div>
            </div>
        )
    }

    // Empty slider
    return (
        <div className={imageSlider.emptySlider}>
            <div>Let's {sliderText} some Memes!</div>
            {showButton(sliderButton)} 
        </div>
    )
};

export default ImageSlider;















