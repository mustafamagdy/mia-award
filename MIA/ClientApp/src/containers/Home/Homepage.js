import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import globalActions from "store/app/actions";

import Partners from "./Partners";
import AwardsSlider from "./Awards";
import News from "./News";
import Tickets from "./Tickets";
import Intro from "./IntroSlider";
import PhotoAlbum from "./PhotoAlbum";
import RecentShows from "./RecentShows";

class HomePage extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Intro />
        <section id="another_content">
          <AwardsSlider />
          <PhotoAlbum />
          <RecentShows />
          <Tickets />
          <News />
          <Partners />
        </section>
      </React.Fragment>
    );
  }
}
const mapDispatchToProps = dispatch => bindActionCreators({ ...globalActions }, dispatch);
export default connect(null, mapDispatchToProps)(HomePage);
