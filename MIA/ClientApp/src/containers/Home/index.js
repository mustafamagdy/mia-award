import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import globalActions from "store/app/actions";
import Partners from "./Partners";
import AwardsSlider from "./Awards";

import "sass/main_slider.scss";
import "sass/intro.scss";
import News from "./News";
import Tickets from "./Tickets";

class Home extends React.Component {
  render() {
    return (
      <React.Fragment>
        <section id="intro">
          <div class="continer">
            <div className="slide_item">
              <div className="view_award">
                <div className="big_image">
                  <a href="#" title="#">
                    <img src="assets/images/big_image.png" alt="#" />
                  </a>
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
                    view awards
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
        <section id="another_content">
          <AwardsSlider />
          <Tickets />
          <News />
          <Partners />
        </section>
      </React.Fragment>
    );
  }
}
const mapDispatchToProps = dispatch => bindActionCreators({ ...globalActions }, dispatch);
export default connect(null, mapDispatchToProps)(Home);
