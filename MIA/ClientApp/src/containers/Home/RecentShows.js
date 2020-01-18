import React from "react";
import { Trans } from "@lingui/macro";

import "sass/recent_shows.scss";

const Rating = ({ rate, ...props }) => {
  const maxRating = 5;
  return (
    <div className="stars">
      {rate > 0 && new Array(rate).fill().map((_, a) => <i className="icofont-ui-rating" key={a}></i>)}
      {maxRating - rate > 0 && new Array(maxRating - rate).fill().map((_, a) => <i className="icofont-ui-rate-blank" key={a}></i>)}
    </div>
  );
};

const RecentShows = props => {
  const recentShows = new Array(10).fill().map((_, a) => ({
    poster: a % 2 > 0 ? "show_image" : "show_image2",
    title: "The blue elephant",
    rating: Math.floor(Math.random() * 5)
  }));
  const pages = [1, 2, 3, 4, 5];
  return (
    <div id="recent_shows">
      <div className="container">
        <div className="title">
          <Trans id="recent_shows">recent shows</Trans>
        </div>
        <div className="search_filter">
          <form action="#">
            <input type="text" placeholder="show title" />
            <select name="" id="" defaultValue="">
              <option value="">2020</option>
              <option value="">2021</option>
              <option value="">2021</option>
              <option value="">2021</option>
              <option value="">2021</option>
              <option value="">2021</option>
              <option value="">2021</option>
              <option value="">2021</option>
              <option value="">2021</option>
            </select>
            <select name="" id="" defaultValue="">
              <option value="">
                <Trans id="award_category">award category</Trans>
              </option>
              <option value="">drama</option>
              <option value="">sport</option>
              <option value="">drama</option>
              <option value="">sport</option>
              <option value="">drama</option>
              <option value="">sport</option>
              <option value="">drama</option>
              <option value="">sport</option>
            </select>
            <select name="" id="" defaultValue="">
              <option value="">
                <Trans id="genre">Genre</Trans>
              </option>
              <option value="">drama</option>
              <option value="">sport</option>
              <option value="">drama</option>
              <option value="">sport</option>
              <option value="">drama</option>
              <option value="">sport</option>
              <option value="">drama</option>
              <option value="">sport</option>
            </select>
            <select name="" id="" defaultValue="">
              <option value="">
                <Trans id="country">Country</Trans>
              </option>
              <option value="">Country</option>
              <option value="">Country</option>
              <option value="">Country</option>
              <option value="">Country</option>
            </select>
            <button type="submit">
              <i className="icofont-ui-search"></i>
            </button>
          </form>
        </div>
        <div className="shows_items">
          {recentShows.map((show, i) => (
            <div className="item" key={i}>
              <div className="imgthumb">
                <a href="#" title="#">
                  <img src={`assets/images/${show.poster}.png`} alt="#" />
                  <div className="mask">
                    <div className="content">
                      <p>{show.title}</p>
                      <Rating rate={show.rating} readonly />
                    </div>
                  </div>
                </a>
              </div>
            </div>
          ))}
        </div>
        <div className="paginations">
          <ul>
            {pages.map((p, i) => (
              <li key={i}>
                <a href="#" title="#">
                  {p}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default RecentShows;
