/**
 * Footer
 */
import React from "react";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

import { Trans } from "@lingui/macro";

// app config
import Constants from "Constants";

const Footer = () => (
  <div className="rct-footer d-flex justify-content-between align-items-center">
    <ul className="list-inline footer-menus mb-0">
      <li className="list-inline-item">
        <Button component={Link} to="/app/dashboard">
          <Trans id="sidebar.gettingStarted" />
        </Button>
      </li>
      <li className="list-inline-item">
        <Button component={Link} to="/app/about-us">
          <Trans id="sidebar.aboutUs" />
        </Button>
      </li>
      <li className="list-inline-item">
        <Button component={Link} to="/app/pages/faq">
          <Trans id="sidebar.faq(s)" />
        </Button>
      </li>
      <li className="list-inline-item">
        <Button component={Link} to="/terms-condition">
          <Trans id="sidebar.terms&Conditions" />
        </Button>
      </li>
      <li className="list-inline-item">
        <Button component={Link} to="/app/pages/feedback">
          <Trans id="sidebar.feedback" />
        </Button>
      </li>
    </ul>
    <h5 className="mb-0">{Constants.copyRightText}</h5>
  </div>
);

export default Footer;
