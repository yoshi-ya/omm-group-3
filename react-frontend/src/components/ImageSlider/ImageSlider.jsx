import React, {useEffect, useState} from 'react'
import imageSlider from './ImageSlider.module.css'
import {FaArrowAltCircleRight, FaArrowAltCircleLeft} from 'react-icons/fa'
import {encode} from "base64-arraybuffer";
import axios from "axios";
import {Link} from "react-router-dom";
import ShareButtons from '../ShareButtons/ShareButtons'; // For social share icons

const ImageSlider = ({user, sliderText, sliderButton}) => {

    const [slideIndex, setSlideIndex] = useState(0)
    const [memes, setMemes] = useState([])

    const fetchData = async () => {
        return await axios.get(`http://localhost:5001/allMemes?author=${user}`)
    }

    useEffect(() => { 
        axios
            .get({fetchData})
            .then(data => setMemes(data.data)) // wo kommt das data her - aus dem fetch?
            .catch(error => console.log(error))

            console.log('Memes: ', memes)
            console.log('User: ', user)
    }) 

    

    // Delete meme
    function deleteMeme(memeID) {
        if (memes.length > 0) {
            /*await axios 
                .post("http://localhost:5001/deleteMeme", {id: memeID})
                .get(fetchdata)
                .then(data => setMemes(data.data))
                .catch(err => console.log(err))
            console.log('Delete Meme: ', memeID)*/
            console.log('Clicked Delete')
        }
    }

    // Delete meme (Function or const better?)
    const deleteSelectedMeme = async (memeID) => {
        /*await fetch(`http://localhost:5001/allMemes?author=${user}`, {
            method: 'DELETE'
        })

        setMemes(memes.filter((meme) => meme._id !== memeID))*/
        console.log('Clicked Delete')
    }

    const nextSlide = () => {
        setSlideIndex(slideIndex !== memes.length ? slideIndex + 1 : 0)
    }

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
                    <div className={imageSlider.sliderInner}>
                        <ShareButtons slideIndex={slideIndex}/>

                        {memes.map((meme, i) => {
                        return (
                            <div className={imageSlider.slideActive} key={memes[slideIndex]._id}>
                                <img src={`data:image/png;base64,${encode(memes[slideIndex].template.data)}`} alt="Meme" className={imageSlider.imageLarge}/>
                                <div className={imageSlider.trashIcon} onClick={() => deleteSelectedMeme(memes[slideIndex]._id)}></div>
                            </div>)
                        }
                    )}

                    </div>
                </div>
            )

    // Slider functionality: determine the indecies of the visible images
    if (memes.length > 3) {
        let rightIndex = slideIndex + 1;
        let leftIndex = slideIndex -1 ;
        if (slideIndex === 0) {
            leftIndex = memes.length - 1;
        } 
        if (slideIndex === memes.length - 1) {
            rightIndex = 0;
        }   
        
        /* Show 1-3 memes next to each other - with arrows on the right/left to slide to the next/previous image */
        return (
            <div className={imageSlider.slider}>
                <div onClick={prevSlide}><FaArrowAltCircleLeft className={imageSlider.leftArrow}/></div>
                <div onClick={nextSlide}><FaArrowAltCircleRight className={imageSlider.rightArrow}/></div>

                <div className={imageSlider.sliderInner} key={memes[slideIndex]._id}>
                    <ShareButtons slideIndex={slideIndex}/>
                    
                    <div className={imageSlider.slides}>
                        <div className={imageSlider.slideActive}>
                            <div className={imageSlider.image}>
                                <img src={`data:image/png;base64,${encode(memes[leftIndex].template.data)}`} alt="Meme"
                                    className={imageSlider.imageLarge} />
                                <div className={imageSlider.trashIcon} onClick={() => deleteSelectedMeme(memes[slideIndex]._id)}></div>
                            </div>
                            
                        </div>

                        <div className={imageSlider.slideActive}>
                            <div className={imageSlider.image}>
                                <img src={`data:image/png;base64,${encode(memes[slideIndex].template.data)}`} alt="Meme"
                                    className={imageSlider.imageLarge}/>
                                <div className={imageSlider.trashIcon} onClick={() => deleteSelectedMeme(memes[slideIndex]._id)}></div>
                            </div>
                        </div>

                        <div className={imageSlider.slideActive}>
                            <div className={imageSlider.image}>
                                <img src={`data:image/png;base64,${encode(memes[rightIndex].template.data)}`} alt="Meme"
                                    className={imageSlider.imageLarge}/>
                                <div className={imageSlider.trashIcon} onClick={() => deleteSelectedMeme(memes[slideIndex]._id)}></div>
                            </div>
                        </div>
                    </div>

                    <div className={imageSlider.containerDots}>
                        {Array.from({length: memes.length}).map((item, dotIndex) => ( // or length: 5 but then -> bugs
                            <div className={slideIndex === dotIndex ? imageSlider.dotActive : imageSlider.dot} key={dotIndex} onClick={() => moveDot(dotIndex)}></div>
                            ))}
                    </div>

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















