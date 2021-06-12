import React from "react";
import Cookies from "js-cookie";
import { Trans } from "@lingui/macro";

class CookieGDPR extends React.PureComponent {
  static defaultProps = {
    acceptOnScrollPercentage: 25,
    cookieName: "gdpr",
    cookieValue: true,
    declineCookieValue: false,
    expires: 365,
    acceptOnScroll: true,
    hideOnAccept: true,
    hideOnDecline: true,
    onAccept: () => {},
    onDecline: () => {}
  };

  state = {
    visible: false
  };

  componentDidMount() {
    const { cookieName, acceptOnScroll } = this.props;

    // if cookie undefined, show the banner
    if (Cookies.get(cookieName) === undefined) {
      this.setState({ visible: true });
    }

    // if acceptOnScroll is set to true and cookie is undefined, add a listener.
    if (acceptOnScroll && Cookies.get(cookieName) === undefined) {
      window.addEventListener("scroll", this.handleScroll, { passive: true });
    }
  }

  componentWillUnmount() {
    // remove listener if still set
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

    if (percentage > this.props.acceptOnScrollPercentage) {
      this.accept();
    }
  };

  accept = () => {
    const { cookieName, cookieValue, expires, hideOnAccept, onAccept } = this.props;

    // fire onAccept
    onAccept();

    // remove listener if set
    window.removeEventListener("scroll", this.handleScroll);
    //set acceptance cookie
    Cookies.set(cookieName, cookieValue, { expires: expires });

    if (hideOnAccept) {
      this.setState({ visible: false });
    }
  };

  decline = () => {
    const { cookieName, declineCookieValue, expires, hideOnDecline, onDecline } = this.props;

    // fire onDecline
    onDecline();

    // remove listener if set
    window.removeEventListener("scroll", this.handleScroll);

    Cookies.set(cookieName, declineCookieValue, { expires: expires });

    if (hideOnDecline) {
      this.setState({ visible: false });
    }
  };

  render() {
    //if user accepts, render nothing
    const { visible } = this.state;
    //render nothing if user already accept
    if (!visible) return null;

    return (
      <div className={`cookie${visible ? "" : " is-hidden"}`}>
        <div className="cookie__wrap">
          <div className="container cookie__container">
            <div className="cookie__title">
              <Trans id="review_our_cookie_policy"> Review our cookie policy </Trans>
            </div>

            <div className="grid _pt-md _md-pt-def">
              <div className="gcell gcell--12 gcell--def-9">
                <div className="cookie__subtitle">
                  <Trans id="what_do_we_use_cookies_for"> What do we use cookies for? </Trans>
                </div>

                <p className="cookie__content">
                  <Trans id="we_use_cookies_and_similar_technology">
                    We use cookies and similar technologies to recognize your repeat visits and preferences, as well as to measure the
                    affectiveness of campaigns and analyze traffic. To learn more about cookies, including how to disable them, view our
                  </Trans>
                  <a href="#" className="cookie__link">
                    <Trans id="cookie_policy"> Cookie Policy </Trans>
                  </a>
                  <Trans id="by_clicking_you_accept">
                    . By clicking «I Accept» or «X» on this banner, or using our site, you consent to the use of cookies unless you have
                    disabled them.
                  </Trans>
                </p>
              </div>
              <div className="gcell gcell--12 gcell--def-3">
                <div className="cookie__btn">
                  <button className="button" onClick={this.accept}>
                    <Trans id="i_accept"> I accept </Trans>
                  </button>
                </div>
              </div>
            </div>

            <span className="cookie__close _lg-hide" onClick={this.decline}>
              <svg width="20" height="20">
                <use href="#cancel" />
              </svg>
            </span>
          </div>

          <span className="cookie__close _lg-show" onClick={this.decline}>
            <svg width="20" height="20">
              <use href="#cancel" />
            </svg>
          </span>
        </div>
      </div>
    );
  }
}

export default CookieGDPR;
