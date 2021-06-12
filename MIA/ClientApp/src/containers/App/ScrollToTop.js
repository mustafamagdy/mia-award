import React, { Component } from "react";
import animateScrollTo from "animated-scroll-to";
import { withRouter } from "react-router";
class ScrollToTop extends Component {
  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      // window.scrollTo(0, 0);
      animateScrollTo(0, { speed: 200 });
    }
  }

  render() {
    return this.props.children;
  }
}

export default withRouter(ScrollToTop);
