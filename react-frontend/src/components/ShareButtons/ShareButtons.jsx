import React, { useState } from 'react';
import shareButtons from './shareButtons.module.css';
import {encode} from "base64-arraybuffer";

// Social share icons
import { 
    FacebookShareButton, FacebookIcon,
    WhatsappShareButton, WhatsappIcon,
    TelegramShareButton, TelegramIcon,
    TwitterShareButton, TwitterIcon,
    RedditShareButton, RedditIcon } from 'react-share';


export const ShareButtons = (selectedMeme) => { 

    // URL of the current meme
    //const url = "www.memegenerator.de/" + slideIndex._id;
    var url = null;
    console.log(selectedMeme)
    if(selectedMeme !== null) {
        url=`data:image/png;base64,${encode('620423a65df0ed68696ce3b9')}`/* www.memegenerator.de/ */
        console.log(url)
    }

    // For social sharing
    const shareUrl_Facebook = url /* !== null ? url : 'www.memegenerator.de'; */
    const shareUrl_Whatsapp = url;
    const shareUrl_Telegram = url;
    const shareUrl_Twitter = url;
    const shareUrl_Reddit= url; 

    return(
        <div className={shareButtons.container}>
                <FacebookShareButton 
                    url={shareUrl_Facebook} 
                    quote={'My created meme'} /* entfernen ? */
                >
                <FacebookIcon className={shareButtons.icon}/>
                </FacebookShareButton>

                <WhatsappShareButton 
                    url={shareUrl_Whatsapp} 
                    quote={'Title'}
                >
                <WhatsappIcon className={shareButtons.icon}/> 
                </WhatsappShareButton>

                <TelegramShareButton 
                    url={shareUrl_Telegram} 
                    quote={'Title'}
                >
                <TelegramIcon className={shareButtons.icon}/>
                </TelegramShareButton>

                <TwitterShareButton 
                    url={shareUrl_Twitter}
                    quote={'Title'}
                >
                <TwitterIcon className={shareButtons.icon}/>
                </TwitterShareButton>

                <RedditShareButton 
                    url={shareUrl_Reddit} 
                    quote={'Title'}
                >
                <RedditIcon className={shareButtons.icon}/>
                </RedditShareButton>
        </div>
    );
}

export default ShareButtons;

