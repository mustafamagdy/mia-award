/**
 * Horizontal App
 */
import React, { Component } from "react";
import { Route, withRouter, Redirect } from "react-router-dom";

// app default layout
import MainApp from "../components/MainApp"

// router service
import routes from "Routes";

class Dashboard extends Component {
  render() {
    const { match, location } = this.props;
    if (location.pathname === "/dashboard") {
      return <Redirect to={"/dashboard/crm/dashboard"} />;
    }
    return (
      <MainApp>
        {routes &&
          routes.map((route, key) => <Route key={key} path={`${match.url}/${route.path}`} component={route.component} />)}
      </MainApp>
    );
  }
}

export default withRouter(Dashboard);
