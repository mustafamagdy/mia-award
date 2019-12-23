import React from "react";

import LanguageSelect from "./LanguageSelect";
import LoginStatus from "./LoginStatus";

const TopNav = props => (
  <div className="container hd-main">
    <div className="grid hd-main__grid">
      <div className="gcell gcell--12 gcell--md-6">
        <div className="hd-langs-curr">
          <LanguageSelect />
        </div>
      </div>
      <div className="gcell gcell--12 gcell--md-6">
        <div className="hd-login">
          {/* <ManageMyBooking /> */}
          <LoginStatus />
        </div>
      </div>
    </div>
  </div>
);

export default TopNav;
