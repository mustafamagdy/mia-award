import React, { useState, useEffect, useMemo } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { Trans } from "@lingui/macro";
import { I18n } from "@lingui/react";
import Swiper from "react-id-swiper";
import "swiper/css/swiper.css";

const Intro = ({ ...props }) => {
  const [items, _] = useState([
    {
      key: 1,
      keyText: "01",
      titleKey: "slide1_title",
      textKey: "slide1_text",
      bigImgPath: "assets/images/dubai.jpg",
      nextImagePath: "assets/images/Mia_Jury$.jpg",
    },
    {
      key: 2,
      keyText: "02",
      titleKey: "slide2_title",
      textKey: "slide2_text",
      bigImgPath: "assets/images/Mia_Jury$.jpg",
      nextImagePath: "assets/images/compassion.jpg",
    },
    {
      key: 3,
      keyText: "03",
      titleKey: "slide3_title",
      textKey: "slide3_text",
      bigImgPath: "assets/images/compassion.jpg",
      nextImagePath: "assets/images/workshops.jpg",
    },
    {
      key: 4,
      keyText: "04",
      titleKey: "slide4_title",
      textKey: "slide4_text",
      bigImgPath: "assets/images/workshops.jpg",
      nextImagePath: "assets/images/dubai.jpg",
    },
  ]);

  const [currentItem, setCurrentItem] = useState(items[0]);
  const commonParams = {
    spaceBetween: 0,
    speed: 1000,
    loop: true,
    simulateTouch: true,
    breakpoints: {
      991: {
        simulateTouch: false,
      },
    },
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
    navigation: {
      nextEl: "#move_next",
    },
  };

  const params = {
    ...commonParams,
    pagination: {
      el: "#slider_dots",
      clickable: true,
      bulletClass: "item",
      bulletActiveClass: "current",
      renderBullet: (index, className) => {
        return (
          '<span class="' + className + '">' + items[index].keyText + "</span>"
        );
      },
    },
    on: {
      slideChange: (a) => {
        const _swiper = document.querySelector(".swiper-container").swiper;
        if (_swiper !== null) {
          setCurrentItem(items[_swiper.realIndex]);
        }
      },
    },
  };

  const params2 = {
    ...commonParams,
  };

  return (
    <I18n>
      {({ i18n }) => (
        <section id="intro">
          <div className="container">
            <div className="slide_item">
              <div className="view_award">
                <div className="big_image">
                  <Swiper {...params}>
                    {items.map((item) => (
                      <img
                        alt=""
                        key={item.key}
                        className={
                          item.bigImgPath === "assets/images/burg_khalifa.jpg"
                            ? "burg_khalifa"
                            : ""
                        }
                        src={
                          item.bigImgPath.indexOf("$") != -1
                            ? `${item.bigImgPath.replace(
                                "$",
                                "_" + i18n.language
                              )}`
                            : item.bigImgPath
                        }
                      />
                    ))}
                  </Swiper>
                  <div className="horizontal_bar"></div>
                </div>
                <div className="desc">
                  <span>
                    <Trans id={currentItem.titleKey}></Trans>
                  </span>
                  <p>
                    <Trans id={currentItem.textKey}></Trans>
                  </p>
                  <a href="/timeline">
                    <Trans id="view_more">view more</Trans>
                  </a>
                  <div className="slider_thumb">
                    <div className="thmb">
                      <Swiper {...params2}>
                        {items.map((item) => (
                          <div key={item.key}>
                            <img
                              src={
                                item.nextImagePath.indexOf("$") != -1
                                  ? `${item.nextImagePath.replace(
                                      "$",
                                      "_" + i18n.language
                                    )}`
                                  : item.nextImagePath
                              }
                              alt=""
                            />
                          </div>
                        ))}
                      </Swiper>
                      <div></div>
                    </div>
                    <button
                      type="button"
                      className="arrow arrow_next"
                      id="move_next"
                    >
                      <i className="icofont-simple-right"></i>
                    </button>
                  </div>
                  <div className="slider_dots" id="slider_dots"></div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </I18n>
  );
};

export default Intro;
