import React, { Fragment, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import UserProvider from "containers/Providers/UserProvider";
import Sidebar from "./Sidebar";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import appActions from "store/app/actions";
import { useForm } from "react-hook-form";

import "sass/layout.scss";

const Layout = ({ toggleShareSidebar, searchFormOpen, ...props }) => {
  const dismissDlgs = event => {
    if (event.keyCode === 27 && searchFormOpen === true) {
      reset();
      const { toggleSearchForm } = props;
      toggleSearchForm();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", dismissDlgs, false);
    return () => {
      document.removeEventListener("keydown", dismissDlgs, false);
    };
  }, [searchFormOpen]);

  const onSearch = search => {
    console.log("search with ", search);
  };

  const { register, handleSubmit, reset } = useForm();
  return (
    <UserProvider>
      <section id="main_site">
        <aside>
          <div className="logo">
            <a href="#" title="#">
              MIA Awards
            </a>
          </div>
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
        </aside>
        <div id="search_modal" className="search_modal">
          <form onSubmit={handleSubmit(onSearch)}>
            <input type="text" name="search" ref={register} placeholder="Search ..." />
            <button type="submit">
              <i className="icofont-ui-search"></i>
            </button>
          </form>
        </div>
        <div id="share_sidebar">
          <div className="close_search" onClick={toggleShareSidebar}>
            <i className="icofont-close-line"></i>
          </div>
          <ul>
            <li>
              <a href="#" title="#">
                facebook
              </a>
            </li>
            <li>
              <a href="#" title="#">
                twitter
              </a>
            </li>
            <li>
              <a href="#" title="#">
                instagram
              </a>
            </li>
            <li>
              <a href="#" title="#">
                youtube
              </a>
            </li>
          </ul>
        </div>
        <Sidebar />
        <section id="wrapper">
          <Header />
          {props.children}
          <Footer />
        </section>
      </section>
    </UserProvider>
  );
};

const mapStateToProps = ({ global: { searchFormOpen } }) => ({ searchFormOpen });
const mapDispatchToProps = dispatch => bindActionCreators({ ...appActions }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Layout);
