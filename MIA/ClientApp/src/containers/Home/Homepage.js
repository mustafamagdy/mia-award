import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import globalActions from "store/app/actions";

import Sponsers from "./Sponsers";
import AwardsSlider from "./Awards";
import News from "./News";
import Tickets from "./Tickets";
import Intro from "./IntroSlider";
import PhotoAlbum from "./PhotoAlbum";
import RecentShows from "./RecentShows";
import config from "config";

class HomePage extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Intro />
        <section id="another_content">
          <AwardsSlider direction="right" type="artwork"/>
          <AwardsSlider direction="left" type="person"/>
          <PhotoAlbum />
          <RecentShows />
          {config.tickets_enabled && <Tickets />}
          <News />
          <Sponsers />
        </section>
      </React.Fragment>
    );
  }
}
const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ ...globalActions }, dispatch);
export default connect(null, mapDispatchToProps)(HomePage);
