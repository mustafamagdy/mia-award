import React from "react";
import Tilt from "react-parallax-tilt";
import { Trans } from "@lingui/macro";
import { useState } from "react";
import Map from "components/Map";

// import "sass/google_map.scss";
// import "sass/tickets.scss";

const Tickets = props => {
  const locations = [
    {
      locationId: 1,
      location: {
        lat: 25.1948729,
        long: 55.2654525,
        zoom: 15.76,
        landMarker: {
          id: "1",
          icon: "./assets/images/markers/marker.svg",
          name: "Dubai opera",
          lat: 25.1948729,
          long: 55.2654525
        }
      },
      titleKey: "location1_title",
      title: "Dubai opera",
      descriptionKey: "location1_description",
      description: `brief about the DRAMA award and how to apply for it text Lorem Ipsum is simply dummy text of the printing and typesetting
      industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a
      galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap
      into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset
      sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including
      versions of`,
      mapLocation: { lat: 1, long: 2 },
      dates: [{ date: "20-05-2020" }, { date: "21-05-2020" }, { date: "22-05-2020" }]
    },
    {
      locationId: 2,
      location: {
        lat: 25.1559204,
        long: 55.2977487,
        zoom: 17,
        landMarker: {
          id: "2",
          icon: "./assets/images/markers/marker.svg",
          name: "Medan hotel",
          lat: 25.1559204,
          long: 55.2977487
        }
      },
      titleKey: "location1_title",
      title: "Medan hotel",
      descriptionKey: "location1_description",
      description: `brief about the DRAMA award and how to apply for it text Lorem Ipsum is simply dummy text of the printing and typesetting
      industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a
      galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap
      into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset
      sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including
      versions of`,
      mapLocation: { lat: 1, long: 2 },
      dates: [{ date: "29-05-2020" }, { date: "30-05-2020" }]
    }
  ];
  const [activeIndex, setActiveIndex] = useState(0);
  const previous = () => {
    let _a = activeIndex;
    if (_a < 1) _a = locations.length - 1;
    else _a = _a - 1;
    console.log("prev ", _a);
    setActiveIndex(_a);
  };
  const next = () => {
    let _a = activeIndex;
    if (_a >= locations.length - 1) _a = 0;
    else _a = _a + 1;
    console.log("next ", _a);
    setActiveIndex(_a);
  };
  return (
    <React.Fragment>
      <div id="tickets_area">
        <div className="container">
          <div className="ticket_txt">
            <p>
              <Trans id={locations[activeIndex].descriptionKey}>{locations[activeIndex].description}</Trans>
            </p>
            <ul>
              {locations[activeIndex].dates.map((d, i) => (
                <li key={i}>
                  <Trans id="date">date</Trans> 1 <i>{d.date}</i>
                </li>
              ))}
            </ul>
            <div className="buy_now">
              <a href={`/buy-tiket/${locations[activeIndex].locationId}`}>
                <Trans id="buy_your_ticket">buy your ticket</Trans>
              </a>
            </div>
          </div>
          <div className="ticket_imgthumb">
            <Tilt reset={true}>
              <img src="/assets/images/tickets_img.png" />
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
            <Trans id={locations[activeIndex].titleKey}>{locations[activeIndex].title}</Trans>
          </span>
          <button type="button" className="arrow_next" onClick={next}>
            <i className="icofont-simple-right"></i>
          </button>
        </div>

        <Map
          lat={locations[activeIndex].location.lat}
          long={locations[activeIndex].location.long}
          zoom={locations[activeIndex].location.zoom}
          landMarks={[locations[activeIndex].location.landMarker]}
        />
      </div>
    </React.Fragment>
  );
};
export default Tickets;
