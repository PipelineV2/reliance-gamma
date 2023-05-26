import React from "react";
import {
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
} from "react-share";

interface Props {
  title: string;
  url: string;
}

const SocialMediaShare: React.FC<Props> = ({ title, url }) => {
  return (
    <>
      <WhatsappShareButton url={url} title={title} separator=":: ">
        <WhatsappIcon size={25} round />
      </WhatsappShareButton>
      <TwitterShareButton url={url} title={title}>
        <TwitterIcon size={25} round />
      </TwitterShareButton>
    </>
  );
};

export default React.memo(SocialMediaShare);
