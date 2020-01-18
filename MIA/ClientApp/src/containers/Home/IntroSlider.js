import React from "react";
import { Trans } from "@lingui/macro";

import "sass/intro.scss";

const Intro = props => {
  return (
    <section id="intro">
      <div className="container">
        <div className="slide_item">
          <div className="view_award">
            <div className="big_image">
              <a href="#" title="#">
                <img src="assets/images/big_image.png" alt="#" />
              </a>
              <div className="progress_bar" style={{ width: 460 }}></div>
            </div>
            <div className="desc">
              <span>slider Title</span>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard
                dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen
                book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially
                unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more
                recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum
              </p>
              <a href="#" title="#">
                <Trans id="view_awards">view awards</Trans>
              </a>
            </div>
          </div>
        </div>
        <div className="slider_thumb">
          <div className="thmb">
            <img src="assets/images/small_image.png" alt="#" />
          </div>
          <button type="button" className="arrow_next">
            <i className="icofont-simple-right"></i>
          </button>
        </div>
        <div className="slider_dots">
          <span className="current">01</span>
          <span>02</span>
          <span>03</span>
          <span>04</span>
        </div>
      </div>
    </section>
  );
};

export default Intro;
