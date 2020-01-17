import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import globalActions from "store/app/actions";

import Partners from "./Partners";
import AwardsSlider from "./Awards";
import News from "./News";
import Tickets from "./Tickets";
import Intro from "./IntroSlider";


class Home extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Intro />
        <section id="another_content">
          <AwardsSlider />
          <Tickets />
          <News />
          <Partners />
        </section>
      </React.Fragment>
    );
  }
}
const mapDispatchToProps = dispatch => bindActionCreators({ ...globalActions }, dispatch);
export default connect(null, mapDispatchToProps)(Home);
