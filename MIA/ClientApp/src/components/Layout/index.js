import React, {
  Fragment,
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
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
import {
  FacebookShareButton,
  TwitterShareButton,
  InstapaperShareButton,
  WhatsappShareButton,
} from "react-share";
import { I18n } from "@lingui/react";

const SearchForm = forwardRef(({ history, hideAndReset }, ref) => {
  const { register, handleSubmit, reset } = useForm();
  const overlayRef = useRef();
  useOnClickOutside(overlayRef, () => hideAndReset());

  const onSearch = (q) => {
    hideAndReset();
    history.push("/shows/?q=" + q.search);
  };

  useImperativeHandle(ref, () => ({
    reset() {
      reset();
    },
  }));

  return (
    <I18n>
      {({ i18n }) => (
        <form onSubmit={handleSubmit(onSearch)} ref={overlayRef}>
          <input
            type="text"
            name="search"
            ref={register}
            placeholder={i18n._("search...")}
          />
          <button type="submit">
            <i className="icofont-ui-search"></i>
          </button>
        </form>
      )}
    </I18n>
  );
});

const Layout = ({
  toggleShareSidebar,
  searchFormOpen,
  history,
  toggleSearchForm,
  ...props
}) => {
  const searchFormRef = useRef();

  const dismissDlgs = (event) => {
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
            <a href="/">
              <Trans id="mia_awards">MIA Award</Trans>
            </a>
          </div>
          <div className="mainmenu">
            <ul>
              {config.menu.map((m, i) => (
                <li key={i}>
                  <a href={m.route}>
                    <Trans id={m.label}>{m.label}</Trans>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </aside>
        <div id="search_modal" className="search_modal">
          <SearchForm
            ref={searchFormRef}
            history={history}
            hideAndReset={hideAndReset}
          />
        </div>
        <ShareSidebar toggleShareSidebar={toggleShareSidebar} />
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

const ShareSidebar = ({ toggleShareSidebar, ...props }) => {
  return (
    <div id="share_sidebar">
      <div className="close_search" onClick={toggleShareSidebar}>
        <i className="icofont-close-line"></i>
      </div>
      <ul>
        <li>
          <FacebookShareButton url={config.siteShareUrl}>
            <span className="item">facebook</span>
          </FacebookShareButton>
        </li>
        <li>
          <TwitterShareButton url={config.siteShareUrl}>
            <span className="item">twitter</span>
          </TwitterShareButton>
        </li>
        <li>
          <InstapaperShareButton url={config.siteShareUrl}>
            <span className="item">instagram</span>
          </InstapaperShareButton>
        </li>
        <li>
          <WhatsappShareButton url={config.siteShareUrl}>
            <span className="item">whatsapp</span>
          </WhatsappShareButton>
        </li>
      </ul>
    </div>
  );
};

const mapStateToProps = ({ global: { searchFormOpen } }) => ({
  searchFormOpen,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ ...appActions }, dispatch);
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Layout));
