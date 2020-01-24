import React, { useState, useLayoutEffect } from "react";
import { Trans } from "@lingui/macro";
import classNames from "classnames";
import { TransitionGroup, CSSTransition } from "react-transition-group";
// import "sass/awards.scss";

const AwardsSlider = props => {
  const [awards, setAwards] = useState([
    {
      key: "award1",
      desc: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard
dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen
book.`,
      img: "award_movies",
      title: "movies"
    },
    {
      key: "award2",
      desc: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard
dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen
book.`,
      img: "award_sport",
      title: "sports"
    },
    {
      key: "award3",
      desc: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard
dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen
book.`,
      img: "award_movies",
      title: "movies"
    },
    {
      key: "award4",
      desc: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard
dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen
book.`,
      img: "award_sport",
      title: "sports"
    },
    {
      key: "award5",
      desc: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard
dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen
book.`,
      img: "award_movies",
      title: "movies"
    },
    {
      key: "award6",
      desc: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard
dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen
book.`,
      img: "award_sport",
      title: "sports"
    }
  ]);

  const [activeKey, setActiveKey] = useState(awards[0].key);

  const nextAward = () => {
    const item = awards.shift();
    setAwards([...awards, item]);
    setActiveKey(awards[0].key);
  };

  const prevAward = () => {
    const item = awards.pop();
    setAwards([item, ...awards]);
    setActiveKey(item.key);
  };

  return (
    <div id="apply_award">
      <div className="container">
        <div className="award_txt">
          <span>
            <Trans id="apply_for_your_award">apply for your award</Trans>
          </span>
          <p>
            brief about the DRAMA award and how to apply for it text Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of
            type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic
            typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing
            Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of .
          </p>
          <time>
            <Trans id="start_from">starts from{"  "}</Trans>
            <i>01-03-2020</i>
            <Trans id="to">
              {"  "}to{"  "}
            </Trans>
            <i>20-05-2020</i>
          </time>
          <a href="#" title="#">
            <Trans id="view_all">view all</Trans>
          </a>
        </div>
        <div className="award_slider">
          <div className="slides_items">
            <Awards awards={awards} activeKey={activeKey} />
          </div>
          <div className="slider_nav">
            <button type="button" className="arrow_prev" onClick={prevAward}>
              <i className="icofont-simple-left"></i>
            </button>
            <button type="button" className="arrow_next" onClick={nextAward}>
              <i className="icofont-simple-right"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Awards = ({ awards, activeKey }) => {
  return (
    awards &&
    awards.map((award, i) => {
      return (
        <div key={award.key} className={classNames("slide_block", { active: award.key == activeKey })}>
          <div className="imgthumb">
            <img src={`assets/images/${award.img}.png`} alt="#" />
          </div>
          <div className="apply">
            <a href="#" title="#">
              <Trans id="apply_now">apply now</Trans>
            </a>
          </div>
          <div className="title">
            <Trans id="movies">{award.title}</Trans>
          </div>
          <div className="desc">{award.desc}</div>
        </div>
      );
    })
  );
};

export default AwardsSlider;
