import React from "react";
import { Trans } from "@lingui/react";
import { connect } from "react-redux";

class Footer extends React.Component {
  render() {
    return (<React.Fragment>
      footer
      </React.Fragment>);
  }
}

const mapStateToProps = ({
  router: {
    location: { pathname }
  }
}) => ({ pathname });
export default connect(mapStateToProps, null)(Footer);
