import React, { useState, useLayoutEffect } from "react";
import { Trans } from "@lingui/macro";
import classNames from "classnames";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { useEffect } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import homeActions from "store/home/actions";
import { LanguageContext } from "containers/Providers/LanguageProvider";
import config from "config";
import Swiper from "react-id-swiper";
import "swiper/css/swiper.css";
import { NavLink } from "react-router-dom";

const _AwardSliderSection = ({ awards, type,direction, ...props }) => {
  useEffect(() => {
    const _awards = awards && awards.filter((a) => a.awardType == type);
    setActiveKey(_awards[0] && _awards[0].code);
    setAwardsInSlider(_awards);
  }, [awards, type]);

  const [activeKey, setActiveKey] = useState("");
  const [awardsInSlider, setAwardsInSlider] = useState([]);
  const [animateClass, setAnimateClass] = useState("");
  const [swiper, setSwiper] = useState(null);

  return (
    <div className="award_slider">
      <div className="slides_items">
        {awardsInSlider.length ? (
          <Awards
            type={type}
            awards={awardsInSlider}
            activeKey={activeKey}
            animateClass={animateClass}
            setSwiper={setSwiper}
          />
        ) : null}
      </div>
      <div className={classNames("slider_nav", { mirrord: direction == "right" })}>
        <button type="button" className="arrow_prev" id={`prev_${type}_award`}>
          <i className="icofont-simple-left"></i>
        </button>
        <button type="button" className="arrow_next" id={`next_${type}_award`}>
          <i className="icofont-simple-right"></i>
        </button>
      </div>
    </div>
  );
};
const _AwardSliderText = ({ type, ...props }) => {
  return (
    <div className="award_txt">
      <span>
        <Trans id={`apply_for_${type}_award`}>apply for your award</Trans>
      </span>
      <p>
        <Trans id="home_general_award_text"></Trans>
      </p>
      <time>
        <Trans id="start_from">starts from{"  "}</Trans>
        <i>{config.awardDetails.startDate}</i>
        <Trans id="to">
          {"  "}to{"  "}
        </Trans>
        <i>{config.awardDetails.endDate}</i>
      </time>
    </div>
  );
};

const AwardsSlider = ({ awards, type, direction, ...props }) => {
  const [parts, setParts] = useState([]);

  useLayoutEffect(() => {
    const _parts = [];
    if (direction == "left") {
      _parts.push(
        <_AwardSliderSection awards={awards} type={type} direction={direction} {...props} />
      );
      _parts.push(<_AwardSliderText type={type} />);
    } else {
      _parts.push(<_AwardSliderText type={type} />);
      _parts.push(
        <_AwardSliderSection awards={awards} type={type} direction={direction} {...props} />
      );
    }

    setParts([..._parts]);
  }, [awards, direction]);

  return (
    <div id="apply_award">
      <div className="container">{parts}</div>
    </div>
  );
};

const Awards = ({ awards, type, activeKey, animateClass, setSwiper }) => {
  const params = {
    slidesPerView: 1,
    spaceBetween: 0,
    loop: true,
    simulateTouch: true,
    getSwiper: (swiper) => {
      setSwiper(swiper);
    },
    breakpoints: {
      991: {
        slidesPerView: 2.5,
        spaceBetween: 20,
        simulateTouch: false,
        loop: true,
      },
    },
    navigation: {
      nextEl: `#next_${type}_award`,
      prevEl: `#prev_${type}_award`,
    },
  };
  return (
    <Swiper {...params}>
      {awards.map((award, i) => (
        <div key={award.code} className="slide-item">
          <div
            className={classNames("slide_block", {
              active: award.code === activeKey,
              animateClass: award.code === activeKey ? animateClass : "",
            })}
          >
            <div className="imgthumb">
              <img src={award.trophyUrl} />
            </div>
            <div className="apply">
              <NavLink to={`/award/${award.id}`}>
                <Trans id="apply_now">apply now</Trans>
              </NavLink>
            </div>
            <LanguageContext.Consumer>
              {({ locale }) => (
                <>
                  <div
                    className="title"
                    dangerouslySetInnerHTML={{
                      __html: award.title[locale.code],
                    }}
                  ></div>
                  <div
                    className="desc"
                    dangerouslySetInnerHTML={{
                      __html: award.description[locale.code],
                    }}
                  ></div>
                </>
              )}
            </LanguageContext.Consumer>
          </div>
        </div>
      ))}
    </Swiper>
  );
};

const mapStateToProps = ({ home: { awards } }) => ({ awards });
const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ ...homeActions }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(AwardsSlider);
