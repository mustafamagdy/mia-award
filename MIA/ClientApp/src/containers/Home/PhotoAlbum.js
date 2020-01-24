import React from "react";
import { Trans } from "@lingui/macro";

const PhotoAlbum = props => {
  
  const nextItem = () => {};
  const prevItem = () => {};

  return (
    <div id="videos_photo">
      <div className="container">
        <div className="big_show">
          <div className="imgthumb">
            <a href="/">
              <img src="/assets/images/video_image.png" />
            </a>
          </div>
        </div>
        <div className="videos_slider">
          <div className="title">
            <Trans id="latest_video">latest videos & photos</Trans>
          </div>
          <div className="desc">
            <Trans id="videos_desc">
              brief about the DRAMA award and how to apply for it text Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley
              of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged.
            </Trans>
          </div>
          <div className="slider_media">
            <div className="item">
              <span>
                <i>Dubai</i> Opera
              </span>
              <div className="imgthumb">
                <img src="/assets/images/video_image.png" />
              </div>
            </div>
            <div className="item current">
              <span>
                <i>Dubai</i> Opera
              </span>
              <div className="imgthumb">
                <img src="/assets/images/video_image2.png" />
              </div>
            </div>
            <div className="slide_nav">
              <button type="button" className="arrow_prev" onClick={prevItem}>
                <i className="icofont-simple-left"></i>
              </button>
              <button type="button" className="arrow_next" onClick={nextItem}>
                <i className="icofont-simple-right"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PhotoAlbum;
