import React from "react";
import classNames from "classnames";
import { Trans } from "@lingui/macro";
import { useState } from "react";
import { TabList, Tab, TabPane, TabPanels } from "components/Tabs";

const News = pros => {
  const allSlides = [
    {
      id: "1",
      thumbImg: "https://via.placeholder.com/373x541?text=thumbnail image+1",
      title: "And Mo Salah Makes football history for real",
      category: "sports",
      body: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
      aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis. Lorem
      ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.`
    },
    {
      id: "2",
      thumbImg: "https://via.placeholder.com/373x541?text=thumbnail image+2",
      title: "And Mo Salah Makes football history for real",
      category: "sports",
      body: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
      aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis. Lorem
      ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.`
    },
    {
      id: "3",
      thumbImg: "https://via.placeholder.com/373x541?text=thumbnail image+3",
      title: "And Mo Salah Makes football history for real",
      category: "sports",
      body: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
      aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis. Lorem
      ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.`
    },
    {
      id: "4",
      thumbImg: "https://via.placeholder.com/373x541?text=thumbnail image+4",
      title: "And Mo Salah Makes football history for real",
      category: "sports",
      body: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
      aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis. Lorem
      ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.`
    },
    {
      id: "5",
      thumbImg: "https://via.placeholder.com/373x541?text=thumbnail image+5",
      title: "And Mo Salah Makes football history for real",
      category: "sports",
      body: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
      aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis. Lorem
      ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.`
    },
    {
      id: "6",
      thumbImg: "https://via.placeholder.com/373x541?text=thumbnail image+6",
      title: "And Mo Salah Makes football history for real",
      category: "sports",
      body: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
      aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis. Lorem
      ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.`
    }
  ];
  /*

*/
  const news = new Array(10).fill().map((_, a) => ({
    id: a.toString(),
    title: "And Mo Salah Makes football history for real",
    posterUrl: "https://via.placeholder.com",
    category: "sports",
    time: "12-05-2020",
    body: ` Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis
  ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis. Lorem ipsum dolor sit amet,
  consectetur adipiscing elit, sed do eiusmod tempor incididunt ut`
  }));

  const [slides, setSlides] = useState(allSlides.slice(0, 3));
  const [current, setCurrent] = useState(1);
  const [currentView, setCurrentView] = useState("listing");

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
    const slice = allSlides.slice(slideIndex, slideIndex + 3);
    setCurrent(slideIndex);
    setSlides(slice);
  };

  const toggleBlocks = () => {
    setCurrentView("blocks");
  };

  const toggleListing = () => {
    setCurrentView("listing");
  };

  return (
    <section id="news_category">
      <div className="news_slider">
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
              {slides.map((item, i) => (
                <div key={item.id} className={classNames("item", { prev_item: i == 0 }, { current_item: i == 1 }, { next_item: i == 2 })}>
                  <div className="imgthmb">
                    <img src={item.thumbImg} />
                  </div>
                  <div className="content">
                    <span>{item.title}</span>
                    <p>{item.category}</p>
                    <time>
                      <Trans id="posted">Posted</Trans>: {item.time}
                    </time>
                    <b>{item.body}</b>
                  </div>
                </div>
              ))}
            </div>
            <SliderDots onSlideSleected={onSlideSleected} slides={allSlides} currentSlide={current} />
          </div>
        </div>
      </div>
      <div className="news_features">
        <div className="container">
          <div className="title">
            <div className="name">News</div>
            <div className="customize">
              <select name="" id="" defaultValue="">
                <option value="">News Type</option>
                <option value="">News Type</option>
                <option value="">News Type</option>
                <option value="">News Type</option>
                <option value="">News Type</option>
                <option value="">News Type</option>
                <option value="">News Type</option>
                <option value="">News Type</option>
                <option value="">News Type</option>
              </select>
              <div className="change_grid">
                <button type="button" className={classNames({ active: currentView == "listing" })} onClick={toggleBlocks}>
                  <i className="icofont-listing-box"></i>
                </button>
                <button type="button" className={classNames({ active: currentView == "blocks" })} onClick={toggleListing}>
                  <i className="icofont-brand-microsoft"></i>
                </button>
              </div>
            </div>
          </div>
          {currentView == "listing" ? <ListingNews news={news} /> : <BlocksNews news={news} />}
        </div>
      </div>
    </section>
  );
};

const BlocksNews = ({ news, ...props }) => (
  <div className="blocks_news active">
    {news.map((item, i) => (
      <div className="feature_item">
        <div className="feature_block">
          <time>{item.time}</time>
          <div className="item">
            <div className="category">
              <p>{item.category}</p>
            </div>
            <div className="imgthumb">
              <img src={`${item.posterUrl}/280x549?text=news item+${item.id}`} />
              <div className="mask">
                <div className="content">
                  <p>{item.title}</p>
                  <div className="more">
                    <a href={`/news/${item.id}`}>
                      <Trans id="read_more">Read More..</Trans>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ))}
    <Pagination />
  </div>
);

const ListingNews = ({ news, ...props }) => (
  <div className="listing_news">
    {news.map((item, i) => (
      <div key={item.id} className="item">
        <div className="imgthmb">
          <img src={`${item.posterUrl}/280x261?text=news item+${item.id}`} />
        </div>
        <div className="content">
          <div className="desc">
            <span>{item.title}</span>
            <p>{item.category}</p>
            <time>
              <Trans id="posted">Posted</Trans> : {item.time}
            </time>
            <b>{item.body}</b>
          </div>
          <div className="more">
            <a href={`/news/${item.id}`}>
              <Trans id="read_more">Read More..</Trans>
            </a>
          </div>
        </div>
      </div>
    ))}
    <Pagination />
  </div>
);

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

export default News;
