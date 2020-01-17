import React, { Fragment, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import UserProvider from "containers/Providers/UserProvider";
import Sidebar from "./Sidebar";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import appActions from "store/app/actions";
import { useForm } from "react-hook-form";

const Layout = props => {
  const dismissDlgs = event => {
    if (event.keyCode === 27) {
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
  }, []);

  const onSearch = search => {
    console.log("search with ", search);
  };

  const { register, handleSubmit, reset } = useForm();
  return (
    <UserProvider>
      <section id="main_site">
        <aside>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text
          ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived
          not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
        </aside>
        <div id="search_modal" className="search_modal">
          <form onSubmit={handleSubmit(onSearch)}>
            <input type="text" name="search" ref={register} placeholder="Search ..." />
            <button type="submit">
              <i className="icofont-ui-search"></i>
            </button>
          </form>
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

const mapDispatchToProps = dispatch => bindActionCreators({ ...appActions }, dispatch);
export default connect(null, mapDispatchToProps)(Layout);
