import React, {useEffect, useState} from "react";
import {Trans} from "@lingui/macro";
import classNames from "classnames";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import homeActions from "store/home/actions";
import {LanguageContext} from "containers/Providers/LanguageProvider";
import "utils";
<<<<<<< HEAD
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
=======
import Swiper from 'react-id-swiper';
import 'swiper/css/swiper.css'

const PhotoAlbum = ({fetchMainAlbum, albumContents, ...props}) => {
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
            url: "/assets/images/video_image2.png",
            posterUrl: "/assets/images/video_image2.png"
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
            url: "/assets/images/video_image2.png",
            posterUrl: "/assets/images/video_image2.png"
        },
        {
            id: "6",
            title: "Event",
            url: "/assets/images/video_image.png",
            posterUrl: "/assets/images/video_image.png"
        }
    ]);
    const [activeIndex, setActiveIndex] = useState(1);
    const [sliderItems, setSliderItems] = useState(allItems);
    const [currentItem, setCurrentItem] = useState(undefined);
    const [swiper, setSwiper] = useState(null);

    const paramsBig = {
        spaceBetween: 0,
        speed: 1000,
        loop: true,
        getSwiper: swiper => {
            setSwiper(swiper);
        },
    };
>>>>>>> 34c0b46ec37cc120edcf57fdbe195a9ab988dbc9

    useEffect(() => {
        fetchMainAlbum();
    }, []);

<<<<<<< HEAD
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
=======
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
                if (_a < 1) _a = sliderItems.length - 1;
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
                            {allItems.map(item => (
                                <img
                                    key={item.id}
                                    src={item.posterUrl}
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
                            // const currentItemTitlePart1 = s.title.split(" ")[0];
                            // const currentItemTitlePart2 = s.title.split(" ").shift();

                            return (
                                <div key={s.id}
                                     className={classNames("item",
                                         {current: isCurrent},
                                         {next: isNext},
                                         {prev: isPrev},
                                         {isAnimate: isAnimate && !isPrev && !isNext},
                                         {aaa: isAnimate})}
                                >
                                    <span>
                                      {s.title}
                                        {/* {currentItemTitlePart1 && <i>{currentItemTitlePart1}</i>} {currentItemTitlePart2 && currentItemTitlePart2} */}
                                    </span>
                                    <div className="imgthumb">
                                        <img src={s.posterUrl}/>
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
>>>>>>> 34c0b46ec37cc120edcf57fdbe195a9ab988dbc9
        </div>
    );
};

<<<<<<< HEAD
const mapStateToProps = ({ home: { mainAlbum } }) => ({ mainAlbum });
const mapDispatchToProps = dispatch => bindActionCreators({ ...homeActions }, dispatch);
=======
const mapStateToProps = ({home: {albumContents}}) => ({albumContents});
const mapDispatchToProps = dispatch => bindActionCreators({...homeActions}, dispatch);
>>>>>>> 34c0b46ec37cc120edcf57fdbe195a9ab988dbc9
export default connect(mapStateToProps, mapDispatchToProps)(PhotoAlbum);
