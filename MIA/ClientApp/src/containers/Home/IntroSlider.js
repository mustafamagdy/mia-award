import React, { useState, useEffect, useMemo } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { Trans } from "@lingui/macro";
import Swiper from "react-id-swiper";
import "swiper/css/swiper.css";

const Intro = ({ ...props }) => {
  const [current, setCurrent] = useState(0);
  const [items, _] = useState([
    {
      key: 1,
      keyText: "01",
      title: "slider Title 01",
      text: `01 - Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard
      dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen
      book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially
      unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more
      recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum`,
      bigImgPath: "assets/images/dubai.jpg",
      nextImagePath: "assets/images/burg_khalifa.jpg"
    },
    {
      key: 2,
      keyText: "02",
      title: "slider Title 02",
      text: `02 - Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard
      dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen
      book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially
      unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more
      recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum`,
      bigImgPath: "assets/images/burg_khalifa.jpg",
      nextImagePath: "assets/images/GeorgJensen.jpg"
    },
    {
      key: 3,
      keyText: "03",
      title: "slider Title 03",
      text: `03 - Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard
      dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen
      book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially
      unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more
      recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum`,
      bigImgPath: "assets/images/GeorgJensen.jpg",
      nextImagePath: "assets/images/ger.jpg"
    },
    {
      key: 4,
      keyText: "04",
      title: "slider Title 04",
      text: `04 - Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard
      dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen
      book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially
      unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more
      recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum`,
      bigImgPath: "assets/images/ger.jpg",
      nextImagePath: "assets/images/dubai.jpg"
    }
  ]);

  const [currentItem, setCurrentItem] = useState(items[0]);
  const commonParams = {
    spaceBetween: 0,
    speed: 1000,
    loop: true,
    simulateTouch: true,
    breakpoints: {
      991: {
        simulateTouch: false
      }
    },
    autoplay: {
      delay: 4000,
      disableOnInteraction: false
    },
    navigation: {
      nextEl: "#move_next"
    }
  };

  const params = {
    ...commonParams,
    pagination: {
      el: "#slider_dots",
      clickable: true,
      bulletClass: "item",
      bulletActiveClass: "current",
      renderBullet: (index, className) => {
        return '<span class="' + className + '">' + items[index].keyText + "</span>";
      }
    },
    on: {
      slideChange: a => {
        const _swiper = document.querySelector(".swiper-container").swiper;
        if (_swiper !== null) {
          setCurrentItem(items[_swiper.realIndex]);
        }
      }
    }
  };

  const params2 = {
    ...commonParams
  };

  return (
    <section id="intro">
      <div className="container">
        <div className="slide_item">
          <div className="view_award">
            <div className="big_image">
              <Swiper {...params}>
                {items.map(item => (
                  <img
                    key={item.key}
                    className={item.bigImgPath === "assets/images/burg_khalifa.jpg" ? "burg_khalifa" : ""}
                    src={item.bigImgPath}
                  />
                ))}
              </Swiper>
              <div className="progress_bar"></div>
            </div>
            <div className="desc">
              <span>{currentItem.title}</span>
              <p>{currentItem.text}</p>
              <a href="/timeline">
                <Trans id="view_more">view more</Trans>
              </a>
              <div className="slider_thumb">
                <div className="thmb">
                  <Swiper {...params2}>
                    {items.map(item => (
                      <div key={item.key}>
                        <img src={item.nextImagePath} />
                      </div>
                    ))}
                  </Swiper>
                  <div></div>
                </div>
                <button type="button" className="arrow arrow_next" id="move_next">
                  <i className="icofont-simple-right"></i>
                </button>
              </div>
              <div className="slider_dots" id="slider_dots"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Intro;
