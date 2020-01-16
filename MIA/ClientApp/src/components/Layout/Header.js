import React from "react";
import classNames from "classnames";

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

    console.log(percentage);

    if (percentage > 0) {
      this.setState({ headerFixed: true });
    } else {
      this.setState({ headerFixed: false });
    }
  };

  render() {
    return (
      <React.Fragment>
        <header className={classNames({ fixed: this.state.headerFixed })}>
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
                  Awards
                </a>
              </li>
              <li>
                <a href="#" title="#">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" title="#">
                  News
                </a>
              </li>
              <li>
                <a href="#" title="#">
                  Program
                </a>
              </li>
              <li>
                <a href="#" title="#">
                  Gallery
                </a>
              </li>
              <li>
                <a href="#" title="#">
                  Contact US
                </a>
              </li>
            </ul>
          </div>
        </header>
      </React.Fragment>
    );
  }
}

export default Header;
