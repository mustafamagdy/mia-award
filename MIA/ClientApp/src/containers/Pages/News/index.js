import React from "react";
import classNames from "classnames";
import { Trans } from "@lingui/macro";
import { useState } from "react";
import { TabList, Tab, TabPane, TabPanels } from "components/Tabs";
import { connect } from "react-redux";
import newsActions from "store/news/actions";
import { bindActionCreators } from "redux";
import { useEffect } from "react";
import { LanguageContext } from "containers/Providers/LanguageProvider";

const News = ({ featuredNews, news, fetchNews, fetchFeaturedNews, fetchCategories, categories, pageCount, ...pros }) => {
  const [pageNumber, setPageNumber] = useState(1);
  const [slides, setSlides] = useState(featuredNews.slice(0, 3));
  const [current, setCurrent] = useState(1);
  const [currentView, setCurrentView] = useState("listing");
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    fetchCategories();
    fetchNews({ pageNumber, pageSize: 10, category: selectedCategory });
  }, [selectedCategory, pageNumber]);

  useEffect(() => {
    fetchFeaturedNews();
  }, []);

  useEffect(() => {
    setSlides(featuredNews.slice(0, 3));
  }, [featuredNews]);

  const nextSlide = () => {
    let _current = current + 1;
    if (_current == featuredNews.length) {
      _current = 0;
    }

    const slice = [];
    if (_current == 0) {
      slice.push(featuredNews[featuredNews.length - 1]);
      slice.push(...featuredNews.slice(_current, _current + 2));
    } else if (_current == featuredNews.length - 1) {
      slice.push(featuredNews[featuredNews.length - 2]);
      slice.push(featuredNews[featuredNews.length - 1]);
      slice.push(featuredNews[0]);
    } else {
      slice.push(...featuredNews.slice(_current - 1, _current + 2));
    }

    setCurrent(_current);
    setSlides(slice);
  };

  const prevSlide = () => {
    let _current = current - 1;
    if (_current < 0) {
      _current = featuredNews.length - 1;
    }

    const slice = [];
    if (_current == 0) {
      slice.push(featuredNews[featuredNews.length - 1]);
      slice.push(...featuredNews.slice(_current, _current + 2));
    } else if (_current == featuredNews.length - 1) {
      slice.push(featuredNews[featuredNews.length - 2]);
      slice.push(featuredNews[featuredNews.length - 1]);
      slice.push(featuredNews[0]);
    } else {
      slice.push(...featuredNews.slice(_current - 1, _current + 2));
    }

    setCurrent(_current);
    setSlides(slice);
  };

  const onSlideSleected = slideIndex => {
    const slice = featuredNews.slice(slideIndex, slideIndex + 3);
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
                    <img src={item.posterUrl} />
                  </div>
                  <LanguageContext.Consumer>
                    {({ locale }) => (
                      <div className="content">
                        <div className="desc">
                          <span>{item.title[locale.code]}</span>
                          <p>{item.category}</p>
                          <time>
                            <Trans id="posted">Posted</Trans>: {item.date}
                          </time>
                          <b>{item.body[locale.code]}</b>
                        </div>
                        <div className="more">
                          <a href={`/news/${item.id}`}>
                            <Trans id="read_more">Read More</Trans>
                          </a>
                        </div>
                      </div>
                    )}
                  </LanguageContext.Consumer>
                </div>
              ))}
            </div>
            <SliderDots onSlideSleected={onSlideSleected} slides={featuredNews} currentSlide={current} />
          </div>
        </div>
      </div>
      <div className="news_features">
        <div className="container">
          <div className="title">
            <div className="name">
              <Trans id="news">News</Trans>
            </div>
            <div className="customize">
              <select
                value={selectedCategory}
                onChange={e => {
                  setSelectedCategory(e.target.value);
                  setPageNumber(1);
                }}
              >
                <option value="all">All</option>
                {categories &&
                  categories.map((c, i) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
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
          {currentView == "listing" ? (
            <ListingNews news={news} pageCount={pageCount} pageNumber={pageNumber} setPageNumber={setPageNumber} />
          ) : (
            <BlocksNews news={news} pageCount={pageCount} pageNumber={pageNumber} setPageNumber={setPageNumber} />
          )}
        </div>
      </div>
    </section>
  );
};

const BlocksNews = ({ news, pageCount, pageNumber, setPageNumber, ...props }) => (
  <div className="blocks_news active">
    {news.map((item, i) => (
      <div key={item.id} className="feature_item">
        <div className="feature_block">
          <time>{item.date}</time>
          <div className="item">
            <div className="category">
              <p>{item.category}</p>
            </div>
            <LanguageContext.Consumer>
              {({ locale }) => (
                <div className="imgthumb">
                  <img src={`${item.posterUrl}/280x549?text=news item+${item.id}`} />
                  <div className="mask">
                    <div className="content">
                      <p>{item.title[locale.code]}</p>
                      <div className="more">
                        <a href={`/news/${item.id}`}>
                          <Trans id="read_more">Read More..</Trans>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </LanguageContext.Consumer>
          </div>
        </div>
      </div>
    ))}
    <Pagination pageCount={pageCount} pageNumber={pageNumber} setPageNumber={setPageNumber} />
  </div>
);

const ListingNews = ({ news, pageCount, pageNumber, setPageNumber, ...props }) => (
  <div className="listing_news">
    {news.map((item, i) => (
      <div key={item.id} className="item">
        <div className="imgthmb">
          <img src={`${item.posterUrl}/280x261?text=news item+${item.id}`} />
        </div>
        <LanguageContext.Consumer>
          {({ locale }) => (
            <div className="content">
              <div className="desc">
                <span>{item.title[locale.code]}</span>
                <p>{item.category}</p>
                <time>
                  <Trans id="posted">Posted</Trans> : {item.date}
                </time>
                <b>{item.body[locale.code]}</b>
              </div>
              <div className="more">
                <a href={`/news/${item.id}`}>
                  <Trans id="read_more">Read More..</Trans>
                </a>
              </div>
            </div>
          )}
        </LanguageContext.Consumer>
      </div>
    ))}
    <Pagination pageCount={pageCount} pageNumber={pageNumber} setPageNumber={setPageNumber} />
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

const mapStateToProps = ({
  news: {
    categories,
    newsList,
    featuredNews,
    news_pagination: { pageCount }
  }
}) => ({ categories, news: newsList, featuredNews, pageCount });
const mapDispatchToProps = dispatch => bindActionCreators({ ...newsActions }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(News);
