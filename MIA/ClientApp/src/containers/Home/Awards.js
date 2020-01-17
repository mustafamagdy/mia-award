import React from "react";
import { Trans } from "@lingui/macro";
import "sass/awards.scss";

const AwardsSlider = props => {
  return (
    <div id="apply_award">
      <div class="continer">
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
            <div className="slide_block active">
              <div className="imgthumb">
                <img src="assets/images/award_movies.png" alt="#" />
              </div>
              <div className="apply">
                <a href="#" title="#">
                  <Trans id="apply_now">apply now</Trans>
                </a>
              </div>
              <div className="title">
                <Trans id="movies">movies</Trans>
              </div>
              <div className="desc">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard
                dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen
                book.
              </div>
            </div>
            <div className="slide_block">
              <div className="imgthumb">
                <img src="assets/images/award_sport.png" alt="#" />
              </div>
              <div className="apply">
                <a href="#" title="#">
                  <Trans id="apply_now">apply now</Trans>
                </a>
              </div>
              <div className="title">
                <Trans id="sports">sports</Trans>
              </div>
              <div className="desc">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard
                dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen
                book.
              </div>
            </div>
            <div className="slide_block">
              <div className="imgthumb">
                <img src="assets/images/award_movies.png" alt="#" />
              </div>
              <div className="apply">
                <a href="#" title="#">
                  <Trans id="apply_now">apply now</Trans>
                </a>
              </div>
              <div className="title">
                <Trans id="movies">movies</Trans>
              </div>
              <div className="desc">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard
                dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen
                book.
              </div>
            </div>
            <div className="slide_block">
              <div className="imgthumb">
                <img src="assets/images/award_sport.png" alt="#" />
              </div>
              <div className="title">
                <Trans id="sports">sports</Trans>
              </div>
              <div className="desc">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard
                dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen
                book.
              </div>
            </div>
            <div className="slide_block">
              <div className="imgthumb">
                <img src="assets/images/award_movies.png" alt="#" />
              </div>
              <div className="apply">
                <a href="#" title="#">
                  <Trans id="apply_now">apply now</Trans>
                </a>
              </div>
              <div className="title">
                <Trans id="movies">movies</Trans>
              </div>
              <div className="desc">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard
                dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen
                book.
              </div>
            </div>
            <div className="slide_block">
              <div className="imgthumb">
                <img src="assets/images/award_sport.png" alt="#" />
              </div>
              <div className="apply">
                <a href="#" title="#">
                  <Trans id="apply_now">apply now</Trans>
                </a>
              </div>
              <div className="title">
                <Trans id="sports">sports</Trans>
              </div>
              <div className="desc">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard
                dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen
                book.
              </div>
            </div>
          </div>
          <div className="slider_nav">
            <button type="button" className="arrow_prev">
              <i className="icofont-simple-left"></i>
            </button>
            <button type="button" className="arrow_next">
              <i className="icofont-simple-right"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AwardsSlider;
