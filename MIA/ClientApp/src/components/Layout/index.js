import React, { Fragment, useEffect, useRef, forwardRef, useImperativeHandle } from "react";
import Header from "./Header";
import Footer from "./Footer";
import UserProvider from "containers/Providers/UserProvider";
import Sidebar from "./Sidebar";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import appActions from "store/app/actions";
import { Trans } from "@lingui/macro";
import { useForm } from "react-hook-form";
import config from "config";
import { withRouter } from "react-router";
import { useOnClickOutside } from "hooks";

const SearchForm = forwardRef(({ history, hideAndReset }, ref) => {
  const { register, handleSubmit, reset } = useForm();
  const overlayRef = useRef();
  useOnClickOutside(overlayRef, () => hideAndReset());

  const onSearch = q => {
    hideAndReset();
    history.push("/shows/?q=" + q.search);
  };

  useImperativeHandle(ref, () => ({
    reset() {
      reset();
    }
  }));

  return (
    <form onSubmit={handleSubmit(onSearch)} ref={overlayRef}>
      <input type="text" name="search" ref={register} placeholder="Search ..." />
      <button type="submit">
        <i className="icofont-ui-search"></i>
      </button>
    </form>
  );
});

const Layout = ({ toggleShareSidebar, searchFormOpen, history, toggleSearchForm, ...props }) => {
  const searchFormRef = useRef();

  const dismissDlgs = event => {
    if (event.keyCode === 27 && searchFormOpen === true) {
      hideAndReset();
    }
  };

  const hideAndReset = () => {
    if (!!searchFormOpen) {
      searchFormRef.current.reset();
      toggleSearchForm();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", dismissDlgs, false);
    return () => {
      document.removeEventListener("keydown", dismissDlgs, false);
    };
  }, [searchFormOpen]);

  return (
    <UserProvider>
      <React.Fragment>
        <aside className="menu">
          <div className="logo">
            <a href="/">MIA Awards</a>
          </div>
          <div className="mainmenu">
            <ul>
              {config.menu.map((m, i) => (
                <li>
                  <a href={m.location}>
                    <Trans id={m.label}>{m.label}</Trans>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </aside>
        <div id="search_modal" className="search_modal">
          <SearchForm ref={searchFormRef} history={history} hideAndReset={hideAndReset} />
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
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Layout));
