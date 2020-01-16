import React, { Fragment } from "react";
import Header from "./Header";
import Footer from "./Footer";
import UserProvider from "containers/Providers/UserProvider";
import Sidebar from "./Sidebar";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import appActions from "store/app/actions";

class Layout extends React.PureComponent {
  dismissDlgs = event => {
    if (event.keyCode === 27) {
      const { toggleSearchForm } = this.props;
      toggleSearchForm();
    }
  };

  componentDidMount() {
    document.addEventListener("keydown", this.dismissDlgs, false);
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.dismissDlgs, false);
  }
  render() {
    return (
      <UserProvider>
        <section id="main_site">
          <aside>sdsdsd</aside>
          <div id="search_modal" className="search_modal">
            <form action="#">
              <input type="text" placeholder="Search ..." />
              <button type="submit">
                <i className="icofont-ui-search"></i>
              </button>
            </form>
          </div>
          <Sidebar />
          <Header />
          <section id="wrapper">{this.props.children}</section>
          <Footer />
        </section>
      </UserProvider>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({ ...appActions }, dispatch);
export default connect(null, mapDispatchToProps)(Layout);
