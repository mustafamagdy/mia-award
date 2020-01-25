import React from "react";
import classNames from "classnames";
import { Trans } from "@lingui/macro";
import { useState } from "react";
import { TabList, Tab, TabPane, TabPanels } from "components/Tabs";

const Gallery = props => {
  const initialGalleryItems = [
    { id: "1", type: "video", posterUrl: "https://via.placeholder.com/998x558?text=image+1" },
    { id: "2", type: "video", posterUrl: "https://via.placeholder.com/998x558?text=image+2" },
    { id: "3", featured: true, type: "photo", posterUrl: "https://via.placeholder.com/998x558?text=image+3" },
    { id: "4", featured: true, type: "photo", posterUrl: "https://via.placeholder.com/998x558?text=image+4" },
    { id: "5", type: "photo", posterUrl: "https://via.placeholder.com/998x558?text=image+5" },
    { id: "6", type: "video", posterUrl: "https://via.placeholder.com/998x558?text=image+6" },
    { id: "7", featured: true, type: "photo", posterUrl: "https://via.placeholder.com/998x558?text=image+7" },
    { id: "8", type: "photo", posterUrl: "https://via.placeholder.com/998x558?text=image+8" },
    { id: "9", type: "video", posterUrl: "https://via.placeholder.com/998x558?text=image+9" },
    { id: "10", type: "video", posterUrl: "https://via.placeholder.com/998x558?text=image+10" },
    { id: "11", featured: true, type: "photo", posterUrl: "https://via.placeholder.com/998x558?text=image+11" },
    { id: "12", featured: true, type: "photo", posterUrl: "https://via.placeholder.com/998x558?text=image+12" },
    { id: "13", type: "photo", posterUrl: "https://via.placeholder.com/998x558?text=image+13" },
    { id: "14", type: "video", posterUrl: "https://via.placeholder.com/998x558?text=image+14" },
    { id: "15", type: "photo", posterUrl: "https://via.placeholder.com/998x558?text=image+15" },
    { id: "16", featured: true, type: "photo", posterUrl: "https://via.placeholder.com/998x558?text=image+16" },
    { id: "17", featured: true, type: "photo", posterUrl: "https://via.placeholder.com/998x558?text=image+17" },
    { id: "18", type: "photo", posterUrl: "https://via.placeholder.com/998x558?text=image+18" },
    { id: "19", featured: true, type: "photo", posterUrl: "https://via.placeholder.com/998x558?text=image+19" },
    { id: "20", type: "photo", posterUrl: "https://via.placeholder.com/998x558?text=image+20" }
  ];
  const [allSlides] = useState(initialGalleryItems.filter(a => !!a.featured));
  const [slides, setSlides] = useState(allSlides.slice(0, 3));
  const [current, setCurrent] = useState(1);
  const [galleryItems, setGalleryItems] = useState(initialGalleryItems.slice(0, 6));
  const [activeTab, setActiveTab] = useState(0);
  const tabs = ["All", "Latest", "Photos", "Videos"];

  const handleActiveTab = tab => {
    setActiveTab(tab);
    if (tab == 0) setGalleryItems(initialGalleryItems);
    else {
      const slice = initialGalleryItems.slice(tab * 2, tab * 2 * 3);
      setGalleryItems(slice);
    }
  };

  const nextSlide = () => {
    let _current = current + 1;
    if (_current == allSlides.length) {
      _current = 0;
    }

    const slice = [];
    if (_current == 0) {
      slice.push(allSlides[allSlides.length - 1]);
      slice.push(...allSlides.slice(_current, _current + 2));
    } else if (_current == allSlides.length - 1) {
      slice.push(allSlides[allSlides.length - 2]);
      slice.push(allSlides[allSlides.length - 1]);
      slice.push(allSlides[0]);
    } else {
      slice.push(...allSlides.slice(_current - 1, _current + 2));
    }

    setCurrent(_current);
    setSlides(slice);
  };

  const prevSlide = () => {
    let _current = current - 1;
    if (_current < 0) {
      _current = allSlides.length - 1;
    }

    const slice = [];
    if (_current == 0) {
      slice.push(allSlides[allSlides.length - 1]);
      slice.push(...allSlides.slice(_current, _current + 2));
    } else if (_current == allSlides.length - 1) {
      slice.push(allSlides[allSlides.length - 2]);
      slice.push(allSlides[allSlides.length - 1]);
      slice.push(allSlides[0]);
    } else {
      slice.push(...allSlides.slice(_current - 1, _current + 2));
    }

    setCurrent(_current);
    setSlides(slice);
  };

  const onSlideSleected = slideIndex => {
    if (slideIndex == allSlides.length - 1) {
    } else {
      slice.push(...allSlides.slice(slideIndex - 1, slideIndex + 2));
    }
    const slice = allSlides.slice(slideIndex, slideIndex + 3);
    setCurrent(slideIndex);
    setSlides(slice);
  };

  return (
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
            <div className="slider_items">
              {slides.map((s, i) => (
                <div key={s.id} className={classNames("item", { prev_item: i == 0 }, { current_item: i == 1 }, { next_item: i == 2 })}>
                  <img src={s.posterUrl} />
                  <div className="zoom_image">
                    <a href="#" title="#">
                      <i className="icofont-ui-zoom-in"></i>
                    </a>
                  </div>
                </div>
              ))}
            </div>
            <SliderDots onSlideSleected={onSlideSleected} slides={allSlides} currentSlide={current} />
          </div>
        </div>
      </div>
      <div className="gallery_tabs">
        <div className="container">
          <div className="title">
            <div className="name">Gallery</div>
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
              {galleryItems.map((p, i) => (
                <div key={p.id} className={classNames("item", { video: p.type == "video" }, { photo: p.type == "photo" })}>
                  <a href="#" title="#">
                    <img src={p.posterUrl} />
                  </a>
                </div>
              ))}
            </div>
          </div>
          <Pagination />
        </div>
      </div>
    </section>
  );
};

const SliderDots = ({ slides, onSlideSleected, currentSlide, ...props }) => {
  return (
    <div className="slider_dots">
      {slides.map((s, i) => (
        <span key={s.id} className={classNames({ current: currentSlide == i })} onClick={() => onSlideSleected(i)}></span>
      ))}
    </div>
  );
};

const Pagination = props => {
  const pages = [1, 2, 3, 4, 5];
  const currentPage = 3;
  return (
    <div className="paginations">
      <ul>
        {pages.map((p, i) => (
          <li key={i} className={classNames({ current: currentPage == p })}>
            <a href="#" title="#">
              {p}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Gallery;
