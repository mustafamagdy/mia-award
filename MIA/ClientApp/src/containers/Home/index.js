import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import globalActions from "store/app/actions";
import homeActions from "store/home/actions";

import ConfirmEmail from "containers/User/ConfirmEmail";
import Profile from "containers/User/Profile";
import CheckYourEmail from "containers/User/CheckYourEmail";
import { Route, Switch, Redirect } from "react-router-dom";

import AboutUs from "../Pages/AboutUs";
import ContactUs from "../Pages/ContactUs";
import Awards from "../Pages/Awards";
import Events from "../Pages/Events";
import Gallery from "../Pages/Gallery";
import NewsView from "../Pages/News/view";
import Shows from "../Pages/Shows";
import ShowsView from "../Pages/Shows/view";

import MediaBrowser from "../Media";
import Booths from "../Booths";
import BuyBooth from "../Booths/BuyBooth";

import Members from "../Members";
import TestUpload from "../Test/Upload";
import News from "../Pages/News";
import Homepage from "./Homepage";

class Home extends React.Component {
  componentDidMount() {
    this.props.fetchAwards();
  }

  render() {
    return (
      <React.Fragment>
        <Switch>
          {/* General website */}
          <Route path="/test" component={TestUpload} />

          <Route exact path="/" component={Homepage} />
          <Route path="/about-us" component={AboutUs} />
          <Route path="/events" component={Events} />
          <Route path="/awards" component={Awards} />
          <Route path="/contact-us" component={ContactUs} />
          <Route path="/gallery" component={Gallery} />
          <Route exact path="/news" component={News} />
          <Route path="/news/:id" component={NewsView} />
          <Route exact path="/shows" component={Shows} />
          <Route path="/shows/:id" component={ShowsView} />

          {/* browse media */}
          <Route path="/media" component={MediaBrowser} />

          {/* Account management */}
          <Route exact path="/account" component={Profile} />
          <Route path="/account/checkYourEmail" component={CheckYourEmail} />
          <Route path="/account/profile" component={Profile} />
          <Route path="/account/confirm" component={ConfirmEmail} />
          {/* <Route path="/account/resetPassword" component={ResetPasswordByEmail} /> */}

          {/* booths */}
          <Route path="/booth" component={Booths} />
          <Route path="/booth-buy" component={BuyBooth} />

          {/* Member section */}
          <Route path="/members" component={Members} />

          <Redirect from="*" to="/" />
        </Switch>
      </React.Fragment>
    );
  }
}
const mapDispatchToProps = dispatch => bindActionCreators({ ...globalActions, ...homeActions }, dispatch);
export default connect(null, mapDispatchToProps)(Home);
