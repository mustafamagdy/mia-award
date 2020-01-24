import React from "react";

import "sass/news_single.scss";

const NewsView = props => (
  <section id="news_single">
    <div className="container">
      <div className="data_side">
        <div className="post_imgthumb">
          <img src="/assets/images/news_single_image.png" alt="#" />
        </div>
        <div className="post_details">
          <div className="share">
            <span>Share :</span>
            <a href="#" title="#">
              <i className="icofont-facebook"></i>
            </a>
            <a href="#" title="#">
              <i className="icofont-twitter"></i>
            </a>
            <a href="#" title="#">
              <i className="icofont-instagram"></i>
            </a>
            <a href="#" title="#">
              <i className="icofont-youtube"></i>
            </a>
          </div>
          <time>Posted : 12-05-2020</time>
        </div>
        <div className="title">The Blue Elephant (News Title)</div>
        <div className="content">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text
          ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived
          not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the
          1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like
          Aldus PageMaker including versions of Lorem Ipsum Lorem Ipsum passages, and more recently with desktop publishing software like
          Aldus PageMaker including versions of Lorem Ipsum
        </div>
        <div className="comments_area">
          <div className="item">
            <div className="user_info">
              <div className="imgthumb">
                <img src="/assets/images/comment_user_image.png" alt="#" />
              </div>
              <div className="details">
                <span>Best Marvel Movie in my opinion</span>
                <p>
                  25 March 2020 by{" "}
                  <a href="#" title="#">
                    Ahmed Adel
                  </a>
                </p>
              </div>
            </div>
            <div className="comment_content">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis. Lorem ipsum dolor sit
              amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse
              ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.
            </div>
          </div>
          <div className="item">
            <div className="user_info">
              <div className="imgthumb">
                <img src="/assets/images/comment_user_image.png" alt="#" />
              </div>
              <div className="details">
                <span>Best Marvel Movie in my opinion</span>
                <p>
                  25 March 2020 by{" "}
                  <a href="#" title="#">
                    Ahmed Adel
                  </a>
                </p>
              </div>
            </div>
            <div className="comment_content">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis. Lorem ipsum dolor sit
              amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse
              ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.
            </div>
          </div>
          <div className="item">
            <div className="user_info">
              <div className="imgthumb">
                <img src="/assets/images/comment_user_image.png" alt="#" />
              </div>
              <div className="details">
                <span>Best Marvel Movie in my opinion</span>
                <p>
                  25 March 2020 by{" "}
                  <a href="#" title="#">
                    Ahmed Adel
                  </a>
                </p>
              </div>
            </div>
            <div className="comment_content">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis. Lorem ipsum dolor sit
              amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse
              ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.
            </div>
          </div>
          <div className="item">
            <div className="user_info">
              <div className="imgthumb">
                <img src="/assets/images/comment_user_image.png" alt="#" />
              </div>
              <div className="details">
                <span>Best Marvel Movie in my opinion</span>
                <p>
                  25 March 2020 by{" "}
                  <a href="#" title="#">
                    Ahmed Adel
                  </a>
                </p>
              </div>
            </div>
            <div className="comment_content">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis. Lorem ipsum dolor sit
              amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse
              ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.
            </div>
          </div>
          <div className="item">
            <div className="user_info">
              <div className="imgthumb">
                <img src="/assets/images/comment_user_image.png" alt="#" />
              </div>
              <div className="details">
                <span>Best Marvel Movie in my opinion</span>
                <p>
                  25 March 2020 by{" "}
                  <a href="#" title="#">
                    Ahmed Adel
                  </a>
                </p>
              </div>
            </div>
            <div className="comment_content">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis. Lorem ipsum dolor sit
              amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse
              ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.
            </div>
          </div>
        </div>
        <div className="comment_form">
          <form action="#">
            <div className="inputs">
              <input type="text" placeholder="Name" />
              <input type="text" placeholder="Comment Title" />
            </div>
            <textarea name="" id="" cols="30" rows="10" placeholder="Type here your Comment"></textarea>
            <button type="submit">Post Comment</button>
          </form>
        </div>
      </div>
      <div className="side_bar">
        <div className="small_banner">
          <a href="#" title="#">
            <img src="/assets/images/small_banner.png" alt="#" />
          </a>
        </div>
        <div className="big_banner">
          <a href="#" title="#">
            <img src="/assets/images/big_banner.png" alt="#" />
          </a>
        </div>
        <div className="related_news">
          <div className="title">Related News</div>
          <div className="item">
            <a href="#" title="#">
              <img src="/assets/images/related_news_image.png" alt="#" />
            </a>
          </div>
          <div className="item">
            <a href="#" title="#">
              <img src="/assets/images/related_news_image.png" alt="#" />
            </a>
          </div>
          <div className="item">
            <a href="#" title="#">
              <img src="/assets/images/related_news_image.png" alt="#" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default NewsView;
