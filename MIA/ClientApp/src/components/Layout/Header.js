import React from "react";
import classNames from "classnames";
import { Trans } from "@lingui/macro";
import "sass/header.scss";

class Header extends React.Component {
  state = {
    headerFixed: false
  };
  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll, { passive: true });
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  handleScroll = () => {
    //calculate the percentage where we should accept the gdpr if we scroll to without clicking accept explicitly
    // (top / height) - height * 100
    let rootNode = document.documentElement,
      body = document.body,
      top = "scrollTop",
      height = "scrollHeight";

    let percentage = ((rootNode[top] || body[top]) / ((rootNode[height] || body[height]) - rootNode.clientHeight)) * 100;

    if (percentage > 4) {
      this.setState({ headerFixed: true });
    } else {
      this.setState({ headerFixed: false });
    }
  };

  render() {
    return (
      <React.Fragment>
        <header className={classNames({ fixed: this.state.headerFixed })}>
          <div class="continer">
            <div className="logo">
              <a href="#" title="#">
                <img src="assets/images/logo.png" alt="#" />
              </a>
            </div>
            {/* <!-- end logo --> */}
            <div className="mainmenu">
              <ul>
                <li>
                  <a href="#" title="#">
                    <Trans id="awards">Awards</Trans>
                  </a>
                </li>
                <li>
                  <a href="#" title="#">
                    <Trans id="about_us">About Us</Trans>
                  </a>
                </li>
                <li>
                  <a href="#" title="#">
                    <Trans id="news">News</Trans>
                  </a>
                </li>
                <li>
                  <a href="#" title="#">
                    <Trans id="programs">Program</Trans>
                  </a>
                </li>
                <li>
                  <a href="#" title="#">
                    <Trans id="gallery">Gallery</Trans>
                  </a>
                </li>
                <li>
                  <a href="#" title="#">
                    <Trans id="contact_us">Contact US</Trans>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </header>
      </React.Fragment>
    );
  }
}

export default Header;
