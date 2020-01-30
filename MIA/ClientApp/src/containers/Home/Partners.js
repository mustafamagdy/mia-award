import React, { useState, useEffect } from "react";
import classnames from "classnames";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import classNames from "classnames";
import "utils";

// import "sass/partners.scss";
const Partners = props => {
  const [partners, setPartners] = useState([
    { key: "1", img: "partner_img_2" },
    { key: "2", img: "partner_img_3" },
    { key: "3", img: "partner_img_2" },
    { key: "4", img: "partner_img_4" },
    { key: "5", img: "partner_img_3" },
    { key: "6", img: "partner_img_4" }
  ]);

  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(partners.chunk(4).length);

  useEffect(() => {
    const interval = setInterval(() => {
      if (page >= pages) {
        setPage(1);
      } else {
        const _page = page + 1;
        setPage(_page);
      }
    }, 2000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div id="partners">
      <div className="container">
        <div className="container">
          <div className="partners_slider">
            {partners.chunk(4).map((chunk, i) => {
              const isActive = i == page - 1;
              return (
                <div key={i} className={classNames("slide_page", { active: isActive })}>
                  {chunk &&
                    chunk.map(p => (
                      <div key={p.key} className="slide_item">
                        <span>
                          <img src={`assets/images/${p.img}.png`} />
                        </span>
                      </div>
                    ))}
                </div>
              );
            })}
          </div>
          <div className="slider_dots">
            {new Array(pages).fill().map((_, i) => (
              <span key={i} className={classnames({ current: i == page - 1 })} onClick={() => setPage(i + 1)}></span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Partners;
