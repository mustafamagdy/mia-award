import React, { useState, useEffect } from "react";
import classnames from "classnames";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import classNames from "classnames";
import "utils";

import "sass/partners.scss";
import Swiper from "react-id-swiper";

const Partners = props => {
  const [partners, setPartners] = useState([
    { key: "1", img: "partner_img_1" },
    { key: "2", img: "partner_img_3" },
    { key: "3", img: "partner_img_2" },
    { key: "4", img: "partner_img_4" },
    { key: "5", img: "partner_img_3" },
    { key: "6", img: "partner_img_4" },
    { key: "7", img: "partner_img_1" },
    { key: "8", img: "partner_img_3" },
    { key: "9", img: "partner_img_2" }
  ]);
  const params = {
    spaceBetween: 20,
    slidesPerView: 1,
    slidesPerGroup: 1,
    speed: 2000,
    loop: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true
    },
    breakpoints: {
      480: {
        spaceBetween: 30,
        slidesPerView: 4,
        slidesPerGroup: 4
      }
    }
  };

  return (
    <div id="partners">
      <div className="container">
        <Swiper {...params}>
          {partners.map(partner => (
            <div key={partner.key}>
              <img src={`assets/images/${partner.img}.png`} />
            </div>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Partners;
