import React, { useState } from "react";
import classNames from "classnames";
import { Trans } from "@lingui/macro";
import { connect } from "react-redux";
import { TabList, Tab, TabPane, TabPanels } from "components/Tabs";
import galleryActions from "store/gallery/actions";
import { bindActionCreators } from "redux";
import { useEffect } from "react";
import ReactPlayer from "react-player";
import Lightbox from "lightbox-react";
import "lightbox-react/style.css"; // This only needs to be imported once in your app

const Gallery = ({ featuredItems, items, fetchItems, fetchFeaturedItems, pageCount, ...props }) => {
  const [slides, setSlides] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(-1);
  const [activeTab, setActiveTab] = useState(0);
  const [pageNumber, setPageNumber] = useState(0);
  const [currentItem, setCurrentItem] = useState(undefined);
  const [slideTranslate, setSlideTranslate] = useState(0);

  const tabs = ["All", "Latest", "Photos", "Videos"];

  useEffect(() => {
    fetchFeaturedItems();
  }, []);

  useEffect(() => {
    const _slides = featuredItems;
    if (_slides.length % 2 === 0) _slides.pop();

    setSlides(_slides);
  }, [featuredItems]);

  useEffect(() => {
    fetchItems({ pageNumber, pageSize: 10, type: tabs[activeTab] });
  }, [pageNumber, activeTab]);

  useEffect(() => {
    setSlideTranslate(Math.floor(slides.length / 2));
    setCurrentSlide(Math.floor(slides.length / 2) * -1);
  }, [slides]);

  const handleActiveTab = tab => {
    setActiveTab(tab);
    setPageNumber(1);
  };

  const nextSlide = () => {
    setCurrentSlide(currentSlide + 1);
    console.log("next", currentSlide);
    // let _current = current + 1;
    // if (_current == featuredItems.length) {
    //   _current = 0;
    // }

    // const slice = [];
    // if (_current == 0) {
    //   slice.push(featuredItems[featuredItems.length - 1]);
    //   slice.push(...featuredItems.slice(_current, _current + 7));
    // } else if (_current == featuredItems.length - 1) {
    //   slice.push(featuredItems[featuredItems.length - 7]);
    //   slice.push(featuredItems[featuredItems.length - 1]);
    //   slice.push(featuredItems[0]);
    // } else {
    //   slice.push(...featuredItems.slice(_current - 1, _current + 7));
    // }

    // setCurrent(_current);
    // setSlides(slice);
  };

  const prevSlide = () => {
    setCurrentSlide(currentSlide - 1);
    console.log("prev", currentSlide);

    // console.log("prev", currentIndex);
    // let _current = current - 1;
    // if (_current < 0) {
    //   _current = featuredItems.length - 1;
    // }

    // const slice = [];
    // if (_current == 0) {
    //   slice.push(featuredItems[featuredItems.length - 1]);
    //   slice.push(...featuredItems.slice(_current, _current + 7));
    // } else if (_current == featuredItems.length - 1) {
    //   slice.push(featuredItems[featuredItems.length - 7]);
    //   slice.push(featuredItems[featuredItems.length - 1]);
    //   slice.push(featuredItems[0]);
    // } else {
    //   slice.push(...featuredItems.slice(_current - 1, _current + 7));
    // }

    // setCurrent(_current);
    // setSlides(slice);
  };

  const onSlideSleected = slideIndex => {
    setCurrentSlide(slideIndex * -1);

    // if (slideIndex == featuredItems.length - 1) {
    // } else {
    //   slice.push(...featuredItems.slice(slideIndex - 1, slideIndex + 2));
    // }
    // const slice = featuredItems.slice(slideIndex, slideIndex + 3);
    // setCurrent(slideIndex);
    // setSlides(slice);
  };

  const handleItemClicked = p => {
    if (p.mediaType == "video") {
      setCurrentItem(<Video url={p.fileUrl} />);
    } else {
      setCurrentItem(p.fileUrl);
    }
  };

  console.log("render->current index", currentSlide, slideTranslate + currentSlide);
  return (
    <React.Fragment>
      <RenderLightBox currentItem={currentItem} setCurrentitem={setCurrentItem} />
      <section id="gallery">
        <div className="gallery_slider">
          <div className="container">
            <div className="slider_area">
              <div className="slider_nav">
                <button type="button" className="arrow_prev" onClick={prevSlide}>
                  <i className="icofont-simple-left"></i>
                </button>
                <button type="button" className="arrow_next" onClick={nextSlide}>
                  <i className="icofont-simple-right"></i>
                </button>
              </div>
              <div
                className="slider_items"
                style={{
                  transform: `translate3d(${(slideTranslate + currentSlide) * 800}px, 0px, 0px)`
                }}
              >
                {slides.map((s, i) => {
                  const a = Math.abs(currentSlide);
                  const isCurr = i == a;
                  const isPrev = i == a - 1;
                  const isNext = i == a + 1;

                  console.log(isPrev, isCurr, isNext);

                  return (
                    <div key={s.id} className={classNames("item", { prev_item: isPrev }, { current_item: isCurr }, { next_item: isNext })}>
                      {/* <div key={s.id} className={classNames("item")}> */}
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
                            light="https://picsum.photos/200/300"
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
              </div>
              <SliderDots onSlideSleected={onSlideSleected} slides={featuredItems} currentSlide={currentSlide} />
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
                  <TabList activeClassName="active" activeIndex={activeTab} handleActiveTab={handleActiveTab}>
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
                  <div key={p.id} className={classNames("item", { video: p.mediaType == "video" }, { photo: p.mediaType == "image" })}>
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
                          light="https://picsum.photos/200/300"
                        />
                      )}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <Pagination pageCount={pageCount} pageNumber={pageNumber} setPageNumber={setPageNumber} />
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
        <span key={s.id} className={classNames({ current: Math.abs(currentSlide) == i })} onClick={() => onSlideSleected(i)}></span>
      ))}
    </div>
  );
};

const Pagination = ({ pageCount, pageNumber, setPageNumber, ...props }) => {
  return (
    <div className="paginations">
      <ul>
        {new Array(pageCount).fill().map((_, i) => {
          return (
            <li key={i} className={classNames({ current: pageNumber == i + 1 })}>
              <span onClick={() => setPageNumber(i + 1)}>{i + 1}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

const Video = ({ url }) => <ReactPlayer playing url={url} className="react-player-lightbox" width="90%" height="90%" />;

const RenderLightBox = ({ currentItem, setCurrentitem, nextItem, prevItem, onNext, onPrev, ...props }) => {
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
    items_pagination: { pageCount }
  }
}) => ({ items, featuredItems, pageCount });
const mapDispatchToProps = dispatch => bindActionCreators({ ...galleryActions }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Gallery);
