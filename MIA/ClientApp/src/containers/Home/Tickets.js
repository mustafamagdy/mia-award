import React from "react";
import Tilt from "react-parallax-tilt";
import { Trans } from "@lingui/macro";
import { useState } from "react";
import Map from "components/Map";
import config from "config";
import { NavLink } from "react-router-dom";

const Tickets = (props) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const previous = () => {
    let _a = activeIndex;
    if (_a < 1) _a = config.tickets.length - 1;
    else _a = _a - 1;
    setActiveIndex(_a);
  };
  const next = () => {
    let _a = activeIndex;
    if (_a >= config.tickets.length - 1) _a = 0;
    else _a = _a + 1;
    setActiveIndex(_a);
  };
  return (
    <React.Fragment>
      <div id="tickets_area">
        <div className="container">
          <div className="ticket_txt">
            <p>
              <Trans id={config.tickets[activeIndex].descriptionKey}>
                {config.tickets[activeIndex].description}
              </Trans>
            </p>
            <ul>
              {config.tickets[activeIndex].dates.map((d, i) => (
                <li key={i}>
                  <Trans id="date">date</Trans> 1 <i>{d.date}</i>
                </li>
              ))}
            </ul>
            <div className="buy_now">
              <NavLink to={`/buy-tiket/${config.tickets[activeIndex].locationId}`}>
                <Trans id="buy_your_ticket">buy your ticket</Trans>
              </NavLink>
            </div>
          </div>
          <div className="ticket_imgthumb">
            <Tilt reset={true}>
              <img src="/assets/images/tickets_img.png" alt=""/>
            </Tilt>
          </div>
        </div>
      </div>

      <div id="googlemap">
        <div className="map_nav">
          <button type="button" className="arrow_prev" onClick={previous}>
            <i className="icofont-simple-left"></i>
          </button>
          <span>
            <Trans id={config.tickets[activeIndex].titleKey}>
              {config.tickets[activeIndex].title}
            </Trans>
          </span>
          <button type="button" className="arrow_next" onClick={next}>
            <i className="icofont-simple-right"></i>
          </button>
        </div>

        <Map
          lat={config.tickets[activeIndex].location.lat}
          long={config.tickets[activeIndex].location.long}
          zoom={config.tickets[activeIndex].location.zoom}
          landMarks={[config.tickets[activeIndex].location.landMarker]}
        />
      </div>
    </React.Fragment>
  );
};
export default Tickets;
