import React, {useEffect, useState} from "react";
import {Trans} from "@lingui/macro";
import classNames from "classnames";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import homeActions from "store/home/actions";
import {LanguageContext} from "containers/Providers/LanguageProvider";
import "utils";
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

    useEffect(() => {
        fetchMainAlbum();
    }, []);

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
        </div>
    );
};

const mapStateToProps = ({home: {albumContents}}) => ({albumContents});
const mapDispatchToProps = dispatch => bindActionCreators({...homeActions}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(PhotoAlbum);
