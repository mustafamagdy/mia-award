import React, { useEffect, useState } from "react";
import { Trans } from "@lingui/macro";
import classNames from "classnames";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import homeActions from "store/home/actions";
import { LanguageContext } from "containers/Providers/LanguageProvider";
import "utils";
import Swiper from "react-id-swiper";
import "swiper/css/swiper.css";

const PhotoAlbum = ({ fetchMainAlbum, mainAlbum, ...props }) => {
  const [allItems, setAllItems] = useState([]);
  const [activeIndex, setActiveIndex] = useState(1);
  const [sliderItems, setSliderItems] = useState(allItems);
  const [currentItem, setCurrentItem] = useState(undefined);
  const [swiper, setSwiper] = useState(null);

  const paramsBig = {
    spaceBetween: 0,
    speed: 1000,
    loop: true,
    getSwiper: (swiper) => {
      setSwiper(swiper);
    },
  };

  useEffect(() => {
    if (
      mainAlbum != undefined &&
      mainAlbum.items &&
      mainAlbum.items.length > 0
    ) {
      setAllItems(mainAlbum.items);
      setSliderItems(mainAlbum.items);
    } else {
      setAllItems([]);
      setSliderItems([]);
    }
  }, [mainAlbum]);

  useEffect(() => {
    setCurrentItem(sliderItems[1]);
  }, [sliderItems]);

  useEffect(() => {
    setCurrentItem(sliderItems[activeIndex]);
  }, [activeIndex]);

  const [isAnimate, setIsAnimate] = useState(false);

  const previous = () => {
    if (!isAnimate) {
      setIsAnimate(true);
      setTimeout(() => {
        setIsAnimate(false);
        let _a = activeIndex;
        if (_a <= 1) _a = sliderItems.length - 1;
        else _a = _a - 1;
        setActiveIndex(_a);
        if (_a === 0) {
          _a++;
          setActiveIndex(_a);
        }
      }, 1000);
      if (swiper !== null) {
        swiper.slidePrev();
      }
    }
  };
  const next = () => {
    if (!isAnimate) {
      setIsAnimate(true);
      setTimeout(() => {
        setIsAnimate(false);
        let _a = activeIndex;
        if (_a >= sliderItems.length - 1) _a = 0;
        else _a = _a + 1;
        setActiveIndex(_a);
        if (_a === 0) {
          _a++;
          setActiveIndex(_a);
        }
      }, 1000);
      if (swiper !== null) {
        swiper.slideNext();
      }
    }
  };

  return currentItem === undefined ? null : (
    <div id="videos_photo">
      <div className="container">
        <div className="big_show">
          <div className="imgthumb">
            <Swiper {...paramsBig}>
              {allItems.map((item) => (
                <img
                  key={item.id}
                  src={
                    item.mediaType == "image" ? item.fileUrl : item.posterUrl
                  }
                  alt=""
                />
              ))}
            </Swiper>
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
              const isNext = i > activeIndex;
              const isPrev = i < activeIndex - 1;
              const isCurrent = currentItem.id === s.id;

              return (
                <div
                  key={s.id}
                  className={classNames(
                    "item",
                    { current: isCurrent },
                    { next: isNext },
                    { prev: isPrev },
                    { isAnimate: isAnimate && !isPrev && !isNext },
                    { aaa: isAnimate }
                  )}
                >
                  <LanguageContext.Consumer>
                    {({ locale }) => {
                      const _title = s.title[locale.code];
                      const currentItemTitlePart1 = _title.split(" ")[0];
                      const currentItemTitlePart2 = _title.split(" ").pop();

                      return (
                        <span>
                          {currentItemTitlePart1 && (
                            <i>{currentItemTitlePart1}</i>
                          )}{" "}
                          {currentItemTitlePart2 && currentItemTitlePart2}
                        </span>
                      );
                    }}
                  </LanguageContext.Consumer>
                  <div className="imgthumb">
                    <img
                      src={s.mediaType == "image" ? s.fileUrl : s.posterUrl}
                      alt=""
                    />
                  </div>
                </div>
              );
            })}
            <div className="slide_nav">
              <button type="button" className="arrow_prev" onClick={next}>
                <i className="icofont-simple-left"></i>
              </button>
              <button type="button" className="arrow_next" onClick={previous}>
                <i className="icofont-simple-right"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ home: { mainAlbum } }) => ({ mainAlbum });
const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ ...homeActions }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(PhotoAlbum);
