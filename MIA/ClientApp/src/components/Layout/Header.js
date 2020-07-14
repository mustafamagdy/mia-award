import React from "react";
import classNames from "classnames";
import { Trans } from "@lingui/macro";
import "sass/header.scss";
import config from "config";
import { NavLink } from "react-router-dom";

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
              <NavLink to="/">
                <img src="/assets/images/logo.png" />
              </NavLink>
            </div>
            {/* <!-- end logo --> */}
            <div className="mainmenu">
              <ul>
                {config.menu.map((m, i) => (
                  <li key={m.label}>
                    <NavLink to={m.route}>
                      <Trans id={m.label}>{m.label}</Trans>
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </header>
      </React.Fragment>
    );
  }
}

export default Header;
