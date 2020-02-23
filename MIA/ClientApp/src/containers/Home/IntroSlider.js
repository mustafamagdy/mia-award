import React, { useState, useEffect, useMemo } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { Trans } from "@lingui/macro";
import Swiper from "react-id-swiper";
import 'swiper/css/swiper.css'

const SliderWrapper = props => {
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

  const [currentItem, setCurrentItem] = useState(items[current]);

  return (
    <>
      <Intro
        items={items}
        current={current}
        setCurrent={i => {
          setCurrentItem(items[i]);
          setCurrent(i);
        }}
        currentItem={currentItem}
      />
    </>
  );
};

const Intro = ({ current, setCurrent, items, currentItem, ...props }) => {
  const [swiper, setSwiper] = useState(null);
  const [swiperMini, setSwiperMini] = useState(null);

  const params = {
    spaceBetween: 0,
    speed: 1000,
    loop: true,
    simulateTouch: true,
    getSwiper: swiper => {
      setSwiper(swiper);
    },
    breakpoints: {
      991: {
        simulateTouch: false
      }
    }
  };
  const params2 = {
    spaceBetween: 0,
    speed: 1000,
    loop: true,
    simulateTouch: true,
    getSwiper: swiperMini => {
      setSwiperMini(swiperMini);
    },
    breakpoints: {
      991: {
        simulateTouch: false
      }
    }
  };

  const handleClick = () => {
    console.log("click");
    if (current === items.length - 1) {
      console.log("zero");
      setCurrent(0);
    } else {
      console.log("set cur", current + 1);
      setCurrent(current + 1);
    }
  };

  useEffect(() => {
    // console.log("current changed", current, swiper);

    // const timeout = setTimeout(() => {
    //   handleClick();

    if (swiper !== null) {
      swiper.slideNext();
    }
    if (swiperMini !== null) {
      swiperMini.slideNext();
    }
    // }, 5000);
    // return () => {
    //   console.log("clear timeout", current);
    //   clearTimeout(timeout);
    // };
  }, [current]);

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
                <button type="button" className="arrow arrow_next" onClick={handleClick}>
                  <i className="icofont-simple-right"></i>
                </button>
              </div>
              <div className="slider_dots">
                {items.map((item, index) => {
                  return (
                    <span key={item.key} className={`${index === current ? "current" : ""}`}>
                      {item.keyText}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SliderWrapper;
