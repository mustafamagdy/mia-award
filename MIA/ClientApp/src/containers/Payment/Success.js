import React from "react";
import qs from "query-string";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import bookingActions from "store/reservation/actions";

class Success extends React.Component {
  componentDidMount() {
    var _qs = window.location.search;
    var a = qs.parse(_qs, { parseNumbers: true, parseBooleans: true });
    var sessionId = a["cko-session-id"];
    if (!!sessionId) {
      this.props.payAndBook3ds(sessionId);
    } else {
      //redirect to payment failed , or invalid request
      console.error("payment failed =>>>>> ");
    }
  }

  render() {
    //todo add loading or something here
    return <></>;
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({ ...bookingActions }, dispatch);
export default connect(null, mapDispatchToProps)(Success);
