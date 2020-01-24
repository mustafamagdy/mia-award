import React, { useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import appActions from "store/app/actions";

import "sass/main_sidebar.scss";
import "sass/modals/aside.scss";
import "sass/modals/search.scss";
import "sass/modals/share_sidebar.scss";
import LanguageSelect from "./LanguageSelect";

const Sidebar = ({ toggleSidebar, toggleSearchForm, toggleShareSidebar, ...props }) => {
  return (
    <section id="main_sidebar">
      <div className="logo">
        <a href="#" title="#">
          <img src="/assets/images/small_logo.png" alt="#" />
        </a>
      </div>
      {/* <!-- to show sidebar menu please add class "open_aside" to "body" element --> */}
      <div className="sidebar_area open">
        <div className="aside_button" onClick={toggleSidebar}>
          <div className="x"></div>
          <div className="y close"></div>
          <div className="z"></div>
        </div>
        {/* <!-- end aside_button --> */}
      </div>
      {/* <!-- end sidebar_area --> */}

      {/* <!-- to show sidebar menu please add class "open_search_area" to "body" element --> */}
      <div className="search_area">
        <button type="button" onClick={toggleSearchForm}>
          <i className="icofont-ui-search"></i>
        </button>
      </div>
      {/* <!-- end search_area --> */}
      {/* <div className="language_switcher">
        <a href="#" title="#">
          EN
        </a>
      </div> */}
      <LanguageSelect />
      {/* <!-- end language_switcher --> */}
      <div className="social_media">
        <a href="#" title="#">
          <i className="icofont-facebook"></i>
        </a>
        <a href="#" title="#">
          <i className="icofont-twitter"></i>
        </a>
        <a href="#" title="#">
          <i className="icofont-instagram"></i>
        </a>
        <a href="#" title="#">
          <i className="icofont-youtube"></i>
        </a>
      </div>
      {/* <!-- end social_media --> */}
      <div className="share_site" onClick={toggleShareSidebar}>
        <a href="#" title="#">
          <i className="icofont-share"></i>
        </a>
      </div>
      {/* <!-- end share_site --> */}
    </section>
  );
};

const mapDispatchToProps = dispatch => bindActionCreators({ ...appActions }, dispatch);
export default connect(null, mapDispatchToProps)(Sidebar);
