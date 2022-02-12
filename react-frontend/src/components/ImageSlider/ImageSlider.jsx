import React, {useState} from 'react';
import imageSlider from './ImageSlider.module.css';
import {Link} from "react-router-dom";
import {encode} from "base64-arraybuffer";
import axios from "axios";
import ShareButtons from '../ShareButtons/ShareButtons'; // Social share icons
import CanvasMeme from '../CanvasMeme/CanvasMeme'; // Actual memes
import {FaArrowAltCircleRight, FaArrowAltCircleLeft } from 'react-icons/fa'; // Arrow icons 
import {BsFillTrashFill} from 'react-icons/bs'; // Trash icon
import {RiEditFill} from 'react-icons/ri'; // Edit icon  

const ImageSlider = ({memes, sliderText, sliderButton, deleteMeme, editMeme, author}) => {

    const [slideIndex, setSlideIndex] = useState(0)
    const [isClicked, setIsClicked] = useState(false)
    const [isSelected, setIsSelected] = useState(false)
    const [selectedMeme, setSelectedMeme] = useState(0)

    // Go further to next meme
    const nextSlide = () => {
        setSlideIndex(slideIndex !== memes.length - 1 ? slideIndex + 1 : 0)
    }

    // Go to previous meme
    const prevSlide = () => {
        setSlideIndex(slideIndex !== 0 ? slideIndex - 1 : memes.length - 1)
    }

    /*const moveDot = index => {
        setSlideIndex(index)
    }*/

    /* Button in empty sliders with link to gallery/editor */
    function showButton(sliderButton) {
        if (sliderButton === 'Gallery') {
            return <div className={imageSlider.sliderButton}><Link to="/">{sliderButton}</Link></div>
        } else {
            return <div className={imageSlider.sliderButton}><Link to="/editor">{sliderButton}</Link></div>
        }
    }

    // Select a meme to share it via social media
    const selectMeme = (memeID) => {
        setIsSelected(!isClicked)
        

        /* BAUSTELLE
        
            axios
                .get(`http://localhost:5001/fetchMeme?id=${memeID}`)
                .then(data => {
                    setSelectedMeme(data._id)
                    console.log('data._id: ', data._id)
                })
                .catch(error => console.log(error))

        */
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
                                <div className={imageSlider.image} key={meme._id}>
                                    <CanvasMeme meme={meme} />
                                    { author ? <BsFillTrashFill className={imageSlider.trashIcon} onClick={() => deleteMeme(meme._id)} /> : "" }
                                    { author ? <RiEditFill className={imageSlider.editIcon} onClick={() => editMeme(meme._id)} /> : "" } 
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
            <div className={!isClicked ? "" : imageSlider.darkOverlay }>
                <div className={imageSlider.slider}>
                    <FaArrowAltCircleLeft className={imageSlider.leftArrow} onClick={prevSlide}/>
                    <FaArrowAltCircleRight className={imageSlider.rightArrow} onClick={nextSlide}/>

                    <div className={imageSlider.verticalContainer} >
                        {!isClicked ? <ShareButtons url={"www.memegenerator.de/" + `data:image/png;base64,${encode(selectedMeme)}`} /> : "" } 
                        
                        {memes.map((meme, i) => {
                            console.log('Memes: ', memes)
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

                            // Only render the 3 memes that are currently in focus (no need to render all memes of array)
                            if(slideIndex === i) {
                                return (
                                    <div className={imageSlider.horizontalContainer} key={i}> 

                                        <div className={isClicked ? imageSlider.bigPicture : imageSlider.image} 
                                            key={memes[firstIndex]._id} 
                                            onClick={() => selectMeme(memes[firstIndex].id)}
                                            onDoubleClick={() => setIsClicked(!isClicked)} >

                                            <CanvasMeme meme={memes[firstIndex]} />
                                            { author && !isClicked ? <BsFillTrashFill className={imageSlider.trashIcon} onClick={() => deleteMeme(memes[firstIndex]._id)} /> : "" }
                                            { author && !isClicked ? <RiEditFill className={imageSlider.editIcon} onClick={() => editMeme(memes[firstIndex]._id)} /> : "" } 
                                        </div>
                                        
                                        

                                        <div className={imageSlider.image} key={memes[secondIndex]._id} >
                                            <CanvasMeme meme={memes[secondIndex]} />
                                            { author ? <BsFillTrashFill className={imageSlider.trashIcon} onClick={() => deleteMeme(memes[secondIndex]._id)}/> : "" }
                                            { author ? <RiEditFill className={imageSlider.editIcon} onClick={() => editMeme(memes[secondIndex]._id)} /> : "" } 
                                        </div>

                                        <div className={imageSlider.image} key={memes[thirdIndex]._id} > 
                                            <CanvasMeme meme={memes[thirdIndex]} />
                                            { author ? <BsFillTrashFill className={imageSlider.trashIcon} onClick={() => deleteMeme(memes[thirdIndex]._id)} /> : "" }
                                            { author ? <RiEditFill className={imageSlider.editIcon} onClick={() => editMeme(memes[thirdIndex]._id)} /> : "" } 
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
            </div>
        )
    }

    // Empty slider
    return (
        <div className={imageSlider.emptySlider}>
            <div>{sliderText}</div>
            {showButton(sliderButton)} 
        </div>
    )
};

export default ImageSlider;















