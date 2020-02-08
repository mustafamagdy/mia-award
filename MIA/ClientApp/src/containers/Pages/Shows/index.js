import React from "react";

const Shows = props => (
  <section id="show_all">
    <div className="show_slider">
      <div className="container">
        <div className="slider_area">
          <div className="slider_nav">
            <button type="button"className="arrow_prev">
              <i className="icofont-simple-left"></i>
            </button>
            <button type="button"className="arrow_next">
              <i className="icofont-simple-right"></i>
            </button>
          </div>
          <div className="slider_items">
            <div className="item prev_item">
              <div className="imgthmb">
                <img src="/assets/images/news_image.png" alt="#" />
              </div>
              <div className="content">
                <div className="title">
                  <span>The blue elephant</span>
                  <time>Uploaded : 12-05-2020</time>
                </div>
                <div className="video_item">
                  <a href="#" title="#">
                    <img src="/assets/images/gallery_item_image.png" alt="#" />
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
                      <img src="/assets/images/comment_user_image.png" alt="#" />
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
            <div className="item current_item">
              <div className="imgthmb">
                <img src="/assets/images/show_all_slider_image.png" alt="#" />
              </div>
              <div className="content">
                <div className="title">
                  <span>The blue elephant</span>
                  <time>Uploaded : 12-05-2020</time>
                </div>
                <div className="video_item">
                  <a href="#" title="#">
                    <img src="/assets/images/gallery_item_image.png" alt="#" />
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
                      <img src="/assets/images/comment_user_image.png" alt="#" />
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
            <div className="item next_item">
              <div className="imgthmb">
                <img src="/assets/images/news_image.png" alt="#" />
              </div>
              <div className="content">
                <div className="title">
                  <span>The blue elephant</span>
                  <time>Uploaded : 12-05-2020</time>
                </div>
                <div className="video_item">
                  <a href="#" title="#">
                    <img src="/assets/images/gallery_item_image.png" alt="#" />
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
                      <img src="/assets/images/comment_user_image.png" alt="#" />
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
          </div>
          <div className="slider_dots">
            <span className="current"></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
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
          <div className="item">
            <div className="imgthumb">
              <a href="#" title="#">
                <img src="/assets/images/show_image.png" alt="#" />
                <div className="mask">
                  <div className="content">
                    <p>The blue elephant</p>
                    <div className="stars">
                      <i className="icofont-ui-rating"></i>
                      <i className="icofont-ui-rating"></i>
                      <i className="icofont-ui-rating"></i>
                      <i className="icofont-ui-rate-blank"></i>
                      <i className="icofont-ui-rate-blank"></i>
                    </div>
                  </div>
                </div>
              </a>
            </div>
          </div>
          <div className="item">
            <div className="imgthumb">
              <a href="#" title="#">
                <img src="/assets/images/show_image2.png" alt="#" />
                <div className="mask">
                  <div className="content">
                    <p>The blue elephant</p>
                    <div className="stars">
                      <i className="icofont-ui-rating"></i>
                      <i className="icofont-ui-rating"></i>
                      <i className="icofont-ui-rating"></i>
                      <i className="icofont-ui-rate-blank"></i>
                      <i className="icofont-ui-rate-blank"></i>
                    </div>
                  </div>
                </div>
              </a>
            </div>
          </div>
          <div className="item">
            <div className="imgthumb">
              <a href="#" title="#">
                <img src="/assets/images/show_image.png" alt="#" />
                <div className="mask">
                  <div className="content">
                    <p>The blue elephant</p>
                    <div className="stars">
                      <i className="icofont-ui-rating"></i>
                      <i className="icofont-ui-rating"></i>
                      <i className="icofont-ui-rating"></i>
                      <i className="icofont-ui-rate-blank"></i>
                      <i className="icofont-ui-rate-blank"></i>
                    </div>
                  </div>
                </div>
              </a>
            </div>
          </div>
          <div className="item">
            <div className="imgthumb">
              <a href="#" title="#">
                <img src="/assets/images/show_image2.png" alt="#" />
                <div className="mask">
                  <div className="content">
                    <p>The blue elephant</p>
                    <div className="stars">
                      <i className="icofont-ui-rating"></i>
                      <i className="icofont-ui-rating"></i>
                      <i className="icofont-ui-rating"></i>
                      <i className="icofont-ui-rate-blank"></i>
                      <i className="icofont-ui-rate-blank"></i>
                    </div>
                  </div>
                </div>
              </a>
            </div>
          </div>
          <div className="item">
            <div className="imgthumb">
              <a href="#" title="#">
                <img src="/assets/images/show_image.png" alt="#" />
                <div className="mask">
                  <div className="content">
                    <p>The blue elephant</p>
                    <div className="stars">
                      <i className="icofont-ui-rating"></i>
                      <i className="icofont-ui-rating"></i>
                      <i className="icofont-ui-rating"></i>
                      <i className="icofont-ui-rate-blank"></i>
                      <i className="icofont-ui-rate-blank"></i>
                    </div>
                  </div>
                </div>
              </a>
            </div>
          </div>
          <div className="item">
            <div className="imgthumb">
              <a href="#" title="#">
                <img src="/assets/images/show_image2.png" alt="#" />
                <div className="mask">
                  <div className="content">
                    <p>The blue elephant</p>
                    <div className="stars">
                      <i className="icofont-ui-rating"></i>
                      <i className="icofont-ui-rating"></i>
                      <i className="icofont-ui-rating"></i>
                      <i className="icofont-ui-rate-blank"></i>
                      <i className="icofont-ui-rate-blank"></i>
                    </div>
                  </div>
                </div>
              </a>
            </div>
          </div>
          <div className="item">
            <div className="imgthumb">
              <a href="#" title="#">
                <img src="/assets/images/show_image.png" alt="#" />
                <div className="mask">
                  <div className="content">
                    <p>The blue elephant</p>
                    <div className="stars">
                      <i className="icofont-ui-rating"></i>
                      <i className="icofont-ui-rating"></i>
                      <i className="icofont-ui-rating"></i>
                      <i className="icofont-ui-rate-blank"></i>
                      <i className="icofont-ui-rate-blank"></i>
                    </div>
                  </div>
                </div>
              </a>
            </div>
          </div>
          <div className="item">
            <div className="imgthumb">
              <a href="#" title="#">
                <img src="/assets/images/show_image2.png" alt="#" />
                <div className="mask">
                  <div className="content">
                    <p>The blue elephant</p>
                    <div className="stars">
                      <i className="icofont-ui-rating"></i>
                      <i className="icofont-ui-rating"></i>
                      <i className="icofont-ui-rating"></i>
                      <i className="icofont-ui-rate-blank"></i>
                      <i className="icofont-ui-rate-blank"></i>
                    </div>
                  </div>
                </div>
              </a>
            </div>
          </div>
          <div className="item">
            <div className="imgthumb">
              <a href="#" title="#">
                <img src="/assets/images/show_image.png" alt="#" />
                <div className="mask">
                  <div className="content">
                    <p>The blue elephant</p>
                    <div className="stars">
                      <i className="icofont-ui-rating"></i>
                      <i className="icofont-ui-rating"></i>
                      <i className="icofont-ui-rating"></i>
                      <i className="icofont-ui-rate-blank"></i>
                      <i className="icofont-ui-rate-blank"></i>
                    </div>
                  </div>
                </div>
              </a>
            </div>
          </div>
          <div className="item">
            <div className="imgthumb">
              <a href="#" title="#">
                <img src="/assets/images/show_image2.png" alt="#" />
                <div className="mask">
                  <div className="content">
                    <p>The blue elephant</p>
                    <div className="stars">
                      <i className="icofont-ui-rating"></i>
                      <i className="icofont-ui-rating"></i>
                      <i className="icofont-ui-rating"></i>
                      <i className="icofont-ui-rate-blank"></i>
                      <i className="icofont-ui-rate-blank"></i>
                    </div>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
        <div className="paginations">
          <ul>
            <li>
              <a href="#" title="#">
                1
              </a>
            </li>
            <li>
              <a href="#" title="#">
                2
              </a>
            </li>
            <li>
              <a href="#" title="#">
                3
              </a>
            </li>
            <li className="current">
              <a href="#" title="#">
                4
              </a>
            </li>
            <li>
              <a href="#" title="#">
                5
              </a>
            </li>
            <li>
              <a href="#" title="#">
                9
              </a>
            </li>
            <li>
              <a href="#" title="#">
                10
              </a>
            </li>
            <li>
              <a href="#" title="#">
                11
              </a>
            </li>
            <li>
              <a href="#" title="#">
                12
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
);

export default Shows;
