import React from "react";

const Header = ({ props }) => {
  return (
    <React.Fragment>
      <header className="fixed">
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
};

export default Header;
