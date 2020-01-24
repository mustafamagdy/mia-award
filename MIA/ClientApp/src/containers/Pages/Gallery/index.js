import React from "react";

import "sass/gallery.scss";

const Gallery = props => (
  <section id="gallery">
    <div className="gallery_slider">
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
              <img src="/assets/images/gallery_slider_img2.png" alt="#" />
              <div className="zoom_image">
                <a href="#" title="#">
                  <i className="icofont-ui-zoom-in"></i>
                </a>
              </div>
            </div>
            <div className="item current_item">
              <img src="/assets/images/gallery_slider_img.png" alt="#" />
              <div className="zoom_image">
                <a href="#" title="#">
                  <i className="icofont-ui-zoom-in"></i>
                </a>
              </div>
            </div>
            <div className="item next_item">
              <img src="/assets/images/gallery_slider_img2.png" alt="#" />
              <div className="zoom_image">
                <a href="#" title="#">
                  <i className="icofont-ui-zoom-in"></i>
                </a>
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
    <div className="gallery_tabs">
      <div className="container">
        <div className="title">
          <div className="name">Gallery</div>
          <div className="tabs">
            <ul>
              <li className="active">All</li>
              <li>Latest</li>
              <li>Photos</li>
              <li>Videos</li>
            </ul>
          </div>
        </div>
        <div className="tab_content active">
          <div className="gallery_items">
            <div className="item video">
              <a href="#" title="#">
                <img src="/assets/images/gallery_item_image.png" alt="#" />
              </a>
            </div>
            <div className="item photo">
              <a href="#" title="#">
                <img src="/assets/images/gallery_item_image2.png" alt="#" />
              </a>
            </div>
            <div className="item video">
              <a href="#" title="#">
                <img src="/assets/images/gallery_item_image2.png" alt="#" />
              </a>
            </div>
            <div className="item photo">
              <a href="#" title="#">
                <img src="/assets/images/gallery_item_image.png" alt="#" />
              </a>
            </div>
            <div className="item video">
              <a href="#" title="#">
                <img src="/assets/images/gallery_item_image2.png" alt="#" />
              </a>
            </div>
            <div className="item photo">
              <a href="#" title="#">
                <img src="/assets/images/gallery_item_image2.png" alt="#" />
              </a>
            </div>
            <div className="item video">
              <a href="#" title="#">
                <img src="/assets/images/gallery_item_image.png" alt="#" />
              </a>
            </div>
            <div className="item photo">
              <a href="#" title="#">
                <img src="/assets/images/gallery_item_image2.png" alt="#" />
              </a>
            </div>
            <div className="item video">
              <a href="#" title="#">
                <img src="/assets/images/gallery_item_image.png" alt="#" />
              </a>
            </div>
            <div className="item photo">
              <a href="#" title="#">
                <img src="/assets/images/gallery_item_image2.png" alt="#" />
              </a>
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

export default Gallery;
