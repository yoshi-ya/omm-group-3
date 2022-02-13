import React from 'react';
import shareButtons from './ShareButtons.module.css';

// Social share icons
import {
    FacebookShareButton,
    FacebookIcon,
    WhatsappShareButton,
    WhatsappIcon,
    TelegramShareButton,
    TelegramIcon,
    TwitterShareButton,
    TwitterIcon,
    RedditShareButton,
    RedditIcon
} from 'react-share';

export const ShareButtons = (selectedMeme) => {

    // URL of the current meme
    let url = null;

    if (selectedMeme !== null) {
        url = `http://localhost:3000/view/${selectedMeme.selectedMeme}` // no valid URL of
        // course ;) -> just for testing the functionality
    }

    // URLs that want to be shared
    const shareUrl_Facebook = url
    const shareUrl_Whatsapp = url;
    const shareUrl_Telegram = url;
    const shareUrl_Twitter = url;
    const shareUrl_Reddit = url;

    return (<div className={shareButtons.container}>
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
        </div>);
}

export default ShareButtons;
