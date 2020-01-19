import React from "react";
import Tilt from "react-parallax-tilt";

import "sass/google_map.scss";
import "sass/tickets.scss";

const Tickets = props => {
  return (
    <React.Fragment>
      <div id="tickets_area">
        <div className="container">
          <div className="ticket_txt">
            <p>
              brief about the DRAMA award and how to apply for it text Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley
              of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of
            </p>
            <ul>
              <li>
                date 1 <i>20-05-2020</i>
              </li>
              <li>
                date 1 <i>20-05-2020</i>
              </li>
              <li>
                date 1 <i>20-05-2020</i>
              </li>
            </ul>
            <div className="buy_now">
              <a href="#" title="#">
                buy your ticket
              </a>
            </div>
          </div>
          <div className="ticket_imgthumb">
            <Tilt reset={true}>
              <img src="assets/images/tickets_img.png" alt="#" />
            </Tilt>
          </div>
        </div>
      </div>

      <div id="googlemap">
        <div className="map_nav">
          <button type="button" className="arrow_prev">
            <i className="icofont-simple-left"></i>
          </button>
          <span>Dubai opera</span>
          <button type="button" className="arrow_next">
            <i className="icofont-simple-right"></i>
          </button>
        </div>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d57754.16425696088!2d55.24657784522731!3d25.216057688437235!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f43496ad9c645%3A0xbde66e5084295162!2sDubai%20-%20United%20Arab%20Emirates!5e0!3m2!1sen!2seg!4v1579277859447!5m2!1sen!2seg"
          width="600"
          height="450"
          frameBorder="0"
          style={{ border: 0 }}
          allowFullScreen=""
        ></iframe>
      </div>
    </React.Fragment>
  );
};
export default Tickets;
