import React from "react";
import "sass/partners.scss";

const Partners = props => {
  return (
    <div id="partners">
      <div className="continer">
        <div className="container">
          <div className="partners_slider">
            <div className="slide_item">
              <a href="#" title="#">
                <img src="assets/images/partner_img_1.png" alt="#" />
              </a>
            </div>
            <div className="slide_item">
              <a href="#" title="#">
                <img src="assets/images/partner_img_2.png" alt="#" />
              </a>
            </div>
            <div className="slide_item">
              <a href="#" title="#">
                <img src="assets/images/partner_img_3.png" alt="#" />
              </a>
            </div>
            <div className="slide_item">
              <a href="#" title="#">
                <img src="assets/images/partner_img_4.png" alt="#" />
              </a>
            </div>
            <div className="slide_item">
              <a href="#" title="#">
                <img src="assets/images/partner_img_1.png" alt="#" />
              </a>
            </div>
            <div className="slide_item">
              <a href="#" title="#">
                <img src="assets/images/partner_img_2.png" alt="#" />
              </a>
            </div>
            <div className="slide_item">
              <a href="#" title="#">
                <img src="assets/images/partner_img_3.png" alt="#" />
              </a>
            </div>
            <div className="slide_item">
              <a href="#" title="#">
                <img src="assets/images/partner_img_4.png" alt="#" />
              </a>
            </div>
          </div>
          <div className="slider_dots">
            {/* <!-- when user select slider number please add class "current" --> */}
            <span className="current"></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Partners;
