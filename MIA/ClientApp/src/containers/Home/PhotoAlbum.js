import React, { useEffect, useState } from "react";
import { Trans } from "@lingui/macro";
import classNames from "classnames";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import homeActions from "store/home/actions";
import { LanguageContext } from "containers/Providers/LanguageProvider";
import "utils";

const PhotoAlbum = ({ fetchMainAlbum, albumContents, ...props }) => {
  const [allItems, setAllItems] = useState([
    {
      id: "1",
      title: "Dubai Opera",
      url: "/assets/images/video_image2.png",
      posterUrl: "/assets/images/video_image2.png"
    },
    {
      id: "2",
      title: "Medan Hotel",
      url: "/assets/images/video_image.png",
      posterUrl: "/assets/images/video_image.png"
    },
    {
      id: "3",
      title: "Another Hotel",
      url: "/assets/images/video_image.png",
      posterUrl: "/assets/images/video_image.png"
    },
    {
      id: "4",
      title: "Place With Name",
      url: "/assets/images/video_image.png",
      posterUrl: "/assets/images/video_image.png"
    },
    {
      id: "5",
      title: "The Big Hotel",
      url: "/assets/images/video_image.png",
      posterUrl: "/assets/images/video_image.png"
    },
    {
      id: "6",
      title: "Event",
      url: "/assets/images/video_image.png",
      posterUrl: "/assets/images/video_image.png"
    }
  ]);
  const [activeIndex, setActiveIndex] = useState(1);
  const [sliderItems, setSliderItems] = useState(allItems.slice(0, 2));
  const [currentItem, setCurrentItem] = useState(undefined);

  useEffect(() => {
    fetchMainAlbum();
  }, []);

  useEffect(() => {
    setCurrentItem(sliderItems[1]);
  }, [sliderItems]);

  const previous = () => {
    let _a = activeIndex;
    if (_a < 1) _a = sliderItems.length - 1;
    else _a = _a - 1;
    setActiveIndex(_a);
  };
  const next = () => {
    let _a = activeIndex;
    if (_a >= sliderItems.length - 1) _a = 0;
    else _a = _a + 1;
    setActiveIndex(_a);
  };

  return currentItem === undefined ? null : (
    <div id="videos_photo">
      <div className="container">
        <div className="big_show">
          <div className="imgthumb">
            <img src={currentItem.posterUrl} />
          </div>
        </div>
        <div className="videos_slider">
          <div className="title">
            <Trans id="latest_video">latest videos & photos</Trans>
          </div>
          <div className="desc">
            <Trans id="videos_desc"></Trans>
          </div>
          <div className="slider_media">
            {sliderItems.map((s, i) => {
              const isCurrent = currentItem.id == s.id;
              const currentItemTitlePart1 = s.title.split(" ")[0];
              const currentItemTitlePart2 = s.title.split(" ").shift();

              return (
                <div key={s.id} className={classNames("item", { current: isCurrent })}>
                  <span>
                    {currentItemTitlePart1 && <i>{currentItemTitlePart1}</i>} {currentItemTitlePart2 && currentItemTitlePart2}
                  </span>
                  <div className="imgthumb">
                    <img src={s.posterUrl} />
                  </div>
                </div>
              );
            })}
            <div className="slide_nav">
              <button type="button" className="arrow_prev" onClick={previous}>
                <i className="icofont-simple-left"></i>
              </button>
              <button type="button" className="arrow_next" onClick={next}>
                <i className="icofont-simple-right"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ home: { albumContents } }) => ({ albumContents });
const mapDispatchToProps = dispatch => bindActionCreators({ ...homeActions }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(PhotoAlbum);
