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

const PhotoAlbum = ({ mainAlbum, ...props }) => {
  const [allItems, setAllItems] = useState([]);
  const [activeIndex, setActiveIndex] = useState(1);
  const [sliderItems, setSliderItems] = useState([]);
  const [currentItem, setCurrentItem] = useState(undefined);

  useEffect(() => {
    if (mainAlbum && mainAlbum.items) {
      setAllItems(mainAlbum.items);
      setSliderItems(mainAlbum.items);
    }
  }, [mainAlbum]);

  useEffect(() => {
    setCurrentItem(sliderItems[1]);
  }, [sliderItems]);

  // const previous = () => {
  //   let _a = activeIndex;
  //   if (_a < 1) _a = sliderItems.length - 1;
  //   else _a = _a - 1;
  //   setActiveIndex(_a);
  // };
  // const next = () => {
  //   let _a = activeIndex;
  //   if (_a >= sliderItems.length - 1) _a = 0;
  //   else _a = _a + 1;
  //   setActiveIndex(_a);
  // };

  const params = {
    slidesPerView: 1,
    slidesPerGroup: 2,
    spaceBetween: 0,
    loop: true,
    simulateTouch: true,
    // getSwiper: swiper => {
    //   setSwiper(swiper);
    // },
    breakpoints: {
      991: {
        // slidesPerView: 2.5,
        spaceBetween: 20,
        simulateTouch: false,
        loop: true
      }
    },
    navigation: {
      nextEl: "#next_album_item",
      prevEl: "#prev_album_item"
    }
    // slideClass: "item",
    // slideActiveClass: "current"
  };

  return currentItem === undefined ? null : (
    <div id="videos_photo">
      <div className="container">
        <div className="big_show">
          <div className="imgthumb">
            <img src={currentItem.mediaType == "image" ? currentItem.fileUrl : currentItem.posterUrl} />
          </div>
        </div>
        <div className="videos_slider">
          <div className="title">
            <Trans id="latest_video">latest videos & photos</Trans>
          </div>
          <div className="desc">
            <Trans id="videos_desc"></Trans>
          </div>
          <LanguageContext.Consumer>
            {({ locale }) => (
              <div className="slider_media">
                <Swiper {...params}>
                  {sliderItems.map((s, i) => {
                    // const isCurrent = currentItem.id == s.id;
                    const currentItemTitlePart1 = s.title[locale.code].split(" ")[0];
                    const currentItemTitlePart2 = s.title[locale.code].split(" ").shift();

                    return (
                      <div key={s.id}>
                        <span>
                          {currentItemTitlePart1 && <i>{currentItemTitlePart1}</i>} {currentItemTitlePart2 && currentItemTitlePart2}
                        </span>
                        <div className="imgthumb">
                          <img src={s.mediaType == "image" ? s.fileUrl : s.posterUrl} />
                        </div>
                      </div>
                    );
                  })}
                </Swiper>
                <div className="slide_nav">
                  <button type="button" className="arrow_prev" id="prev_album_item">
                    <i className="icofont-simple-left"></i>
                  </button>
                  <button type="button" className="arrow_next" id="next_album_item">
                    <i className="icofont-simple-right"></i>
                  </button>
                </div>
              </div>
            )}
          </LanguageContext.Consumer>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ home: { mainAlbum } }) => ({ mainAlbum });
const mapDispatchToProps = dispatch => bindActionCreators({ ...homeActions }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(PhotoAlbum);
