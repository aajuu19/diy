import clsx from "clsx";
import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookMessengerIcon,
  FacebookMessengerShareButton,
  FacebookShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";

export const SocialShareButtons = ({ className }: { className?: string }) => {
  return (
    <div className={clsx("flex gap-2", className)}>
      <FacebookShareButton url={window.location.origin} hashtag="DYI">
        <FacebookIcon round size={24} />
      </FacebookShareButton>
      <FacebookMessengerShareButton appId="DIY" url={window.location.origin}>
        <FacebookMessengerIcon round size={24} />
      </FacebookMessengerShareButton>
      <EmailShareButton url={window.location.origin}>
        <EmailIcon round size={24} />
      </EmailShareButton>
      <WhatsappShareButton url={window.location.origin}>
        <WhatsappIcon round size={24} />
      </WhatsappShareButton>
      <TwitterShareButton url={window.location.origin}>
        <TwitterIcon round size={24} />
      </TwitterShareButton>
    </div>
  );
};
