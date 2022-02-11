import React, { useState } from 'react';
import shareButtons from './shareButtons.module.css';

// For social share icons
import { 
    FacebookShareButton, FacebookIcon,
    WhatsappShareButton, WhatsappIcon,
    TelegramShareButton, TelegramIcon,
    TwitterShareButton, TwitterIcon,
    RedditShareButton, RedditIcon } from 'react-share';

export const ShareButtons = ( url) => { 

    // For social sharing
    const shareUrl_Facebook = url; 
    const shareUrl_Whatsapp = url;
    const shareUrl_Telegram = url;
    const shareUrl_Twitter = url;
    const shareUrl_Reddit= url; 

    return(
        <div className={shareButtons.container}>
                <FacebookShareButton 
                    url={shareUrl_Facebook} 
                    quote={'Title'}
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

