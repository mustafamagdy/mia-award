import React from "react";

import "sass/news_category.scss";

const News = pros => (
  <section id="news_category">
    <div className="news_slider">
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
            <div className="item prev_item">
              <div className="imgthmb">
                <img src="/assets/images/news_image.png" alt="#" />
              </div>
              <div className="content">
                <span>And Mo Salah Makes football history for real</span>
                <p>category name</p>
                <time>Posted : 12-05-2020</time>
                <b>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
                  aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis. Lorem ipsum
                  dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum
                  suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.
                </b>
              </div>
            </div>
            <div className="item current_item">
              <div className="imgthmb">
                <img src="/assets/images/news_image.png" alt="#" />
              </div>
              <div className="content">
                <div className="desc">
                  <span>And Mo Salah Makes football history for real</span>
                  <p>category name</p>
                  <time>Posted : 12-05-2020</time>
                  <b>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis. Lorem
                    ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.
                  </b>
                </div>
                <div className="more">
                  <a href="/news/123" title="#">
                    Read More
                  </a>
                </div>
              </div>
            </div>
            <div className="item next_item">
              <div className="imgthmb">
                <img src="/assets/images/news_image.png" alt="#" />
              </div>
              <div className="content">
                <span>And Mo Salah Makes football history for real</span>
                <p>category name</p>
                <b>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
                  aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis. Lorem ipsum
                  dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum
                  suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.
                </b>
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
    <div className="news_features">
      <div className="container">
        <div className="title">
          <div className="name">News</div>
          <div className="customize">
            <select name="" id="">
              <option value="" selected>
                News Type
              </option>
              <option value="">News Type</option>
              <option value="">News Type</option>
              <option value="">News Type</option>
              <option value="">News Type</option>
              <option value="">News Type</option>
              <option value="">News Type</option>
              <option value="">News Type</option>
              <option value="">News Type</option>
            </select>
            <div className="change_grid">
              <button type="button">
                <i className="icofont-listing-box"></i>
              </button>
              <button type="button" className="active">
                <i className="icofont-brand-microsoft"></i>
              </button>
            </div>
          </div>
        </div>
        <div className="blocks_news active">
          <div className="feature_item">
            <div className="feature_block">
              <time>15-01-2020</time>
              <div className="item">
                <div className="category">
                  <p>sports</p>
                </div>
                <div className="imgthumb">
                  <img src="/assets/images/news_image_1.png" alt="#" />
                  <div className="mask">
                    <div className="content">
                      <p>And Mo Salah Makes football history for real</p>
                      <div className="more">
                        <a href="/news/123" title="#">
                          read more
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="feature_item">
            <div className="feature_block">
              <time>15-01-2020</time>
              <div className="item">
                <div className="category">
                  <p>media</p>
                </div>
                <div className="imgthumb">
                  <img src="/assets/images/news_image_2.jpg" alt="#" />
                  <div className="mask">
                    <div className="content">
                      <p>And Mo Salah Makes football history for real</p>
                      <div className="more">
                        <a href="/news/123" title="#">
                          read more
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="feature_item">
            <div className="feature_block">
              <time>15-01-2020</time>
              <div className="item">
                <div className="category">
                  <p>sports</p>
                </div>
                <div className="imgthumb">
                  <img src="/assets/images/news_image_1.png" alt="#" />
                  <div className="mask">
                    <div className="content">
                      <p>And Mo Salah Makes football history for real</p>
                      <div className="more">
                        <a href="/news/123" title="#">
                          read more
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="feature_item">
            <div className="feature_block">
              <time>15-01-2020</time>
              <div className="item">
                <div className="category">
                  <p>media</p>
                </div>
                <div className="imgthumb">
                  <img src="/assets/images/news_image_2.jpg" alt="#" />
                  <div className="mask">
                    <div className="content">
                      <p>And Mo Salah Makes football history for real</p>
                      <div className="more">
                        <a href="/news/123" title="#">
                          read more
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="feature_item">
            <div className="feature_block">
              <time>15-01-2020</time>
              <div className="item">
                <div className="category">
                  <p>sports</p>
                </div>
                <div className="imgthumb">
                  <img src="/assets/images/news_image_1.png" alt="#" />
                  <div className="mask">
                    <div className="content">
                      <p>And Mo Salah Makes football history for real</p>
                      <div className="more">
                        <a href="/news/123" title="#">
                          read more
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="feature_item">
            <div className="feature_block">
              <time>15-01-2020</time>
              <div className="item">
                <div className="category">
                  <p>media</p>
                </div>
                <div className="imgthumb">
                  <img src="/assets/images/news_image_2.jpg" alt="#" />
                  <div className="mask">
                    <div className="content">
                      <p>And Mo Salah Makes football history for real</p>
                      <div className="more">
                        <a href="/news/123" title="#">
                          read more
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
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
        <div className="listing_news">
          <div className="item">
            <div className="imgthmb">
              <img src="/assets/images/listing_news_image.png" alt="#" />
            </div>
            <div className="content">
              <div className="desc">
                <span>And Mo Salah Makes football history for real</span>
                <p>category name</p>
                <time>Posted : 12-05-2020</time>
                <b>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
                  aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis. Lorem ipsum
                  dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut{" "}
                </b>
              </div>
              <div className="more">
                <a href="/news/123" title="#">
                  Read More..
                </a>
              </div>
            </div>
          </div>
          <div className="item">
            <div className="imgthmb">
              <img src="/assets/images/listing_news_image.png" alt="#" />
            </div>
            <div className="content">
              <div className="desc">
                <span>And Mo Salah Makes football history for real</span>
                <p>category name</p>
                <time>Posted : 12-05-2020</time>
                <b>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
                  aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis. Lorem ipsum
                  dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut{" "}
                </b>
              </div>
              <div className="more">
                <a href="/news/123" title="#">
                  Read More..
                </a>
              </div>
            </div>
          </div>
          <div className="item">
            <div className="imgthmb">
              <img src="/assets/images/listing_news_image.png" alt="#" />
            </div>
            <div className="content">
              <div className="desc">
                <span>And Mo Salah Makes football history for real</span>
                <p>category name</p>
                <time>Posted : 12-05-2020</time>
                <b>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
                  aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis. Lorem ipsum
                  dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut{" "}
                </b>
              </div>
              <div className="more">
                <a href="/news/123" title="#">
                  Read More..
                </a>
              </div>
            </div>
          </div>
          <div className="item">
            <div className="imgthmb">
              <img src="/assets/images/listing_news_image.png" alt="#" />
            </div>
            <div className="content">
              <div className="desc">
                <span>And Mo Salah Makes football history for real</span>
                <p>category name</p>
                <time>Posted : 12-05-2020</time>
                <b>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
                  aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis. Lorem ipsum
                  dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut{" "}
                </b>
              </div>
              <div className="more">
                <a href="/news/123" title="#">
                  Read More..
                </a>
              </div>
            </div>
          </div>
          <div className="item">
            <div className="imgthmb">
              <img src="/assets/images/listing_news_image.png" alt="#" />
            </div>
            <div className="content">
              <div className="desc">
                <span>And Mo Salah Makes football history for real</span>
                <p>category name</p>
                <time>Posted : 12-05-2020</time>
                <b>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
                  aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis. Lorem ipsum
                  dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut{" "}
                </b>
              </div>
              <div className="more">
                <a href="/news/123" title="#">
                  Read More..
                </a>
              </div>
            </div>
          </div>
          <div className="item">
            <div className="imgthmb">
              <img src="/assets/images/listing_news_image.png" alt="#" />
            </div>
            <div className="content">
              <div className="desc">
                <span>And Mo Salah Makes football history for real</span>
                <p>category name</p>
                <time>Posted : 12-05-2020</time>
                <b>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
                  aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis. Lorem ipsum
                  dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut{" "}
                </b>
              </div>
              <div className="more">
                <a href="/news/123" title="#">
                  Read More..
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
    </div>
  </section>
);

export default News;
