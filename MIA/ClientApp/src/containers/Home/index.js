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
import Timeline from "../Pages/Timeline";
import Gallery from "../Pages/Gallery";
import NewsView from "../Pages/News/view";
import Shows from "../Pages/Shows";
import ShowsView from "../Pages/Shows/view";
import Award from "../Pages/Award";
import Sponser from "../Pages/Sponser";
import News from "../Pages/News";
import Terms from "../Pages/Terms";
import BoothTermsAndConditions from "../Pages/BoothTermsAndConditions";


import Booths from "../Booths";
import Members from "../Members";
import Homepage from "./Homepage";
import Artworks from "../Members/Artworks";
import TestUpload from "../Test/Upload";

class Home extends React.Component {
  

  render() {
    return (
      <React.Fragment>
        <Switch>
          {/* General website */}
          <Route path="/test" component={Artworks} />

          <Route exact path="/" component={Homepage} />
          <Route path="/about-us" component={AboutUs} />
          <Route path="/timeline" component={Timeline} />
          <Route path="/contact-us" component={ContactUs} />
          <Route path="/gallery" component={Gallery} />
          <Route exact path="/news" component={News} />
          <Route path="/news/:id" component={NewsView} />
          <Route exact path="/shows" component={Shows} />
          <Route path="/shows/:id" component={ShowsView} />
          <Route path="/award/:id" component={Award} />
          <Route path="/sponser/:key" component={Sponser} />
          <Route path="/contestant/:id" component={ShowsView} />

          {/* Account management */}
          <Route exact path="/account" component={Profile} />
          <Route path="/account/checkYourEmail" component={CheckYourEmail} />
          <Route path="/account/profile" component={Profile} />
          <Route path="/account/confirm" component={ConfirmEmail} />

          {/* booths */}
          <Route path="/booths" component={Booths} />

          {/* Member section */}
          <Route path="/members" component={Members} />

          {/* terms and conditions */}
          <Route path="/terms" component={Terms} />
          <Route path="/booth-terms" component={BoothTermsAndConditions} />

          <Redirect from="*" to="/" />
        </Switch>
      </React.Fragment>
    );
  }
}
const mapDispatchToProps = dispatch => bindActionCreators({ ...globalActions,  }, dispatch);
export default connect(null, mapDispatchToProps)(Home);
