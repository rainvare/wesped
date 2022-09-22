import {
     TwitterShareButton, LinkedinShareButton, WhatsappShareButton, LinkedinIcon, TwitterIcon, WhatsappIcon
  } from "react-share";
  import {ContainerShareStyle} from './ShareStyle'

export default function Share({showShare}) {
    
    const shareUrl = "http://wesped-frontend.s3-website.us-east-2.amazonaws.com/"


  return (
    <ContainerShareStyle showShare={showShare}>
        <TwitterShareButton url={shareUrl}>
            <TwitterIcon size ={40} round={true}/>
        </TwitterShareButton>
        <LinkedinShareButton url={shareUrl}>
            <LinkedinIcon size ={40} round={true}/>
        </LinkedinShareButton>
        <WhatsappShareButton url={shareUrl}>
            <WhatsappIcon size ={40} round={true}/>
        </WhatsappShareButton>
        
    </ContainerShareStyle>
  )
}
