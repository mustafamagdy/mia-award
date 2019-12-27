import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import globalActions from "store/app/actions";

class Home extends React.Component {
  componentDidMount() {
    if (window.location.href == "/") {
      debugger;
      this.props.clearIsLoading();
    }
  }

  render() {
    return (
      <div>
        <ul>
          <li>
            <a href="/aboutus"> about us</a>
          </li>
        </ul>
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => bindActionCreators({ ...globalActions }, dispatch);
export default connect(null, mapDispatchToProps)(Home);
