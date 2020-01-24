import React, { useState, useEffect } from "react";
import classnames from "classnames";
import { TransitionGroup, CSSTransition } from "react-transition-group";

// import "sass/partners.scss";
const Partners = props => {
  const partners = [
    { key: "1", img: "partner_img_2" },
    { key: "2", img: "partner_img_3" },
    { key: "3", img: "partner_img_2" },
    { key: "4", img: "partner_img_4" },
    { key: "5", img: "partner_img_3" },
    { key: "6", img: "partner_img_4" }
  ];

  const maxItemPerPage = 4; //calc based on screen width
  const pages = Math.ceil(partners.length / maxItemPerPage);

  const [page, setPage] = useState(0);
  const [pagedPartners, setPagedPartners] = useState(partners.slice(0, maxItemPerPage));

  useEffect(() => {
    const interval = setInterval(() => {
      if (page >= pages - 1) {
        setPage(0);
      } else {
        setPage(page => page + 1);
      }
      const start = page * maxItemPerPage;
      const paged = partners.slice(start, start + maxItemPerPage);
      setPagedPartners(paged);
    }, 2000);

    return () => {
      clearInterval(interval);
    };
  });

  return (
    <div id="partners">
      <div className="container">
        <div className="container">
          <div className="partners_slider">
            <PagedPartners partners={pagedPartners} />
          </div>
          <div className="slider_dots">
            {new Array(pages).fill().map((a, i) => (
              <span key={i} className={classnames({ current: page == i })} onClick={() => setPage(i)}></span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const PagedPartners = ({ partners }) => {
  return (
    partners &&
    partners.map(p => (
      <div key={p.key} className="slide_item">
        <a href="#" title="#">
          <img src={`assets/images/${p.img}.png`} alt="#" />
        </a>
      </div>
    ))
  );
};

export default Partners;
