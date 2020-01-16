import React, { Fragment } from "react";
import Header from "./Header";
import Footer from "./Footer";
import UserProvider from "containers/Providers/UserProvider";
import Sidebar from "./Sidebar";

class Layout extends React.PureComponent {
  render() {
    return (
      <UserProvider>
        <section id="main_site">
          <aside>sdsdsd</aside>
          <div className="search_modal">
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

export default Layout;
