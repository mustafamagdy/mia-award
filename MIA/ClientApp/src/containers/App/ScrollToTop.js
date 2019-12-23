import React from "react";
import animateScrollTo from "animated-scroll-to";

const ScrollToTop = props => {
  const scrollToTop = () => {
    animateScrollTo(0, { speed: 400 });
  };
  return (
    <div className="js-init scroll-up scroll-up--show" onClick={scrollToTop}>
      <span className="svg">
        <svg width="17" height="17">
          <use href="#icon-chevron-top" />
        </svg>
      </span>
    </div>
  );
};

export default ScrollToTop;
