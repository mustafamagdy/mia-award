import React, { useState, useEffect } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { Trans } from "@lingui/macro";
import Swiper from 'react-id-swiper';
import 'swiper/css/swiper.css'




const Intro = props => {
  const [current, setCurrent] = useState(0);
  const [startAnim, setStartAnim] = useState(false);
  const [swiper, setSwiper] = useState(null);
  const [swiperMini, setSwiperMini] = useState(null);
  const [isCanSlide, setisCanSlide] = useState(true);
  const items = [
    {
      key: 1,
      keyText: "01",
      title: "slider Title 01",
      text: `01 - Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard
      dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen
      book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially
      unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more
      recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum`,
      smallImgPath: "assets/images/dubai.jpg",
      bigImgPath: "assets/images/burg_khalifa.jpg"
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
      smallImgPath: "assets/images/ger.jpg",
      bigImgPath: "assets/images/dubai.jpg"
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
      smallImgPath: "assets/images/GeorgJensen.jpg",
      bigImgPath: "assets/images/ger.jpg"
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
      smallImgPath: "assets/images/burg_khalifa.jpg",
      bigImgPath: "assets/images/GeorgJensen.jpg"
    }
  ];
  const params = {
    spaceBetween: 0,
    speed: 1000,
    loop: true,
    getSwiper: (swiper) => {
      setSwiper(swiper)
    },
  };
  const params2 = {
    spaceBetween: 0,
    speed: 1000,
    loop: true,
    getSwiper: (swiperMini) => {
      setSwiperMini(swiperMini)
    },
  };



  const handleClick = () => {
    if (current === items.length - 1) {
      setCurrent( 0)
    } else {
      setCurrent( current + 1);
    }
    if(swiper !== null) {
      swiper.slideNext()
    }
    if(swiperMini !== null) {
      swiperMini.slideNext()
    }
  }
  return (
    <section id="intro">
      <div className="container">
        <div className="slide_item">
          {/* <TransitionGroup className="view_award"> */}
          <div className="view_award">
            {/* <CSSTransition key={items[current].key} appear={true} timeout={1000} classNames="big_image"> */}
            {/*<div className={`big_image ${startAnim ? "big_image_animate" : ""}`}>*/}
            {/*  <a href="#" title="#">*/}
            {/*    <img src={items[current].bigImgPath} />*/}
            {/*  </a>*/}
            {/*  <div className="progress_bar"></div>*/}
            {/*</div>*/}
            {/* </CSSTransition> */}
            <div className="big_image">
              <Swiper {...params}>
                {/*{items.map(item => <a href="#" title="#"><div key = {item.key}><img src={item.bigImgPath} /></div></a>)}*/}
                {items.map(item => <a href="#" title="#"  key = {item.key}><img className={item.bigImgPath === "assets/images/burg_khalifa.jpg" ? "burg_khalifa": ""} src={item.bigImgPath} /></a>)}

              </Swiper>
              <div className="progress_bar"></div>

            </div>
            <div className="desc">
              <span>{items[current].title}</span>
              <p>{items[current].text}</p>
              <a href="#" title="#">
                <Trans id="view_awards">view awards</Trans>
              </a>
              <div className="slider_thumb">
                {/* <button type="button" className="arrow arrow_prev" onClick={() => setCurrent(current > 0 ? current - 1 : items.length - 1)}>
            <i className="icofont-simple-left"></i>
          </button> */}
                {/*<div className={`thmb ${startAnim? "small_image_animate": ""}`}>*/}
                {/*  <img*/}

                {/*      src={items.length > current + 1 ? items[current + 1].smallImgPath : items[0].smallImgPath} />*/}
                {/*</div>*/}
                <div className="thmb">
                  <Swiper {...params2}>
                    {items.map(item => <div key = {item.key}><img src={item.smallImgPath} /></div>)}
                  </Swiper>
                  <div>

                  </div>
                </div>

                <button type="button" className="arrow arrow_next" onClick={handleClick}>
                  <i className="icofont-simple-right"></i>
                </button>

              </div>
              <div className="slider_dots">
                {items.map((item, index) => {
                      return <span key={item.key} className={`${index === current ? "current" : ""}`}>{item.keyText}</span>
                })}

              </div>
            </div>
          </div>
          {/* </TransitionGroup> */}
        </div>

      </div>
    </section>
  );
};

export default Intro;
