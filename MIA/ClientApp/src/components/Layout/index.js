import React, { Fragment, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import UserProvider from "containers/Providers/UserProvider";
import Sidebar from "./Sidebar";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import appActions from "store/app/actions";
import { Trans } from "@lingui/macro";
import { useForm } from "react-hook-form";


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
      <React.Fragment>
        <aside className="menu">
          <div className="logo">
            <a href="/">MIA Awards</a>
          </div>
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
                  <Trans id="program">Program</Trans>
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
              <a href="/facebook">facebook</a>
            </li>
            <li>
              <a href="/twitter">twitter</a>
            </li>
            <li>
              <a href="/instagram">instagram</a>
            </li>
            <li>
              <a href="/youtube">youtube</a>
            </li>
          </ul>
        </div>
        <Sidebar />
        <section id="wrapper">
          <Header />
          {props.children}
          <Footer />
        </section>
      </React.Fragment>
    </UserProvider>
  );
};

const mapStateToProps = ({ global: { searchFormOpen } }) => ({ searchFormOpen });
const mapDispatchToProps = dispatch => bindActionCreators({ ...appActions }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Layout);
