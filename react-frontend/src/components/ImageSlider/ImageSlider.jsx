import React, {useState} from 'react';
import imageSlider from './ImageSlider.module.css';
import {Link} from "react-router-dom";
import ShareButtons from '../ShareButtons/ShareButtons'; // Social share icons
import CanvasMeme from '../CanvasMeme/CanvasMeme'; // Actual memes
import {FaArrowAltCircleRight, FaArrowAltCircleLeft} from 'react-icons/fa'; // Arrow icons
import {BsFillTrashFill} from 'react-icons/bs'; // Trash icon
import {RiEditFill} from 'react-icons/ri'; // Edit icon  


const ImageSlider = ({memes, sliderText, sliderButton, deleteMeme, author}) => {

    const [slideIndex, setSlideIndex] = useState(0)
    const [isClicked, setIsClicked] = useState(false) 
    /* With isclicked=true a selected meme should show up enlarged, 
    but it's not working corectly yet as all memes of slider are 
    affected and thus not the right meme is showing up enlarged :( */

    // Go further to next meme
    const nextSlide = () => {
        setSlideIndex(slideIndex !== memes.length - 1 ? slideIndex + 1 : 0)
    }

    // Go to previous meme
    const prevSlide = () => {
        setSlideIndex(slideIndex !== 0 ? slideIndex - 1 : memes.length - 1)
    }

    /* Button in empty sliders with link to gallery/editor */
    function showButton(sliderButton) {
        if (sliderButton === 'Gallery') {
            return <div className={imageSlider.sliderButton}><Link to="/">{sliderButton}</Link></div>
        } else return <div className={imageSlider.sliderButton}><Link to="/editor">{sliderButton}</Link></div>
    }

    /* Show 1-3 memes next to each other */
    if (memes.length > 0 && memes.length <= 3) return (
        <div className={!isClicked ? "" : imageSlider.darkOverlay}>
            <div className={imageSlider.slider}>
                <div className={imageSlider.horizontalContainer}>
                    {memes.map((meme) => {
                        return (
                        <div className={isClicked ? imageSlider.bigPicture : imageSlider.image}
                            key={meme._id} onDoubleClick={() => setIsClicked(!isClicked)}>

                            <CanvasMeme meme={meme}/>
                            {author ? <BsFillTrashFill className={imageSlider.trashIcon} onClick={() => deleteMeme(meme._id)}/> : ""}
                            {author ? <Link to={`/editor/${meme._id}`}><RiEditFill className={imageSlider.editIcon}/></Link> : ""}
                            <div className={imageSlider.shareIcons}><ShareButtons selectedMeme={meme._id}/></div>
                        </div>)
                    })}
                </div>
            </div>
        </div>)


    /* Show 1-3 memes next to each other - with arrows on the right/left to slide to the next/previous image */
    if (memes.length > 3) {
        return (<div className={!isClicked ? "" : imageSlider.darkOverlay}>
                <div className={imageSlider.slider}>
                    {isClicked ? "" :<FaArrowAltCircleLeft className={imageSlider.leftArrow} onClick={prevSlide}/>}
                    {memes.map((meme, i) => {
                        // For slider functionality: determine the indecies of the 3 visible images
                        let firstIndex = slideIndex;
                        let secondIndex = slideIndex + 1;
                        let thirdIndex = slideIndex + 2;

                        // Adjust the indecies near the start/end of the meme
                        if (secondIndex === 0) {
                            firstIndex = memes.length - 1;
                        } else if (thirdIndex === 0) {
                            firstIndex = memes.length - 2;
                            secondIndex = memes.length - 1;
                        } else if (slideIndex === memes.length - 1) {
                            secondIndex = 0;
                            thirdIndex = 1;
                        } else if (secondIndex === memes.length - 1) {
                            thirdIndex = 0;
                        }

                        // Only render the 3 memes that are currently in focus (no need to render all memes of array)
                        if (slideIndex === i) {
                            return (<div className={imageSlider.horizontalContainer} key={i}>
                                    <div className={isClicked ? imageSlider.bigPicture : imageSlider.image}
                                        key={memes[firstIndex]._id}
                                        onDoubleClick={() => setIsClicked(!isClicked)}>

                                        <CanvasMeme meme={memes[firstIndex]}/>
                                        {author && !isClicked ? <BsFillTrashFill className={imageSlider.trashIcon} onClick={() => deleteMeme(memes[firstIndex]._id)}/> : ""}
                                        {author && !isClicked ? <Link to={`/editor/${meme._id}`}><RiEditFill className={imageSlider.editIcon}/></Link> : ""}
                                        <div className={imageSlider.shareIcons}><ShareButtons selectedMeme={memes[firstIndex]._id}/></div>
                                    </div>

                                    <div className={isClicked ? imageSlider.bigPicture : imageSlider.image}
                                        key={memes[secondIndex]._id} onDoubleClick={() => setIsClicked(!isClicked)}>

                                        <CanvasMeme meme={memes[secondIndex]}/>
                                        {author ? <BsFillTrashFill className={imageSlider.trashIcon} onClick={() => deleteMeme(memes[secondIndex]._id)}/> : ""}
                                        {author ? <Link to={`/editor/${meme._id}`}><RiEditFill className={imageSlider.editIcon}/></Link> : ""}
                                        <div className={imageSlider.shareIcons}><ShareButtons selectedMeme={memes[secondIndex]._id}/></div>
                                    </div>

                                    <div
                                        className={isClicked ? imageSlider.bigPicture : imageSlider.image}
                                        key={memes[thirdIndex]._id}
                                        onDoubleClick={() => setIsClicked(!isClicked)}>

                                        <CanvasMeme meme={memes[thirdIndex]}/>
                                        {author ? <BsFillTrashFill className={imageSlider.trashIcon} onClick={() => deleteMeme(memes[thirdIndex]._id)}/> : ""}
                                        {author ? <Link to={`/editor/${meme._id}`}><RiEditFill className={imageSlider.editIcon}/></Link> : ""}
                                        <div className={imageSlider.shareIcons}><ShareButtons selectedMeme={memes[thirdIndex]._id}/></div>
                                    </div>
                                </div>)
                        } else return ""
                    })}
                    {isClicked ? "" : <FaArrowAltCircleRight className={imageSlider.rightArrow} onClick={nextSlide}/>}
                </div>
            </div>)
    }

    // Empty slider
    return (<div className={imageSlider.emptySlider}>
            <div>{sliderText}</div>
            {showButton(sliderButton)}
        </div>)
};

export default ImageSlider;
