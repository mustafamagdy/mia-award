import React, { useState } from "react";
import classNames from "classnames";
import { Trans } from "@lingui/macro";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import showsActions from "store/shows/actions";
import { useEffect } from "react";
import ReactPlayer from "react-player";
import Lightbox from "lightbox-react";
import Swiper from "react-id-swiper";
import Paginator from "components/Paginator";
import "lightbox-react/style.css"; // This only needs to be imported once in your app
import "swiper/css/swiper.css";

const Shows = ({ fetchFeaturedItems, fetchItems, featuredItems, items, pageCount, ...props }) => {
  const [slides, setSlides] = useState([]);
  const [activeTab, setActiveTab] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [currentItem, setCurrentItem] = useState(undefined);
  const [swiper, setSwiper] = useState(null);

  const tabs = ["All", "Latest", "Photos", "Videos"];

  useEffect(() => {
    fetchFeaturedItems();
  }, []);

  useEffect(() => {
    fetchItems({ pageNumber, pageSize: 10, type: tabs[activeTab] });
  }, [pageNumber, activeTab]);

  const handleActiveTab = tab => {
    setActiveTab(tab);
    setPageNumber(1);
  };

  const nextSlide = () => {
    if (swiper !== null) swiper.slideNext();
  };

  const prevSlide = () => {
    if (swiper !== null) swiper.slidePrev();
  };

  const params = {
    effect: "coverflow",
    spaceBetween: 0,
    speed: 1000,
    loop: true,
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto",
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true
    },
    rebuildOnUpdate: true,
    pagination: {
      el: ".slider_dots",
      clickable: true
    }
  };

  return (
    <section id="show_all">
      <div className="show_slider">
        <div className="container">
          <div className="slider_area">
            <div className="slider_nav">
              <button type="button" className="arrow_prev">
                <i className="icofont-simple-left"></i>
              </button>
              <button type="button" className="arrow_next">
                <i className="icofont-simple-right"></i>
              </button>
            </div>
            <div className="slider_items">
              <Swiper {...params} getSwiper={setSwiper}>
                {featuredItems.map((item, i) => (
                  <div key={item.id} className="item">
                    <div className="imgthmb">
                      <img src="/assets/images/news_image.png" />
                    </div>
                    <div className="content">
                      <div className="title">
                        <span>The blue elephant</span>
                        <time>Uploaded : 12-05-2020</time>
                      </div>
                      <div className="video_item">
                        <a href="#" title="#">
                          <img src="/assets/images/shows_item_image.png" />
                        </a>
                      </div>
                      <div className="video_details">
                        <div className="info_item">
                          <ul>
                            <li>
                              <span>Date of release :</span>
                              <p>2019</p>
                            </li>
                            <li>
                              <span>Category :</span>
                              <p>Movie</p>
                            </li>
                            <li>
                              <span>Genre :</span>
                              <p>Drama</p>
                            </li>
                            <li>
                              <span>Country :</span>
                              <p>USA</p>
                            </li>
                            <li>
                              <span>posted :</span>
                              <p>25-02-2020</p>
                            </li>
                          </ul>
                        </div>
                        <div className="user_item">
                          <div className="desc">
                            <span>User Account</span>
                            <p>Ahmed Adel</p>
                          </div>
                          <div className="imgthumb">
                            <img src="/assets/images/comment_user_image.png" />
                          </div>
                        </div>
                      </div>
                      <div className="more">
                        <a href="#" title="#">
                          View
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </Swiper>
            </div>
            <div className="slider_dots"></div>
          </div>
        </div>
      </div>
      <div className="show_blocks">
        <div className="container">
          <div className="search_filter">
            <input type="text" placeholder="show title" />
            <select name="" id="">
              <option value="" selected>
                2020
              </option>
              <option value="">2021</option>
              <option value="">2021</option>
              <option value="">2021</option>
              <option value="">2021</option>
              <option value="">2021</option>
              <option value="">2021</option>
              <option value="">2021</option>
              <option value="">2021</option>
            </select>
            <select name="" id="">
              <option value="" selected>
                award category
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
            <select name="" id="">
              <option value="" selected>
                Genre
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
            <select name="" id="">
              <option value="" selected>
                Country
              </option>
              <option value="">Country</option>
              <option value="">Country</option>
              <option value="">Country</option>
              <option value="">Country</option>
            </select>
            <button type="submit">
              <i className="icofont-ui-search"></i>
            </button>
          </div>
          <div className="shows_items">
            {items.map((item, i) => (
              <Show key={item.id} show={item} />
            ))}
          </div>
          <Paginator pageCount={pageCount} pageNumber={pageNumber} setPageNumber={setPageNumber} />
        </div>
      </div>
    </section>
  );
};

const Show = props => (
  <div className="item">
    <div className="imgthumb">
      <a href="#" title="#">
        <img src="/assets/images/show_image.png" />
        <div className="mask">
          <div className="content">
            <p>The blue elephant</p>
            {/* <Stars /> */}
          </div>
        </div>
      </a>
    </div>
  </div>
);

const Stars = props => (
  <div className="stars">
    <i className="icofont-ui-rating"></i>
    <i className="icofont-ui-rating"></i>
    <i className="icofont-ui-rating"></i>
    <i className="icofont-ui-rate-blank"></i>
    <i className="icofont-ui-rate-blank"></i>
  </div>
);

const mapStateToProps = ({
  shows: {
    items,
    featuredItems,
    items_pagination: { pageCount }
  }
}) => ({ items, featuredItems, pageCount });
const mapDispatchToProps = dispatch => bindActionCreators({ ...showsActions }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Shows);
