import React, { useEffect, useState } from "react";
import { Trans } from "@lingui/macro";
import classNames from "classnames";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import homeActions from "store/home/actions";
import { LanguageContext } from "containers/Providers/LanguageProvider";
import "utils";

import Swiper from "react-id-swiper";

const News = ({ fetchNews, news, ...props }) => {
  const [hasNext, setHasNext] = useState(false);
  const [hasPrev, setHasPrev] = useState(false);
  const [swiper, setSwiper] = useState(null);

  useEffect(() => {
    fetchNews();
  }, []);

  useEffect(() => {
    setHasNext(true);
    setHasPrev(true);
  }, [news]);

  const params = {
    spaceBetween: 20,
    slidesPerView: 4,
    slidesPerGroup: 4,
    speed: 3000,
    loop: true,
    getSwiper: swiper => {
      setSwiper(swiper);
    },
    autoplay: {
      delay: 2500,
      disableOnInteraction: false
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true
    }
    // breakpoints: {
    //   1024: {
    //     slidesPerView: 1,
    //     slidesPerGroup: 4
    //   },
    //   768: {
    //     slidesPerView: 1,
    //     slidesPerGroup: 4,
    //     spaceBetween: 30
    //   },
    //   640: {
    //     slidesPerView: 1,
    //     slidesPerGroup: 4,
    //     spaceBetween: 20
    //   },
    //   320: {
    //     slidesPerView: 1,
    //     slidesPerGroup: 2,
    //     spaceBetween: 10
    //   }
    // }
  };

  return (
    <div id="news_features">
      <div className="container">
        <div className="title">
          <Trans id="news_features">news & features</Trans>
        </div>
        {news && news.length > 0 ? (
          <Swiper {...params}>
            {news.map((item, index) => (
              <div className="feature_item" key={index}>
                <div className="feature_block">
                  <time>{item.date}</time>
                  <div className="item">
                    <div className="category">
                      <Trans id={item.category.toLowerCase()}>{item.category}</Trans>
                    </div>
                    <div className="imgthumb">
                      <img src={`${item.posterUrl}?w=293&h=550&mode=stretch`} />
                      <LanguageContext.Consumer>
                        {({ locale }) => (
                          <div className="mask">
                            <div className="content">
                              <p>{item.title[locale.code]}</p>
                              <div className="more">
                                <a href={`/news/${item.id}`}>
                                  <Trans id="read_more">Read More</Trans>
                                </a>
                              </div>
                            </div>
                          </div>
                        )}
                      </LanguageContext.Consumer>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Swiper>
        ) : (
          false
        )}
        <div className="features_nav">
          {hasPrev ? (
            <button
              type="button"
              className="arrow_prev"
              onClick={() => {
                if (swiper !== null) swiper.slidePrev();
              }}
            >
              <Trans id="prev">prev</Trans>
            </button>
          ) : (
            <span></span>
          )}
          <a href="/news" title="#">
            <Trans id="show_all">show all</Trans>
          </a>
          {hasNext ? (
            <button
              type="button"
              className="arrow_next"
              onClick={() => {
                if (swiper !== null) swiper.slideNext();
              }}
            >
              <Trans id="next">next</Trans>
            </button>
          ) : (
            <span></span>
          )}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ home: { news } }) => ({ news });
const mapDispatchToProps = dispatch => bindActionCreators({ ...homeActions }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(News);
