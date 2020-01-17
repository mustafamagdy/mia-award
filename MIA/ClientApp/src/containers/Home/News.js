import React from "react";
import "sass/news.scss";
import { Trans } from "@lingui/macro";

const News = props => {
  const news = [
    { date: "15-01-2020", category: "sports", img: "news_image_1.png", title: "And Mo Salah Makes football history for real" },
    { date: "15-01-2020", category: "media", img: "news_image_2.jpg", title: "And Mo Salah Makes football history for real" },
    { date: "15-01-2020", category: "sports", img: "news_image_1.png", title: "And Mo Salah Makes football history for real" },
    { date: "15-01-2020", category: "media", img: "news_image_2.jpg", title: "And Mo Salah Makes football history for real" },
    { date: "15-01-2020", category: "sports", img: "news_image_1.png", title: "And Mo Salah Makes football history for real" },
    { date: "15-01-2020", category: "media", img: "news_image_2.jpg", title: "And Mo Salah Makes football history for real" }
  ];
  return (
    <div id="news_features">
      <div className="continer">
        <div className="title">news & features</div>
        <div className="features_sliders">
          {news.map((item, index) => (
            <div className="feature_item" key={index}>
              <div className="feature_block">
                <time>{item.date}</time>
                <div className="item">
                  <div className="category">
                    <p>
                      <Trans id={item.category}>{item.category}</Trans>
                    </p>
                  </div>
                  <div className="imgthumb">
                    <img src={`assets/images/${item.img}`} alt="#" />
                    <div className="mask">
                      <div className="content">
                        <p>{item.title}</p>
                        <div className="more">
                          <a href="#" title="#">
                            <Trans id="read_more">read more</Trans>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="features_nav">
          <button type="button" className="arrow_prev">
            <Trans id="prev">prev</Trans>
          </button>
          <a href="#" title="#">
            <Trans id="show_all">show all</Trans>
          </a>
          <button type="button" className="arrow_next">
            <Trans id="next">next</Trans>
          </button>
        </div>
      </div>
    </div>
  );
};

export default News;
