import React, { useState } from "react";
import classNames from "classnames";
import { Trans } from "@lingui/macro";
import { TabList, Tab, TabPane, TabPanels } from "components/Tabs";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import galleryActions from "store/gallery/actions";
import { useEffect } from "react";
import ReactPlayer from "react-player";
import Lightbox from "lightbox-react";
import Swiper from "react-id-swiper";
import Paginator from "components/Paginator";

import "lightbox-react/style.css"; // This only needs to be imported once in your app
import "swiper/css/swiper.css";

const Gallery = ({
  featuredItems,
  items,
  fetchItems,
  fetchFeaturedItems,
  pageCount,
  ...props
}) => {
  const [slides, setSlides] = useState([]);
  const [activeTab, setActiveTab] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [currentItem, setCurrentItem] = useState(undefined);
  const [swiper, setSwiper] = useState(null);

  const tabs = ["All", "Latest", "Photos", "Videos"];

  useEffect(() => {
    fetchFeaturedItems();
  }, []);

  useEffect(() => {
    setSlides(featuredItems.slice(0, 10));
  }, [featuredItems]);

  useEffect(() => {
    fetchItems({ pageNumber, pageSize: 10, type: tabs[activeTab] });
  }, [pageNumber, activeTab]);

  const handleActiveTab = (tab) => {
    setActiveTab(tab);
    setPageNumber(1);
  };

  const nextSlide = () => {
    if (swiper !== null) swiper.slideNext();
  };

  const prevSlide = () => {
    if (swiper !== null) swiper.slidePrev();
  };

  const handleItemClicked = (p) => {
    if (p.mediaType == "video") {
      setCurrentItem(<Video url={p.fileUrl} />);
    } else {
      setCurrentItem(p.fileUrl);
    }
  };

  const params = {
    effect: "coverflow",
    spaceBetween: 0,
    speed: 1000,
    loop: true,
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto",
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true,
    },
    breakpoints: {
      991: {
        spaceBetween: 0,
        simulateTouch: true,
        loop: true,
      },
      640: {
        coverflowEffect: {
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        },
      },
    },
    rebuildOnUpdate: true,
    pagination: {
      el: ".slider_dots",
      clickable: true,
    },
    navigation: {
      nextEl: "#nav_next",
      prevEl: "#nav_prev",
    },
  };

  return (
    <React.Fragment>
      <RenderLightBox
        currentItem={currentItem}
        setCurrentitem={setCurrentItem}
      />
      <section id="gallery">
        <div className="gallery_slider">
          <div className="container">
            <div className="slider_area">
              <div className="slider_nav">
                <button type="button" className="arrow_prev" id="nav_prev">
                  <i className="icofont-simple-left"></i>
                </button>
                <button type="button" className="arrow_next" id="nav_next">
                  <i className="icofont-simple-right"></i>
                </button>
              </div>
              <div className="slider_items">
                <Swiper {...params} getSwiper={setSwiper}>
                  {slides.map((s, i) => {
                    return (
                      <div key={s.id} className="item">
                        {s.mediaType == "image" ? (
                          <>
                            <img src={s.fileUrl} />
                            <div className="zoom_image">
                              <span>
                                <i className="icofont-ui-zoom-in"></i>
                              </span>
                            </div>
                          </>
                        ) : (
                          <>
                            <ReactPlayer
                              playing
                              url={s.fileUrl}
                              className="react-player"
                              width="100%"
                              height="100%"
                              light={
                                s.posterUrl || "https://picsum.photos/200/300"
                              }
                            />
                            <div className="zoom_image">
                              <span>
                                <i className="icofont-ui-zoom-in"></i>
                              </span>
                            </div>
                          </>
                        )}
                      </div>
                    );
                  })}
                </Swiper>
              </div>
              <div className="slider_dots"></div>
              {/* <SliderDots onSlideSleected={onSlideSleected} slides={featuredItems} currentSlide={currentSlide} /> */}
            </div>
          </div>
        </div>
        <div className="gallery_tabs">
          <div className="container">
            <div className="title">
              <div className="name">
                <Trans id="gallery">Gallery</Trans>
              </div>
              <div className="tabs">
                <ul>
                  <TabList
                    activeClassName="active"
                    activeIndex={activeTab}
                    handleActiveTab={handleActiveTab}
                  >
                    {tabs.map((t, i) => (
                      <Tab key={i}>
                        <li>
                          <Trans id={t}>{t}</Trans>
                        </li>
                      </Tab>
                    ))}
                  </TabList>
                </ul>
              </div>
            </div>
            <div className="tab_content active">
              <div className="gallery_items">
                {items.map((p, i) => (
                  <div
                    key={p.id}
                    className={classNames(
                      "item",
                      { video: p.mediaType == "video" },
                      { photo: p.mediaType == "image" }
                    )}
                  >
                    <span onClick={() => handleItemClicked(p)}>
                      {p.mediaType == "image" ? (
                        <img src={p.fileUrl} />
                      ) : (
                        <ReactPlayer
                          playing
                          url={p.fileUrl}
                          className="react-player"
                          width="100%"
                          height="100%"
                          light={p.posterUrl || "https://picsum.photos/200/300"}
                        />
                      )}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <Paginator
              pageCount={pageCount}
              pageNumber={pageNumber}
              setPageNumber={setPageNumber}
            />
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

const SliderDots = ({ slides, onSlideSleected, currentSlide, ...props }) => {
  return (
    <div className="slider_dots">
      {slides.map((s, i) => (
        <span
          key={s.id}
          className={classNames({ current: Math.abs(currentSlide) == i })}
          onClick={() => onSlideSleected(i)}
        ></span>
      ))}
    </div>
  );
};

const Video = ({ url }) => (
  <ReactPlayer
    playing
    url={url}
    className="react-player-lightbox"
    width="90%"
    height="90%"
  />
);

const RenderLightBox = ({
  currentItem,
  setCurrentitem,
  nextItem,
  prevItem,
  onNext,
  onPrev,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(currentItem != undefined);
  }, [currentItem]);

  return isOpen ? (
    <Lightbox
      mainSrc={currentItem}
      nextSrc={nextItem}
      prevSrc={prevItem}
      onCloseRequest={() => {
        setCurrentitem(undefined);
      }}
      onMovePrevRequest={onPrev}
      onMoveNextRequest={onNext}
    />
  ) : null;
};

const mapStateToProps = ({
  gallery: {
    items,
    featuredItems,
    items_pagination: { pageCount },
  },
}) => ({ items, featuredItems, pageCount });
const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ ...galleryActions }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Gallery);
