import React, { useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import appActions from "store/app/actions";

import LanguageSelect from "./LanguageSelect";

import "sass/main_sidebar.scss";
import "sass/modals/aside.scss";
import "sass/modals/search.scss";
import "sass/modals/share_sidebar.scss";

const Sidebar = ({ toggleSidebar, toggleSearchForm, toggleShareSidebar, ...props }) => {
  return (
    <section id="main_sidebar">
      <div className="logo">
        <a href="/">
          <img src="/assets/images/small_logo.png" />
        </a>
      </div>
      <div className="sidebar_area open">
        <div className="aside_button" onClick={toggleSidebar}>
          <div className="x"></div>
          <div className="y close"></div>
          <div className="z"></div>
        </div>
      </div>
      <div className="search_area">
        <button type="button" onClick={toggleSearchForm}>
          <i className="icofont-ui-search"></i>
        </button>
      </div>
      <LanguageSelect />
      <div className="social_media">
        <a href="/facebook">
          <i className="icofont-facebook"></i>
        </a>
        <a href="/twitter">
          <i className="icofont-twitter"></i>
        </a>
        <a href="/instagram">
          <i className="icofont-instagram"></i>
        </a>
        <a href="/youtube">
          <i className="icofont-youtube"></i>
        </a>
      </div>
      <div className="share_site" onClick={toggleShareSidebar}>
        <a href="/share">
          <i className="icofont-share"></i>
        </a>
      </div>
    </section>
  );
};

const mapDispatchToProps = dispatch => bindActionCreators({ ...appActions }, dispatch);
export default connect(null, mapDispatchToProps)(Sidebar);
