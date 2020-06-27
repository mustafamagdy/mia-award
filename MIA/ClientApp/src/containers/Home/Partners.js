import React, { useState, useEffect } from "react";
import classnames from "classnames";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import classNames from "classnames";
import "utils";

import "sass/partners.scss";
import Swiper from "react-id-swiper";
import { I18n } from "@lingui/react";
import { connect } from "react-redux";

const Partners = ({ sponsers, ...props }) => {
  const params = {
    spaceBetween: 20,
    slidesPerView: 1,
    slidesPerGroup: 1,
    speed: 2000,
    loop: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    breakpoints: {
      480: {
        spaceBetween: 30,
        slidesPerView: 4,
        slidesPerGroup: 4,
      },
    },
  };

  return (
    <div id="partners">
      <div className="container">
        <I18n>
          {({ i18n }) => (
            <Swiper {...params}>
              {sponsers.map((sponser) => (
                <div key={sponser.id} className="partnerItem">
                  <img src={sponser.logo} alt={sponser.name[i18n.language]} />
                  <label>{sponser.sponserType[i18n.language]}</label>
                </div>
              ))}
            </Swiper>
          )}
        </I18n>
      </div>
    </div>
  );
};

const mapStateToProps = ({ home: { sponsers } }) => ({ sponsers });
export default connect(mapStateToProps, null)(Partners);
