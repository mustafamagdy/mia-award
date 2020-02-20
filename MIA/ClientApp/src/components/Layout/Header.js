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
    let rootNode = document.documentElement,
      body = document.body,
      top = "scrollTop",
      height = "scrollHeight";

    // let percentage = ((rootNode[top] || body[top]) / ((rootNode[height] || body[height]) - rootNode.clientHeight)) * 100;

    if ((rootNode[top] || body[top]) > 2) {
      this.setState({ headerFixed: true });
    } else {
      this.setState({ headerFixed: false });
    }
  };

  render() {
    return (
      <React.Fragment>
        <header className={classNames({ fixed: this.state.headerFixed })}>
          <div className="container">
            <div className="logo">
              <a href="/">
                <img src="/assets/images/logo.png" />
              </a>
            </div>
            {/* <!-- end logo --> */}
            <div className="mainmenu">
              <ul>
                <li>
                  <a href="/members">
                    <Trans id="members">Members</Trans>
                  </a>
                </li>
                <li>
                  <a href="/about-us">
                    <Trans id="about_us">About Us</Trans>
                  </a>
                </li>
                <li>
                  <a href="/news">
                    <Trans id="news">News</Trans>
                  </a>
                </li>
                <li>
                  <a href="/timeline">
                    <Trans id="programs">Program</Trans>
                  </a>
                </li>
                <li>
                  <a href="/gallery">
                    <Trans id="gallery">Gallery</Trans>
                  </a>
                </li>
                <li>
                  <a href="/contact-us">
                    <Trans id="contact_us">Contact Us</Trans>
                  </a>
                </li>
                <li>
                  <a href="/booths">
                    <Trans id="booths">Booths</Trans>
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
